import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import axios from "axios";
import { groupPagesByFile } from "@/app/dashboard/product/mda/MdaPDFHelper";

export async function POST(request: Request) {
  try {
    const { data: items } = await request.json();
    console.log(items);
    const files = groupPagesByFile(items || []);
    if (files.length === 0) {
      return NextResponse.json(
        { error: "No valid files/pages provided" },
        { status: 400 }
      );
    }

    const outputPdf = await PDFDocument.create();

    for (const { mdaFile, pages } of files) {
      const resp = await axios.get(mdaFile, { responseType: "arraybuffer" });
      const orig = await PDFDocument.load(resp.data as Uint8Array);
      const total = orig.getPageCount();

      const pageIndexes = pages
        .map((p) => p - 1)
        .filter((idx) => idx >= 0 && idx < total);

      if (!pageIndexes.length) continue;

      const copied = await outputPdf.copyPages(orig, pageIndexes);
      copied.forEach((page) => outputPdf.addPage(page));
    }

    const bytes = await outputPdf.save();
    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="extracted.pdf"',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

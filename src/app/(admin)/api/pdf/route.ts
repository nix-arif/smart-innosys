import PDFDocument from "pdfkit";
import path from "path";
import { NextResponse } from "next/server";

export async function POST() {
  const fontPath = path.resolve(process.cwd(), "public/fonts/ArialCE.ttf");
  const doc = new PDFDocument({ font: fontPath });
  doc.font(fontPath);

  const chunks: Uint8Array[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.text("Hello from API!", 100, 100);
    doc.end();
  });

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="document.pdf"',
    },
  });
}

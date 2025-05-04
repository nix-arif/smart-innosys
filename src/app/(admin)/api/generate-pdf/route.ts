import { generatePdf } from "@/lib/generatePdf";
import { pdfTemplate } from "@/lib/pdfTemplate";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  const { firstname, lastname, description } = await req.json();

  const myPdf = await generatePdf(
    pdfTemplate({ firstname, lastname, description })
  );

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([new Uint8Array(myPdf)], { type: "application/pdf" });

  // Create a File from the Blob (you can specify the desired filename)
  const file = new File([blob], firstname + "_" + lastname + ".pdf");

  const utapi = new UTApi();
  const response = utapi.uploadFiles(file);
  console.log("from api/generate-pdf line 21:", (await response).data);

  return NextResponse.json({ response: "here you go" });
}

"use server";

import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export async function createPDF(): Promise<Buffer> {
  const fontPath = path.join("public", "fonts", "ArialCE.ttf");
  ensureHelveticaAFM();

  // console.log(fontPath);
  const doc = new PDFDocument();

  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  const endPromise = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
  // const buffers: Uint8Array[] = [];
  // doc.on("data", (chunk) => buffers.push(chunk));

  doc.text("Hello world!", 100, 100);
  doc.end();

  // const pdfBuffer = await new Promise<Buffer>((resolve) => {
  //   doc.on("end", () => resolve(Buffer.concat(buffers)));
  // });

  // return new NextResponse(pdfBuffer, {
  //   headers: {
  //     "Content-Type": "application/pdf",
  //     "Content-Disposition": 'attachment; filename="document.pdf"',
  //   },
  // });

  return await endPromise;
}

function ensureHelveticaAFM() {
  const sourcePath = path.resolve("node_modules/pdfkit/js/data/Helvetica.afm");
  const destDir = path.resolve(".next/server/vendor-chunks/data");
  const destPath = path.join(destDir, "Helvetica.afm");

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(sourcePath, destPath);
  }
}

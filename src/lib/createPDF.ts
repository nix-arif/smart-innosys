"use server";

import PDFDocument from "pdfkit";
import path from "path";
import localFont from "next/font/local";

export async function createPDF(): Promise<Buffer> {
  const fontPath = path.join("public", "fonts", "ArialCE.ttf");

  // console.log(fontPath);
  const doc = new PDFDocument({ font: fontPath });

  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  const endPromise = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  doc.text("Hello world!", 100, 100);
  doc.end();

  return await endPromise;
}

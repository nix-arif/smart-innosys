"use client";

import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { mdaProducts } from "@/redux/features/mdaProduct/mdaProductSlice";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument, rgb } from "pdf-lib";
import axios from "axios";
import React, { FormEvent, useState } from "react";

// import DOMMatrix from "@thednp/dommatrix";

// now import legacy pdfjs:
// import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const MdaInput = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.mdaProduct);
  const [productCode, setProductCode] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(mdaProducts(productCode));
  };

  const handleDownload = async () => {
    try {
      const res = await axios.post(
        "/api/cloudflare-r2/mda",
        { data },
        { responseType: "blob" }
      );

      const blob = res.data; // blob is ready

      // Convert Blob to ArrayBuffer
      const rawArrayBuffer = await blob.arrayBuffer();

      // Immediately clone it for both pdfjs and pdf-lib usage:
      const bufferForPdfJs = rawArrayBuffer.slice(0);
      const bufferForPdfLib = rawArrayBuffer.slice(0);

      const loadingTask = pdfjsLib.getDocument({ data: bufferForPdfJs });
      const pdf = await loadingTask.promise;

      // Step 2: Fetch original PDF bytes for pdf-lib

      //   const uint8ArrayCopy = new Uint8Array(arrayBuffer);
      const pdfDoc = await PDFDocument.load(bufferForPdfLib);
      //   const pdfDoc = await PDFDocument.load(arrayBuffer);

      const searchKeywords = data.map((item) => item.productCode);

      // Step 3: Process each page
      for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
        const page = await pdf.getPage(pageIndex + 1);
        const viewport = page.getViewport({ scale: 1 });
        const pageHeight = viewport.height;

        const textContent = await page.getTextContent();
        const pdfLibPage = pdfDoc.getPages()[pageIndex];

        for (let i = 0; i < searchKeywords.length; i++) {
          const keyword = searchKeywords[i].toLowerCase();
          const matchNumber = i + 1;

          for (const item of textContent.items as any[]) {
            const text = item.str?.toLowerCase();
            if (!text || text !== keyword) continue;

            const transform = item.transform;
            const [a, b, c, d, e, f] = transform;
            const fontHeight = Math.hypot(b, d);
            const fontWidth = item.width;

            const [x, y] = viewport.convertToViewportPoint(e, f);
            // const drawX = x; // This start of x for text match
            const drawX = 70;
            const drawY = pageHeight - y - fontHeight * 0.3;

            // Draw label number
            pdfLibPage.drawText(`(${matchNumber})`, {
              x: drawX - 20,
              y: drawY,
              size: 10,
              color: rgb(1, 0, 0),
            });

            // Draw highlight
            pdfLibPage.drawRectangle({
              x: drawX,
              y: drawY,
              // width: fontWidth, // This is the exact width of match text
              width: 450,
              height: fontHeight * 1.1,
              color: rgb(1, 0.741, 0),
              opacity: 0.5,
            });

            break; // only highlight the first match for this keyword per page
          }
        }
      }

      // Step 4: Download highlighted PDF
      const modifiedPdfBytes = await pdfDoc.save();
      const newBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(newBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "mda-extracted.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      // optional: read error blob:
      // @ts-ignore
      if (err.response?.data) {
        const reader = new FileReader();
        reader.onload = () => console.error("Error response:", reader.result);
        // @ts-ignore
        reader.readAsText(err.response.data);
      }
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="border-1 border-black w-[80%] h-[300px]"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>
        <button
          className="border border-gray-700 mx-5 px-5 m-5 py-2 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>PRODUCT CODE</th>
            <th>MDA REGISTRATION NO</th>
            <th>MDA PAGE NO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, idx) => (
            <tr
              key={idx}
              className={product.mdaRegistrationNo ? "" : "bg-red-400!"}
            >
              <td>{idx + 1}</td>
              <td>{product.productCode}</td>
              <td className="text-center">{product.mdaRegistrationNo}</td>
              <td className="text-center">{product.mdaPageNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="border border-gray-700 mx-5 px-5 mt-5 py-2 rounded-md"
        onClick={handleDownload}
      >
        Download File
      </button>
    </div>
  );
};

export default MdaInput;

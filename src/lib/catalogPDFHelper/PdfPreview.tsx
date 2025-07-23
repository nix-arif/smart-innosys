// pages/pdf-preview.tsx

"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { useEffect, useState } from "react";
import { ProductPdf } from "./generateAffirmaCatalog";
import { useAppSelector } from "@/redux/app/hooks";

export default function PdfPreviewPage() {
  const { quotationItems } = useAppSelector((state) => state.quotation);
  const { affirma } = quotationItems;
  return (
    <div className="space-y-4 p-4">
      <PDFDownloadLink
        document={<ProductPdf items={affirma} />}
        fileName="product-list.pdf"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
      </PDFDownloadLink>

      <div className="mt-8 border">
        <PDFViewer width="100%" height={600}>
          <ProductPdf items={affirma} />
        </PDFViewer>
      </div>
    </div>
  );
}

import QuotationAffirmaPDF from "@/lib/pdfHelper/generateQuotationAffirma";
import { Quotation } from "@/redux/features/quotation/quotationSlice";
import { pdf } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";

export async function affirmaPDF(quotationData: Quotation) {
  const affirmaQuotePdfBlob = await pdf(
    <QuotationAffirmaPDF data={quotationData} />
  ).toBlob();
  const affirmaQuotePdfBytes = await affirmaQuotePdfBlob.arrayBuffer();
  const affirmaDocsPdfBytes = await fetch("/file/DocAffirma.pdf").then((res) =>
    res.arrayBuffer()
  );
  const affirmaMergedPdf = await PDFDocument.create();
  const affirmaDocsPDF = await PDFDocument.load(affirmaDocsPdfBytes);
  const affirmaQuotePDF = await PDFDocument.load(affirmaQuotePdfBytes);

  const affirmaQuotePages = await affirmaMergedPdf.copyPages(
    affirmaQuotePDF,
    affirmaQuotePDF.getPageIndices()
  );
  const affirmaDocsPages = await affirmaMergedPdf.copyPages(
    affirmaDocsPDF,
    affirmaDocsPDF.getPageIndices()
  );

  affirmaQuotePages.forEach((page) => affirmaMergedPdf.addPage(page));
  affirmaDocsPages.forEach((page) => affirmaMergedPdf.addPage(page));
  const affirmaMergedPdfBytes = await affirmaMergedPdf.save();
  const affirmaMergedPdfBlob = new Blob([affirmaMergedPdfBytes], {
    type: "application/pdf",
  });
  const affirmaQuoteUrl = URL.createObjectURL(affirmaMergedPdfBlob);

  // Download Link is Below
  const affirmaQuoteLink = document.createElement("a");
  affirmaQuoteLink.href = affirmaQuoteUrl;
  affirmaQuoteLink.download = `${
    quotationData.quotationHeaders.affirma.quotationRef
  }-${quotationData.quotationHeaders.affirma.selectedOrganization.organizationName.toUpperCase()}${
    quotationData.quotationHeaders.affirma.title &&
    `-${quotationData.quotationHeaders.affirma.title.toUpperCase()}`
  }.pdf`;
  document.body.appendChild(affirmaQuoteLink);
  affirmaQuoteLink.click();
  document.body.removeChild(affirmaQuoteLink);

  // Open in browser
  // window.open(affirmaQuoteUrl, "_blank");
}

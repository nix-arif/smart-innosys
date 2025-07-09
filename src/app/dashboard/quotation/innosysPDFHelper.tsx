import { Quotation } from "@/redux/features/quotation/quotationSlice";
import { pdf } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";

export async function innosysPDF(quotationData: Quotation) {
  const innosysQuotePdfBlob = await pdf(<QuotationAffirmaPDF />).toBlob();
  const innosysQuotePdfBytes = await innosysQuotePdfBlob.arrayBuffer();
  const innosysDocsPdfBytes = await fetch("/file/DocSmartInnosys.pdf").then(
    (res) => res.arrayBuffer()
  );
  const innosysMergedPdf = await PDFDocument.create();
  const innosysDocsPDF = await PDFDocument.load(innosysDocsPdfBytes);
  const innosysQuotePDF = await PDFDocument.load(innosysQuotePdfBytes);

  const innosysQuotePages = await innosysMergedPdf.copyPages(
    innosysQuotePDF,
    innosysQuotePDF.getPageIndices()
  );
  const innosysDocsPages = await innosysMergedPdf.copyPages(
    innosysDocsPDF,
    innosysDocsPDF.getPageIndices()
  );

  innosysQuotePages.forEach((page) => innosysMergedPdf.addPage(page));
  innosysDocsPages.forEach((page) => innosysMergedPdf.addPage(page));
  const innosysMergedPdfBytes = await innosysMergedPdf.save();
  const innosysMergedPdfBlob = new Blob([innosysMergedPdfBytes], {
    type: "application/pdf",
  });
  const innosysQuoteUrl = URL.createObjectURL(innosysMergedPdfBlob);
  const innosysQuoteLink = document.createElement("a");
  innosysQuoteLink.href = innosysQuoteUrl;
  innosysQuoteLink.download = `${
    quotationData.quotationHeaders.innosys.quotationRef
  }-${quotationData.quotationHeaders.innosys.selectedOrganization.organizationName.toUpperCase()}${
    quotationData.quotationHeaders.innosys.title &&
    `-${quotationData.quotationHeaders.innosys.title.toUpperCase()}`
  }.pdf`;
  document.body.appendChild(innosysQuoteLink);
  innosysQuoteLink.click();
  document.body.removeChild(innosysQuoteLink);
}

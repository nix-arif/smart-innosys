import * as XLSX from "xlsx";

import { Quotation } from "@/redux/features/quotation/quotationSlice";

export async function generateExcel(quotationData: Quotation) {
  const workbook = XLSX.utils.book_new();

  // Add quotation items
  const itemsSheet = XLSX.utils.json_to_sheet(
    quotationData.quotationItems.affirma
  );
  XLSX.utils.book_append_sheet(workbook, itemsSheet, "Items");
  XLSX.writeFile(
    workbook,
    `Quotation_${quotationData.quoteNo.noAffirmaQuote}.xlsx`
  );
}

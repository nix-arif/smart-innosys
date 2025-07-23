"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/app/hooks";
import {
  changeTitle,
  getProductImages,
  ProductQuotation,
  quotationItemsDetail,
  reCalculatePrice,
} from "@/redux/features/quotation/quotationSlice";
import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx";

type CreateQuotationItemProps = {
  quotationItems: {
    affirma: ProductQuotation[];
    innosys: ProductQuotation[];
    biomech: ProductQuotation[];
  };
};

const CreateQuotationItem = ({ quotationItems }: CreateQuotationItemProps) => {
  const dispatch = useAppDispatch();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      dispatch(changeTitle(workbook.SheetNames[0]));

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as string[][];

      const [, ...rows] = jsonData; // skip header row

      const parsedItems: ProductQuotation[] = rows
        .filter((row) => row.length > 0)
        .map((row) => {
          if (!row[2]) return null; // skip if productCode is missing
          return {
            no: String(row[0] || ""),
            id: "",
            sku: row[5] ? String(row[1]) : undefined,
            productCode: String(row[2] || ""),
            description: String(row[3] || ""),
            qty: parseInt(row[4] as string) || 0,
            oum: String(row[5] || ""),
            unitPrice: parseFloat(row[6] as string) || 0,
            totalPrice: parseFloat(row[7] as string) || 0,
            productImage: "",
          };
        })
        .filter(Boolean) as ProductQuotation[];

      const response = await dispatch(quotationItemsDetail(parsedItems));
      await dispatch(getProductImages(response.payload));
      dispatch(reCalculatePrice());
    };

    reader.readAsArrayBuffer(file);
  };

  const agentKeys = ["affirma", "innosys", "biomech"] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload an Excel File</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="file"
          accept=".xlsx, .xls, .ods"
          className="text-xs"
          onChange={handleFileChange}
        />

        {agentKeys.some((key) => quotationItems[key].length > 0) && (
          <div className="text-sm mt-2">
            <p className="font-semibold mb-1">Preview:</p>
            <ul className="list-disc pl-4 space-y-1">
              {agentKeys.flatMap((agentKey) =>
                quotationItems[agentKey].map((item, index) => (
                  <li key={`${agentKey}-${index}-${item.productCode}`}>
                    [{agentKey}] {item.no}. {item.productCode} –{" "}
                    {item.description} (x{item.qty})
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreateQuotationItem;

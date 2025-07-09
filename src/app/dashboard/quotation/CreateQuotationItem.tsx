"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  changeTitle,
  quotationItemsDetail,
  reCalculatePrice,
} from "@/redux/features/quotation/quotationSlice";
import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx";

const CreateQuotationItem = () => {
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

      // Skip the header row
      const [, ...rows] = jsonData;
      const parsedItems = rows
        .filter((row) => row.length > 0)
        .map((row) => ({
          no: String(row[0]),
          id: "",
          sku: row[5] ? String(row[1]) : undefined,
          productCode: String(row[2] || ""),
          description: String(row[3] || ""),
          qty: parseInt(row[4] as string) || 0,
          oum: String(row[5] || ""),
          unitPrice: parseFloat(row[6] as string) || 0,
          totalPrice: parseInt(row[7] as string) || 0,
          productImage: "",
        }));

      await dispatch(quotationItemsDetail(parsedItems));
    };
    dispatch(reCalculatePrice());
    reader.readAsArrayBuffer(file);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload an excel file</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="file"
          accept=".xlsx, .xls, .ods"
          className="text-xs"
          onChange={handleFileChange}
        />
      </CardContent>
    </Card>
  );
};

export default CreateQuotationItem;

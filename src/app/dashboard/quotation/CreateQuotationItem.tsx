import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  getQuotationItemsAffirmaDetail,
  Quotation,
} from "@/redux/features/quotation/quotationAffirmaSlice";
import * as XLSX from "xlsx";
import React, { ChangeEvent } from "react";
import { produce } from "immer";
import { useAppDispatch } from "@/redux/app/hooks";

interface CreateQuotationItemsProps {
  affirmaFormState: Quotation;
  setAffirmaFormState: React.Dispatch<React.SetStateAction<Quotation>>;
}

const CreateQuotationItem = ({
  affirmaFormState,
  setAffirmaFormState,
}: CreateQuotationItemsProps) => {
  const dispatch = useAppDispatch();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as string[][];

      // Skip the header row
      const [, ...rows] = jsonData;

      const parsedItems = rows
        .filter((row) => row.length > 0)
        .map((row) => ({
          id: "",
          sku: row[5] ? String(row[0]) : undefined,
          productCode: String(row[1] || ""),
          description: String(row[2] || ""),
          qty: parseInt(row[3] as string) || 0,
          oum: String(row[4] || ""),
          unitPrice: parseFloat(row[5] as string) || 0,
          totalPrice: parseInt(row[6] as string) || 0,
        }));

      setAffirmaFormState((prev) =>
        produce(prev, (draft) => {
          draft.quotationItem.products = parsedItems;
        })
      );

      console.log(parsedItems);

      await dispatch(getQuotationItemsAffirmaDetail(parsedItems));

      //   if (e.target) {
      //     e.target.value = "";
      //   }
    };
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

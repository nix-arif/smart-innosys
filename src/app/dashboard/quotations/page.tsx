"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { useLocalStorage } from "usehooks-ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import GeneralInfo from "./GeneralInfo";
import { generalInfoState, itemsInfoState } from "./quotationState";
import ItemsInfo from "./ItemsInfo";
import { Button } from "@/components/ui/button";
import { MyDocument } from "@/lib/generatePDF";
import { QuotationData } from "@/lib/definitions";
import { pdf } from "@react-pdf/renderer";

// ----------------------
// Type Definitions
// ----------------------

type GeneralInfoItem = {
  type: string;
  value: string;
  name: string;
  label: string;
};
type ItemInfo = {
  productCode: string;
  description: string;
  qty: number;
  oum: string;
  unitPrice: number;
  total: number;
};

// ----------------------
// Quotation Page
// ----------------------

const QuotationPage = () => {
  const [generalInfoData, setGeneralInfoData] =
    useState<GeneralInfoItem[]>(generalInfoState);
  const [itemsInfoData, setItemsInfoData] =
    useState<ItemInfo[]>(itemsInfoState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGeneral = localStorage.getItem("generalInfo");
      const savedItems = localStorage.getItem("itemsInfo");

      if (savedGeneral) setGeneralInfoData(JSON.parse(savedGeneral));
      if (savedItems) setItemsInfoData(JSON.parse(savedItems));
      setIsLoaded(true);
    }
  }, []);

  // Auto-save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("generalInfo", JSON.stringify(generalInfoData));
    }
  }, [generalInfoData, isLoaded]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("generalInfo", JSON.stringify(generalInfoData));
    localStorage.setItem("itemsInfo", JSON.stringify(itemsInfoData));

    const result: QuotationData = Object.fromEntries(
      generalInfoData.map((item) => [item.name, item.value])
    );

    console.log(result);
    const blob = await pdf(<MyDocument data={result} />).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${result.quotationId}.pdf`;
    link.click();
    // console.log("Submitted:", { generalInfoData, itemsInfoData });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <h1 className="font-semibold px-10">Quotation</h1>
      <Separator />
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="generalInfo" className="px-10">
          <AccordionTrigger>General Info</AccordionTrigger>
          <AccordionContent>
            <GeneralInfo
              generalInfoData={generalInfoData}
              setGeneralInfoData={setGeneralInfoData}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="itemsInfo" className="px-10">
          <AccordionTrigger>Items Info</AccordionTrigger>
          <AccordionContent>
            <ItemsInfo
              itemsInfoData={itemsInfoData}
              setItemsInfoData={setItemsInfoData}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button type="submit" className="mx-10 mt-4">
        Create Quotation
      </Button>
    </form>
  );
};

export default QuotationPage;

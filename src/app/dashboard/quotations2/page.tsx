"use client";

import React, { FormEvent, useEffect, useState } from "react";
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
import {
  QuotationData,
  QuotationGeneralInfoData,
  QuotationItemsInfoData,
} from "@/lib/definitions";
import { pdf } from "@react-pdf/renderer";
import { createQuotation } from "@/actions/quotation";

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
  const [numOfItems, setNumOfItems] = useState(1);

  // Load from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGeneral = localStorage.getItem("generalInfo");
      const savedItems = localStorage.getItem("itemsInfo");
      const savedNumOfItems = localStorage.getItem("numOfItems");

      if (savedGeneral) setGeneralInfoData(JSON.parse(savedGeneral));
      if (savedItems) setItemsInfoData(JSON.parse(savedItems));
      if (savedNumOfItems) setNumOfItems(JSON.parse(savedNumOfItems));
      setIsLoaded(true);
    }
  }, []);

  // Auto-save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("generalInfo", JSON.stringify(generalInfoData));
      localStorage.setItem("numOfItems", JSON.stringify(numOfItems));
      const adjustedItems = Array.from({ length: numOfItems }).map(
        (_, i) =>
          itemsInfoData[i] || {
            productCode: "",
            description: "",
            qty: 0,
            oum: "",
            unitPrice: 0,
            total: 0,
          }
      );

      setItemsInfoData(adjustedItems);
      localStorage.setItem("itemsInfo", JSON.stringify(adjustedItems));
    }
  }, [generalInfoData, numOfItems, isLoaded]);

  // 💾 Save itemsInfoData whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("itemsInfo", JSON.stringify(itemsInfoData));
    }
  }, [itemsInfoData, isLoaded]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("generalInfo", JSON.stringify(generalInfoData));
    localStorage.setItem("itemsInfo", JSON.stringify(itemsInfoData));

    const quoteInfo: QuotationGeneralInfoData = Object.fromEntries(
      generalInfoData.map((item) => [item.name, item.value])
    );

    const quotationData: QuotationData = {
      general: quoteInfo,
      items: itemsInfoData,
    };

    await createQuotation(quotationData);
    // const blob = await pdf(<MyDocument data={quotationData} />).toBlob();
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = `${quotationData.general.quotationId}.pdf`;
    // link.click();
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
            <div className="flex justify-between mb-2">
              <label htmlFor="numOfItems" className="flex-1">
                Total Item To Quote
              </label>
              <input
                id="numOfItems"
                value={numOfItems}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (isNaN(value) || value < 1) {
                    setNumOfItems(1);
                  } else {
                    setNumOfItems(value);
                  }
                }}
                className="border border-slate-600 text-center flex-1"
              />
            </div>
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

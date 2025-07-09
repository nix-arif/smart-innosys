"use client";

import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch } from "@/redux/app/hooks";
import CreateQuotation from "./CreateQuotation";
import SearchQuotation from "./SearchQuotation";

const QuotationPage = () => {
  return (
    <div className="px-10 w-full">
      <Accordion type="single" className="w-full">
        <AccordionItem value="createQuotation">
          <AccordionTrigger>Create Quotation</AccordionTrigger>
          <AccordionContent>
            <CreateQuotation />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="searchQuotation">
          <AccordionTrigger>Search Quotation</AccordionTrigger>
          <AccordionContent>
            <SearchQuotation />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default QuotationPage;

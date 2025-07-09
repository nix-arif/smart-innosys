"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  createQuotation,
  resetQuotation,
} from "@/redux/features/quotation/quotationSlice";
import CreateQuotationHeader from "./CreateQuotationHeader";
import CreateQuotationItem from "./CreateQuotationItem";
import QuotationAffirmaPDF from "@/lib/pdfHelper/generateQuotationAffirma";
import { affirmaPDF } from "./affirmaPDFHelper";
import { innosysPDF } from "./innosysPDFHelper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreateQuotation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const quotationData = useAppSelector((state) => state.quotation);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const resultCreateQuotation = await dispatch(
      createQuotation(quotationData)
    );

    if (resultCreateQuotation.meta.requestStatus === "rejected") {
      toast.error("Quotation not created");
      return;
    }

    if (quotationData.quotationSequal === "single") {
      switch (quotationData.agent) {
        case "affirma":
          await affirmaPDF(quotationData);
          break;
        case "innosys":
          // await innosysPDF(quotationData);
          break;
        case "biomech":
        // TODO
      }
    }

    router.push("/dashboard");
    dispatch(resetQuotation());
  };

  const handleCreateQuotationButtonDisable = (): boolean => {
    if (Object.keys(quotationData.errors).length > 0) {
      return true;
    }
    if (quotationData.loading) return true;

    return false;
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="px-10 w-full">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="quotationHeader">
              <AccordionTrigger>Quotation Header</AccordionTrigger>
              <AccordionContent>
                <CreateQuotationHeader />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quotationItem">
              <AccordionTrigger>Quotation Item</AccordionTrigger>
              <AccordionContent>
                <CreateQuotationItem />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={handleCreateQuotationButtonDisable()}
          >
            Create Quotation
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateQuotation;

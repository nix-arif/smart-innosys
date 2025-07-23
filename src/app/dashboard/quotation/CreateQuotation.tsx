"use client";

import React, { FormEvent } from "react";
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
import { affirmaPDF } from "./affirmaPDFHelper";
import { innosysPDF } from "./innosysPDFHelper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateExcel } from "@/lib/generateExcel/generateExcel";

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

    if (!resultCreateQuotation.payload) {
      toast.error("Unexpected error: No payload returned.");
      return;
    }

    generateExcel(quotationData);

    // Handle PDF generation
    const payload =
      quotationData.quotationSequal === "single"
        ? resultCreateQuotation.payload
        : quotationData;

    switch (quotationData.agent) {
      case "affirma":
        await affirmaPDF(payload);
        break;
      case "innosys":
        // await innosysPDF(payload);
        break;
      case "biomech":
        // TODO: Implement biomech PDF logic
        break;
      default:
        toast.warning("No PDF generator implemented for this agent.");
    }

    router.push("/dashboard");
    dispatch(resetQuotation());
  };

  const isSubmitDisabled =
    quotationData.loading || Object.keys(quotationData.errors).length > 0;

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
                <CreateQuotationItem
                  quotationItems={quotationData.quotationItems}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={isSubmitDisabled}
          >
            Create Quotation
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateQuotation;

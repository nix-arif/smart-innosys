"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CreateQuotationHeader from "./CreateQuotationHeader";
import CreateQuotationItem from "./CreateQuotationItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  createAffirmaQuotation,
  Quotation,
} from "@/redux/features/quotation/quotationAffirmaSlice";
import { pdf } from "@react-pdf/renderer";
import { MyDocument } from "@/lib/generatePDF";
import { PDFDocument } from "pdf-lib";

const CreateQuotation = () => {
  const dispatch = useAppDispatch();
  const quotationAffirma = useAppSelector((state) => state.quotationAffirma);

  const [affirmaFormState, setAffirmaFormState] = useState<Quotation>({
    quotationHeader: {
      id: "",
      agent: "affirma",
      quotationType: "",
      quotationRef: "",
      date: new Date(Date.now()).toISOString().split("T")[0],
      customer: {
        title: "",
        fullname: "",
      },
      selectedOrganization: {
        id: "",
        department: "",
        organizationName: "",
        organizationSSMNo: "",
        organizationTINNo: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        postcode: "",
        city: "",
        province: "",
        country: "",
      },
    },
    quotationItem: {
      products: [
        {
          id: "",
          sku: "",
          productCode: "",
          description: "",
          qty: 0,
          oum: "",
          unitPrice: 0,
          totalPrice: 0,
        },
      ],
    },
  });

  const quotationData = useAppSelector((state) => state.quotationAffirma);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createAffirmaQuotation(quotationData));
    const newPdfBlob = await pdf(
      <MyDocument data={quotationAffirma} />
    ).toBlob();
    const newPdfBytes = await newPdfBlob.arrayBuffer();
    const existingPdfBytes = await fetch("/file/DocSmartInnosys.pdf").then(
      (res) => res.arrayBuffer()
    );

    // Create a new merged document
    const mergedPdf = await PDFDocument.create();

    const templateDoc = await PDFDocument.load(existingPdfBytes);
    const generatedDoc = await PDFDocument.load(newPdfBytes);

    // Copy pages from each
    const templatePages = await mergedPdf.copyPages(
      templateDoc,
      templateDoc.getPageIndices()
    );
    const generatedPages = await mergedPdf.copyPages(
      generatedDoc,
      generatedDoc.getPageIndices()
    );

    generatedPages.forEach((page) => mergedPdf.addPage(page));
    templatePages.forEach((page) => mergedPdf.addPage(page));

    const mergedPdfBytes = await mergedPdf.save();

    // const link = document.createElement("a");
    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
    // link.download = `${quotationAffirma.quotationHeader.quotationRef}.pdf`;
    // link.click();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="px-10 w-full">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="quotationHeader">
              <AccordionTrigger>Quotation Header</AccordionTrigger>
              <AccordionContent>
                <CreateQuotationHeader
                  affirmaFormState={affirmaFormState}
                  setAffirmaFormState={setAffirmaFormState}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quotationItem">
              <AccordionTrigger>Quotation Item</AccordionTrigger>
              <AccordionContent>
                <CreateQuotationItem
                  affirmaFormState={affirmaFormState}
                  setAffirmaFormState={setAffirmaFormState}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button type="submit" className="mt-4 w-full">
            Create Quotation
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateQuotation;

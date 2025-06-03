import React from "react";
import CreateCustomer from "./CreateCustomer";
import CreateCustomerRelationship from "./CreateCustomerRelationship";
import CreateOrganization from "./CreateOrganization";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckRelationship from "./CheckRelationship";

const CustomerPage = () => {
  return (
    <div className="grid gap-3 px-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Create New Account</AccordionTrigger>
          <AccordionContent className="grid gap-2">
            <CreateCustomer />
            <CreateOrganization />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Create Relationship of An Account</AccordionTrigger>
          <AccordionContent>
            <CreateCustomerRelationship />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Check Relationship</AccordionTrigger>
          <AccordionContent>
            <CheckRelationship />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CustomerPage;

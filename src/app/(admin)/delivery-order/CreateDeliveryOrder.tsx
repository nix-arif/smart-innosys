"use client";

import { createDeliveryOrder } from "@/actions/deliveryOrder";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useActionState, useState } from "react";

// const initialStateError = {
//   deliveryOrderNo: "",
//   company: "",
//   salesRep: "",
//   applicationSpec: "",
//   date: "",
//   customerTitle: "",
//   customerName: "",
//   organizationDept: "",
//   organizationName: "",
//   organizationAddressLine1: "",
//   organizationAddressLine2: "",
//   organizationAddressLine3: "",
//   organizationPosscode: "",
//   organizationCity: "",
//   organizationState: "",
//   organizationCountry: "",
// };

const CreateDeliveryOrder = () => {
  const [state, action, pending] = useActionState(
    createDeliveryOrder,
    undefined
  );

  const [data, setData] = useState([
    {
      type: "text",
      value: "INVAF/25-0159",
      name: "deliveryOrderNo",
      label: "Delivery Order Number",
    },
    { type: "text", value: "affirma", name: "company", label: "Company" },
    {
      type: "text",
      value: "taufik",
      name: "salesRep",
      label: "Sales Representative",
    },
    {
      type: "text",
      value: "taufik",
      name: "applicationSpec",
      label: "Application Specialist",
    },
    {
      type: "date",
      value: new Date(Date.now()).toISOString().split("T")[0],
      name: "date",
      label: "Date",
    },
    {
      type: "text",
      value: "dr",
      name: "customerTitle",
      label: "Customer Title",
    },
    {
      type: "text",
      value: "syed",
      name: "customerName",
      label: "Customer Name",
    },
    {
      type: "text",
      value: "ot",
      name: "organizationDept",
      label: "Organization Department",
    },
    {
      type: "text",
      value: "gleneagles medini",
      name: "organizationName",
      label: "Organization Name",
    },
    {
      type: "text",
      value: "no 1 jalan medini",
      name: "organizationAddressLine1",
      label: "Organization Address Line 1",
    },
    {
      type: "text",
      value: "iskandar puteri",
      name: "organizationAddressLine2",
      label: "Organization Address Line 2",
    },
    {
      type: "text",
      value: "medini",
      name: "organizationAddressLine3",
      label: "Organization Address Line 3",
    },
    {
      type: "text",
      value: "80100",
      name: "organizationPosscode",
      label: "Organization Posscode",
    },
    {
      type: "text",
      value: "johor bahru",
      name: "organizationCity",
      label: "Organization City",
    },
    {
      type: "text",
      value: "johor",
      name: "organizationState",
      label: "Organization State",
    },
    {
      type: "text",
      value: "malaysia",
      name: "organizationCountry",
      label: "Organization Country",
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    data.forEach((item, index) => {
      if (item.name === e.target.name) {
        const newData = { ...item, value: e.target.value };
        data[index] = newData;
        setData([...data]);
      }
    });
  };

  return (
    <form className="w-full grid gap-2" action={action}>
      {data.map((item, index) => (
        <div className="grid grid-cols-12" key={index}>
          <label htmlFor={item.name} className="col-span-6">
            {item.label}
          </label>
          <input
            id={item.name}
            name={item.name}
            type={item.type}
            className="border border-slate-200 px-2 col-span-6 rounded-sm"
            value={item.value}
            onChange={handleChange}
          />
          {state?.errors?.[item.name as keyof typeof state.errors] && (
            <p className="text-red-500 text-sm">
              {state.errors[item.name as keyof typeof state.errors]}
            </p>
          )}
        </div>
      ))}
      <Button type="submit" className="w-full mt-5" disabled={pending}>
        Create Delivery Order
      </Button>
    </form>
  );
};

export default CreateDeliveryOrder;

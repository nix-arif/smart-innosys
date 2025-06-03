"use client";

import { createDeliveryOrder } from "@/actions/deliveryOrder";
import { Button } from "@/components/ui/button";
import { DeliveryOrderFormSchema } from "@/lib/definitions";
import { convertToDeliveryOrder } from "@/lib/deliveryOrderHelper";
import { MyDocument } from "@/lib/generatePDF";
import { pdf } from "@react-pdf/renderer";
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
      name: "organizationPostcode",
      label: "Organization Postcode",
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

  const handleDownload = async (
    e: any,
    data: {
      type: string;
      value: string;
      name: string;
      label: string;
    }[]
  ) => {
    // const blob = await pdf(<MyDocument />).toBlob();
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = `${data[1].value}.pdf`;
    // link.click();
    const deliveryOrderPrintData = convertToDeliveryOrder();
  };

  return (
    <div className="min-w-[800px]">
      <div className="font-semibold">CREATE DELIVERY ORDER</div>
      <form className="w-full grid grid-cols-12 gap-0.5" action={action}>
        {data.map((item, index) => (
          <div className="col-span-6 grid grid-cols-2" key={index}>
            <label htmlFor={item.name} className="col-span-1">
              {item.label}
            </label>
            <input
              id={item.name}
              name={item.name}
              type={item.type}
              className="border border-slate-200 px-2 col-span-1 rounded-sm text-right"
              value={item.value}
              onChange={handleChange}
            />
            {state?.errors?.[item.name as keyof typeof state.errors] && (
              <p className="text-red-500">
                {state.errors[item.name as keyof typeof state.errors]}
              </p>
            )}
          </div>
        ))}
        <table className="col-span-12 rounded-md border-1 border-slate-800 border-solid">
          <thead className="border-solid border-2 border-slate-800">
            <tr>
              <th className="w-[5%]">NO</th>
              <th className="w-[10%]">SKU</th>
              <th className="w-[10%]">PRODUCT CODE</th>
              <th className="w-[50%]">DESCRIPTION</th>
              <th className="w-[2%]">QTY</th>
              <th className="w-[3%]">OUM</th>
              <th className="w-[10%]">PRICE/UNIT</th>
              <th className="w-[10%]">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="w-[100%] px-2" />
              </td>
              <td>
                <input className="w-[100%]" />
              </td>
              <td>
                <input className="w-[100%]" />
              </td>
              <td>
                <input className="w-[100%]" />
              </td>
              <td>
                <input className="w-[100%]" />
              </td>
              <td>
                <input className="w-[100%]" />
              </td>
              <td>
                <input className="w-[100%]" />
              </td>
              <td>
                <input className="w-[100%]" />
              </td>
            </tr>
          </tbody>
        </table>
        <Button
          type="submit"
          className="w-full mt-5 col-span-12"
          disabled={pending}
          onClick={(e) => handleDownload(e, data)}
        >
          Create Delivery Order
        </Button>
      </form>
    </div>
  );
};

export default CreateDeliveryOrder;

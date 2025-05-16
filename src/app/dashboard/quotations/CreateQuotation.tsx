"use client";

import React, { ChangeEvent, useState } from "react";

const CreateQuotation = () => {
  const [quoteInfoDetails, setQuoteInfoDetails] = useState([
    {
      type: "text",
      value: "QAF/25-0159",
      name: "quotationId",
      label: "Reference No.",
    },
    {
      type: "date",
      value: new Date(Date.now()).toISOString().split("T")[0],
      name: "date",
      label: "Date",
    },
    {
      type: "text",
      value: "dr.",
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
      value: "gleneagles",
      name: "corganizationName",
      label: "Organization Name",
    },
    {
      type: "text",
      value: "no. 1, jalan medini utara",
      name: "addressLine1",
      label: "Address Line 1",
    },
    {
      type: "text",
      value: "iskandar puteri",
      name: "addressLine2",
      label: "Address Line 2",
    },
    {
      type: "text",
      value: "iskandar",
      name: "addressLine3",
      label: "Address Line 3",
    },
    {
      type: "text",
      value: "80150",
      name: "postcode",
      label: "Postcode",
    },
    {
      type: "text",
      value: "johor bahru",
      name: "city",
      label: "City",
    },
    {
      type: "text",
      value: "johor",
      name: "state",
      label: "State",
    },
    {
      type: "text",
      value: "malaysia",
      name: "country",
      label: "Country",
    },
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    quoteInfoDetails.forEach((item, index) => {
      if (item.name === e.target.name) {
        const newData = { ...item, value: e.target.value };
        quoteInfoDetails[index] = newData;
        setQuoteInfoDetails([...quoteInfoDetails]);
      }
    });
  };

  return (
    <form action="" className="grid grid-cols-12 gap-2">
      {quoteInfoDetails.map((itemDetails, index) => {
        return (
          <div
            key={itemDetails.name}
            className="col-span-6 grid grid-cols-2 gap-2"
          >
            <label htmlFor={itemDetails.name}>{itemDetails.label}</label>
            <input
              id={itemDetails.name}
              name={itemDetails.name}
              value={itemDetails.value}
              onChange={handleChange}
              className="border border-slate-300 rounded-sm py-0.5 px-1.5"
            />
          </div>
        );
      })}
    </form>
  );
};

export default CreateQuotation;

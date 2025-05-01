"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

const CreateDeliveryOrder = () => {
  const [data, setData] = useState([
    {
      type: "text",
      value: "",
      name: "deliveryOrderNo",
      label: "Delivery Order Number",
    },
    { type: "text", value: "", name: "agent", label: "Agent" },
    {
      type: "text",
      value: "",
      name: "salesRep",
      label: "Sales Representative",
    },
    {
      type: "text",
      value: "",
      name: "applicationSpec",
      label: "Application Specialist",
    },
    {
      type: "date",
      value: new Date(Date.now()).toISOString().split("T")[0],
      name: "date",
      label: "Date",
    },
    { type: "text", value: "", name: "customerTitle", label: "Customer Title" },
    { type: "text", value: "", name: "customerName", label: "Customer Name" },
    {
      type: "text",
      value: "",
      name: "organizationDept",
      label: "Organization Department",
    },
    {
      type: "text",
      value: "",
      name: "organizationName",
      label: "Organization Name",
    },
    {
      type: "text",
      value: "",
      name: "organizationAddressLine1",
      label: "Organization Address Line 1",
    },
    {
      type: "text",
      value: "",
      name: "organizationAddressLine2",
      label: "Organization Address Line 2",
    },
    {
      type: "text",
      value: "",
      name: "organizationAddressLine3",
      label: "Organization Address Line 3",
    },
    {
      type: "text",
      value: "",
      name: "organizationPosscode",
      label: "Organization Posscode",
    },
    {
      type: "text",
      value: "",
      name: "organizationCity",
      label: "Organization City",
    },
    {
      type: "text",
      value: "",
      name: "organizationState",
      label: "Organization State",
    },
    {
      type: "text",
      value: "",
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

  console.log(data);

  return (
    <form className="">
      {data.map((item, index) => (
        <div className="grid grid-cols-12" key={index}>
          <label htmlFor={item.name} className="col-span-6">
            {item.label}
          </label>
          <input
            id={item.name}
            name={item.name}
            type={item.type}
            className="border border-slate-200 mx-5 px-2 col-span-6"
            value={item.value}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
};

export default CreateDeliveryOrder;

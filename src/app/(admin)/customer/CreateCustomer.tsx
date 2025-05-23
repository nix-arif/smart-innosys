"use client";

import { createCustomer } from "@/actions/customer";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { MyDocument } from "@/lib/generatePDF";
import { pdf } from "@react-pdf/renderer";

const CreateCustomer = () => {
  const [state, action, pending] = useActionState(createCustomer, undefined);
  const [data, setData] = useState([
    { type: "text", name: "title", label: "Title", value: "" },
    { type: "text", name: "fullname", label: "Fullname", value: "" },
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

  useEffect(() => {
    if (!pending && state?.success) {
      console.log(state);
      toast.success(state?.message);
    } else if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state, pending]);

  return (
    <form className="w-full grid gap-0.5" action={action}>
      <div className="font-semibold">CREATE NEW CUSTOMER ACCOUNT</div>
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
        Create New Customer Account
      </Button>
    </form>
  );
};

export default CreateCustomer;

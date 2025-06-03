"use client";

import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/redux/app/hooks";
import {
  createCustomer,
  getCustomers,
} from "@/redux/features/customer/customerSlice";
import { toast } from "sonner";

const CreateCustomer = () => {
  // Redux property
  const dispatch = useAppDispatch();

  // Local state
  const [localData, setLocalData] = useState({
    title: "",
    fullname: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createCustomer(localData)).unwrap();
      await dispatch(getCustomers());
      toast.success("New Customer Successfully Created");
    } catch (error: any) {
      // You can show field-level or general error messages
      toast.error(error || "Failed to create customer");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Customer Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-4">
              <label htmlFor="title">Title</label>
              <select
                id="title"
                name="title"
                onChange={handleChange}
                value={localData.title}
                className="px-2 py-0.5 border border-slate-300 rounded-md w-full col-span-3"
              >
                <option value="" disabled>
                  Select a title
                </option>
                <option value="dr.">Dr.</option>
                <option value="en.">Encik</option>
              </select>
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="fullname">Fullname</label>
              <input
                id="fullname"
                name="fullname"
                value={localData.fullname}
                onChange={handleChange}
                className="px-3 py-0.5 border border-slate-300 rounded-md w-full col-span-3"
              />
            </div>
          </div>
          <Button type="submit" className="mt-5 w-full">
            Create New Customer Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCustomer;

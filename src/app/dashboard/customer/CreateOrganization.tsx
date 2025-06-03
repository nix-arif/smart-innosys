"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/redux/app/hooks";
import {
  createOrganization,
  Organization,
} from "@/redux/features/customer/customerSlice";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const CreateOrganization = () => {
  const dispatch = useAppDispatch();
  const [localData, setLocalData] = useState<Organization>({
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
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createOrganization(localData)).unwrap();
      toast.success("New Customer Organization Successfully Created");
    } catch (error: any) {
      toast.error(error || "Failed To Create Customer Organization");
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
              <label htmlFor="department">Department</label>
              <input
                id="department"
                name="department"
                value={localData.department}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="organizationName">Organization Name</label>
              <input
                id="organizationName"
                name="organizationName"
                value={localData.organizationName}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="organizationSSMNo">Organization SSM No</label>
              <input
                id="organizationSSMNo"
                name="organizationSSMNo"
                value={localData.organizationSSMNo}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="organizationTINNo">Organization TIN No</label>
              <input
                id="organizationTINNo"
                name="organizationTINNo"
                value={localData.organizationTINNo}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                id="addressLine1"
                name="addressLine1"
                value={localData.addressLine1}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="addressLine2">Address Line 2</label>
              <input
                id="addressLine2"
                name="addressLine2"
                value={localData.addressLine2}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="addressLine3">Address Line 3</label>
              <input
                id="addressLine3"
                name="addressLine3"
                value={localData.addressLine3}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="postcode">Postcode</label>
              <input
                id="postcode"
                name="postcode"
                value={localData.postcode}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                value={localData.city}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="county">State</label>
              <input
                id="province"
                name="province"
                value={localData.province}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                value={localData.country}
                onChange={handleChange}
                className="border border-slate-400 px-3 py-0.5 rounded-md col-span-3"
              />
            </div>
            <Button type="submit" className="mt-5">
              Create Organization Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateOrganization;

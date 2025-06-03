"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  createRelationshipCustomerAndCustomeOrganization,
  Customer,
  getCustomerOrganizations,
  getCustomers,
} from "@/redux/features/customer/customerSlice";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const CreateCustomerRelationship = () => {
  const dispatch = useAppDispatch();
  const { customers, customerOrganizations } = useAppSelector(
    (state) => state.customer
  );
  const [selectedId, setSelectedId] = useState({
    customerId: "",
    organizationId: "",
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedId({ ...selectedId, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(createRelationshipCustomerAndCustomeOrganization(selectedId));
  };

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getCustomerOrganizations());
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Customer Detail</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-4">
              <label htmlFor="customerId">Customer Name</label>
              <select
                id="customerId"
                name="customerId"
                defaultValue=""
                onChange={handleChange}
                className="px-2 py-0.5 border border-slate-300 rounded-md w-full col-span-3"
              >
                <option value="" disabled className="text-muted-foreground">
                  Select a customer
                </option>
                {customers.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.title} {item.fullname}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4">
              <label htmlFor="organizationId">Organization Name</label>
              <select
                id="organizationId"
                name="organizationId"
                defaultValue=""
                onChange={handleChange}
                className="px-2 py-0.5 border border-slate-300 rounded-md w-full col-span-3"
              >
                <option value="" disabled className="text-muted-foreground">
                  Select a organization
                </option>
                {customerOrganizations.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.organizationName}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Create Relationship</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCustomerRelationship;

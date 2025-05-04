import { getCustomers } from "@/actions/customer";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const ViewCustomer = async () => {
  const customers = await getCustomers();
  return (
    <div>
      {customers.map((cust, index) => (
        <Card key={index}>
          <CardHeader>
            <div>{index + 1}</div>
            <CardTitle>{cust.title}</CardTitle>
            <CardDescription>{cust.fullname}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ViewCustomer;

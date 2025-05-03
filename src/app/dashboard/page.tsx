import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="grid gap-2">
      <Link href="/customer">
        <Button className="cursor-pointer">CREATE NEW CUSTOMER ACCOUNT</Button>
      </Link>
      <Link href="/delivery-order">
        <Button className="cursor-pointer">CREATE DELIVERY ORDER</Button>
      </Link>
    </div>
  );
};

export default DashboardPage;

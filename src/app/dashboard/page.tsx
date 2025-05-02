import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <Link href="/delivery-order">
        <Button className="cursor-pointer">DELIVERY ORDER</Button>
      </Link>
    </div>
  );
};

export default DashboardPage;

import { Combobox } from "@/components/combo-box";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/redux/app/hooks";
import { CustomerState } from "@/redux/features/customer/customerSlice";
import React from "react";

const SearchQuotation = () => {
  const customerState: CustomerState = useAppSelector(
    (state) => state.customer
  );
  return (
    <Card>
      <CardContent>
        <form>
          <div className="grid grid-cols-2">
            <Label htmlFor="customerName">Search by Customer</Label>
            <Combobox customerState={customerState} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchQuotation;

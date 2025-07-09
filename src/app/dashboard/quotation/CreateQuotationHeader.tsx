import React, { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  changeAgent,
  changeDepartment,
  changeMarkup,
  changeQuotationSequal,
  changeQuoteType,
  changeSelectedOrganization,
  changeSupportingDoc,
  quotationCount,
  reCalculatePrice,
} from "@/redux/features/quotation/quotationSlice";
import DatePicker from "@/components/date-picker";
import {
  CustomerState,
  getCustomers,
} from "@/redux/features/customer/customerSlice";
import { Combobox } from "@/components/combo-box";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/capitalFirstLetter";
import { Input } from "@/components/ui/input";

const CreateQuotationHeader = () => {
  const dispatch = useAppDispatch();
  const customerState: CustomerState = useAppSelector(
    (state) => state.customer
  );
  const quotationData = useAppSelector((state) => state.quotation);
  const [department, setDepartment] = useState("");
  const [markUp, setMarkUp] = useState(0);

  const [componentDate, setComponentDate] = useState(new Date());

  const handleQuoteSequalChange = (value: string) => {
    dispatch(changeQuotationSequal(value));
    dispatch(changeAgent(quotationData.agent));
  };

  const handleSupportingDocChange = (value: string) => {
    dispatch(changeSupportingDoc(value));
  };

  const handleAgentChange = (value: string) => {
    dispatch(changeAgent(value));
    dispatch(changeQuoteType(value));
  };

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(changeQuoteType("affirma"));
  }, []);

  useEffect(() => {
    const countQuote = async () => {
      await dispatch(
        quotationCount({
          quoteSequal: quotationData.quotationSequal,
          agent: quotationData.agent,
        })
      );
      dispatch(changeAgent("affirma"));
    };
    countQuote();
  }, []);

  return (
    <div className="grid gap-5 border p-5 rounded-md">
      {/* QUOTATION SEQUAL */}
      <div className="grid gap-2 grid-cols-2">
        <Label>Quotation Sequal</Label>
        <RadioGroup
          defaultValue="withDummy"
          className="grid gap-5"
          onValueChange={handleQuoteSequalChange}
        >
          <div className="grid grid-cols-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="withDummy" id="withDummy" />
              <Label htmlFor="withDummy">With Dummy</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* SUPPORTING DOCS */}
      <div className="grid gap-2 grid-cols-2">
        <Label>Supporting Docs for Every Quotation</Label>
        <RadioGroup
          defaultValue="true"
          className="grid gap-5"
          onValueChange={handleSupportingDocChange}
        >
          <div className="grid grid-cols-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false">No</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* AGENT */}
      <div className="grid gap-2 grid-cols-2">
        <Label>Agent</Label>
        <RadioGroup
          defaultValue="affirma"
          className="grid gap-5"
          onValueChange={handleAgentChange}
        >
          <div className="grid grid-cols-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="affirma" id="affirma" />
              <Label htmlFor="affirma">Affirma</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="innosys" id="innosys" />
              <Label htmlFor="innosys">Smart Innosys</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="biomech" id="biomech" />
              <Label htmlFor="biomech">Bio Mech</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* DATE */}
      <div className="grid gap-2 grid-cols-2">
        <Label htmlFor="date">Date</Label>
        <DatePicker />
      </div>

      {/* CUSTOMER NAME */}
      <div className="grid gap-2 grid-cols-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Combobox customerState={customerState} />
      </div>

      {/* CUSTOMER ORGANIZATION */}
      <div className="grid gap-2 grid-cols-2">
        <Label htmlFor="customerName">Customer Organization</Label>
        <Select
          onValueChange={(value) => {
            dispatch(changeSelectedOrganization(JSON.parse(value)));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Organization" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {customerState.organizationsByCustomerId.length > 0 ? (
                customerState.organizationsByCustomerId.map((organization) => {
                  return (
                    <SelectItem
                      key={organization.id}
                      value={JSON.stringify(organization)}
                    >
                      {capitalizeFirstLetter(organization.organizationName)}
                    </SelectItem>
                  );
                })
              ) : (
                <SelectItem disabled value="none">
                  No Organization Available
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* CUSTOMER DEPARTMENT */}
      <div className="grid gap-2 grid-cols-2">
        <Label htmlFor="customerDepartment">Customer Department</Label>
        <Input
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            dispatch(changeDepartment(e.target.value));
          }}
        />
      </div>

      {/* MARKUP */}
      <div className="grid gap-2 grid-cols-2">
        <Label htmlFor="markup">Markup %</Label>
        <Input
          value={markUp}
          onChange={(e) => {
            setMarkUp(+e.target.value);
            dispatch(changeMarkup(+e.target.value));
            dispatch(reCalculatePrice());
          }}
        />
      </div>
    </div>
  );
};

export default CreateQuotationHeader;

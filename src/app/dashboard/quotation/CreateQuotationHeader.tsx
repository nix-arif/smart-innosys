import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getAffirmaCurrentQuotationRef,
  getCustomer,
  Quotation,
  setSelectedOrganization,
} from "@/redux/features/quotation/quotationAffirmaSlice";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCustomerOrganizationByCustomerId,
  getCustomers,
} from "@/redux/features/customer/customerSlice";
import { produce } from "immer";

interface CreateQuotationHeaderProps {
  affirmaFormState: Quotation;
  setAffirmaFormState: React.Dispatch<React.SetStateAction<Quotation>>;
}

const CreateQuotationHeader = ({
  affirmaFormState,
  setAffirmaFormState,
}: CreateQuotationHeaderProps) => {
  const dispatch = useAppDispatch();
  const { customers, organizationsByCustomerId } = useAppSelector(
    (state) => state.customer
  );
  const quotationAffirma = useAppSelector((state) => state.quotationAffirma);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  };

  const handleCustomerSelectChange = (value: string) => {
    const selectedCustomer = customers.find(
      (customer) => customer.id === value
    );
    dispatch(getCustomer(value));

    if (selectedCustomer) {
      setAffirmaFormState((prev) =>
        produce(prev, (draft) => {
          draft.quotationHeader.customer = selectedCustomer;
        })
      );
      dispatch(getCustomerOrganizationByCustomerId(value));
    }
  };

  const handleOrganizationSelectChange = (value: string) => {
    const selectedOrganization = organizationsByCustomerId.find(
      (organization) => organization.id === value
    );

    if (selectedOrganization) {
      setAffirmaFormState((prev) =>
        produce(prev, (draft) => {
          draft.quotationHeader.selectedOrganization = selectedOrganization;
        })
      );
      dispatch(setSelectedOrganization(selectedOrganization));
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await dispatch(getCustomers());
        await dispatch(
          getAffirmaCurrentQuotationRef(affirmaFormState.quotationHeader.agent)
        ).unwrap();
      } catch (error) {
        console.error("Failed to fetch quotation ref:", error);
      }
    };

    initializeData();
  }, [dispatch, affirmaFormState.quotationHeader.agent]);

  useEffect(() => {
    if (quotationAffirma.quotationHeader.quotationRef) {
      setAffirmaFormState((prev) =>
        produce(prev, (draft) => {
          draft.quotationHeader.quotationRef =
            quotationAffirma.quotationHeader.quotationRef;
        })
      );
    }
  }, [quotationAffirma.quotationHeader.quotationRef]);

  return (
    <CardContent>
      <div className="grid gap-2">
        <div className="grid grid-cols-6">
          <Label>Agent</Label>
          <RadioGroup
            defaultValue="affirma"
            name="agent"
            className="col-span-5 grid grid-cols-3"
            onValueChange={(value) => {
              try {
                dispatch(getAffirmaCurrentQuotationRef(value)).unwrap();
                toast.success(
                  "Quotation Ref No Successfully Retrieved From Database"
                );
              } catch (error: any) {
                toast.error(
                  error?.message ||
                    "Failed To Get Quotation Ref No From Database"
                );
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="affirma" id="affirma" />
              <Label htmlFor="affirma">Affirma</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="innosys" id="innosys" />
              <Label htmlFor="innosys">Innosys</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="biomech" id="biomech" />
              <Label htmlFor="biomech">Biomech</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="grid grid-cols-2">
            <Label>Ref Affirma</Label>
            <Input
              type="text"
              name="quotationRefAffirma"
              value={affirmaFormState.quotationHeader.quotationRef}
              disabled
              className="text-xs"
            />
          </div>
          {/* <div className="grid grid-cols-2">
            <Label>Ref Innosys</Label>
            <Input
              type="text"
              name="quotationRefInnosys"
              onChange={handleChange}
              value={quotationHeaderInnosys.quotationRef}
              disabled
            />
          </div> */}
        </div>
        <div className="grid grid-cols-6">
          <Label htmlFor="customer">Customer</Label>
          <div className="col-span-5">
            <Select name="customer" onValueChange={handleCustomerSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Customer Name" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer, index) => (
                  <SelectItem key={customer.id} value={customer.id as string}>
                    {customer.title} {customer.fullname}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-6">
          <Label htmlFor="customer">Organization Name</Label>
          <div className="col-span-5">
            <Select
              name="organization"
              onValueChange={handleOrganizationSelectChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                {organizationsByCustomerId.map((organization, index) => (
                  <SelectItem
                    key={organization.id}
                    value={organization.id as string}
                  >
                    {organization.organizationName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-6">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            name="date"
            value={affirmaFormState.quotationHeader.date}
            onChange={handleChange}
            className="col-span-5"
          />
        </div>
      </div>
    </CardContent>
  );
};

export default CreateQuotationHeader;

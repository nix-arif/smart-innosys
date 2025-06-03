"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import {
  Customer,
  getCustomerOrganizationByCustomerId,
  getCustomers,
} from "@/redux/features/customer/customerSlice";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CheckRelationship = () => {
  const dispatch = useAppDispatch();
  const { customers, organizationsByCustomerId } = useAppSelector(
    (state) => state.customer
  );

  const [open, setOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedCustomer = customers.find(
    (customer: Customer) => customer.id === selectedCustomerId
  );

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  // ✅ Match width on open
  useEffect(() => {
    if (open && triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  useEffect(() => {
    if (selectedCustomerId) {
      dispatch(getCustomerOrganizationByCustomerId(selectedCustomerId));
    }
  }, [selectedCustomerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Customer and Organization Relationship</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label>Customer Name</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  ref={triggerRef}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="col-span-3 justify-between"
                >
                  {selectedCustomer
                    ? `${selectedCustomer.title} ${selectedCustomer.fullname}`
                    : "Select a customer"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent style={{ width: popoverWidth }} className="p-0">
                <Command>
                  <CommandInput placeholder="Search customer..." />
                  <CommandList>
                    <CommandEmpty>No customer found.</CommandEmpty>
                    <CommandGroup>
                      {customers.map((customer) => {
                        const label = `${customer.title} ${customer.fullname}`;
                        return (
                          <CommandItem
                            key={customer.id}
                            value={customer.id ?? ""}
                            onSelect={() => {
                              if (customer.id) {
                                setSelectedCustomerId(customer.id);
                                setOpen(false);
                              }
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCustomerId === customer.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {label}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardContent>
          {organizationsByCustomerId.length > 0 ? (
            organizationsByCustomerId.map((organization) => (
              <div key={organization.id}>{organization.organizationName}</div>
            ))
          ) : (
            <div>No Organization Connected</div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CheckRelationship;

"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import {
  CustomerState,
  getCustomerOrganizationByCustomerId,
} from "@/redux/features/customer/customerSlice";
import { useAppDispatch } from "@/redux/app/hooks";
import { changeCustomer } from "@/redux/features/quotation/quotationSlice";
import { capitalizeFirstLetter } from "@/lib/capitalFirstLetter";

type ComboboxProps = {
  customerState: CustomerState;
  onSelect?: (customerId: string) => void;
};

export function Combobox({ customerState, onSelect }: ComboboxProps) {
  const dispatch = useAppDispatch();
  const { customers } = customerState;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const frameworks = customers.map((cust) => ({
    id: cust.id,
    title: cust.title,
    fullname: cust.fullname,
    label: `${cust.title} ${cust.fullname}`,
  }));

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>();

  // ResizeObserver to track width changes
  React.useEffect(() => {
    const button = triggerRef.current;
    if (!button) return;

    const resizeObserver = new ResizeObserver(() => {
      setTriggerWidth(button.offsetWidth);
    });

    resizeObserver.observe(button);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? capitalizeFirstLetter(
                frameworks.find((f) => f.id === value)?.label!
              )
            : "Select Customer"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: triggerWidth }}>
        <Command>
          <CommandInput placeholder="Search customer..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Customer Found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.id}
                  value={framework.label}
                  onSelect={async () => {
                    setValue(framework.id!);
                    dispatch(changeCustomer(framework));
                    await dispatch(
                      getCustomerOrganizationByCustomerId(framework.id!)
                    );
                    setOpen(false);
                    onSelect?.(framework.id!);
                  }}
                  className="flex justify-between"
                >
                  {capitalizeFirstLetter(framework.label)}
                  {value === framework.id && (
                    <Check className="w-4 h-4 opacity-100" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

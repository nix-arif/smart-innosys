"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Calendar1Icon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

type Props = {};

const DatePicker = (props: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleDateSelect = (selected: Date | undefined) => {
    if (!selected) return; //
    setDate(selected);
    setCalendarOpen(false);
  };

  return (
    <div className="grid gap-2">
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <Calendar1Icon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-lg border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;

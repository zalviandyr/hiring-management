"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import Image from "next/image";

export const DatePickerField = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <InputGroup>
            <InputGroupInput
              placeholder="Select your date of birth"
              value={date?.toLocaleDateString()}
            />

            <InputGroupAddon>
              <div className="relative h-4 w-4">
                <Image src={"/icons/calendar.svg"} alt="Calendar Icon" fill />
              </div>
            </InputGroupAddon>

            <InputGroupAddon align="inline-end">
              <ChevronDownIcon />
            </InputGroupAddon>
          </InputGroup>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0 border-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="label"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

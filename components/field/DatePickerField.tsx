"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import Image from "next/image";
import { DatePicker as AntdDatePicker } from "antd";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/en";

export const DatePickerField = () => {
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    weekdaysMin: ["S", "M", "T", "W", "T", "F", "S"], // hanya 1 huruf
  });

  return (
    <InputGroup>
      <AntdDatePicker
        style={{
          border: "none",
          boxShadow: "none",
          background: "transparent",
        }}
        prevIcon={<ChevronLeft className="text-neutral-100 hover:text-neutral-100/50 h-4 w-4" />}
        nextIcon={<ChevronRight className="text-neutral-100 hover:text-neutral-100/50 h-4 w-4" />}
        superPrevIcon={
          <ChevronsLeft className="text-neutral-100 hover:text-neutral-100/50 h-4 w-4" />
        }
        superNextIcon={
          <ChevronsRight className="text-neutral-100 hover:text-neutral-100/50 h-4 w-4" />
        }
        showNow={false}
        suffixIcon={<></>}
        allowClear={false}
        className="w-full"
        inputReadOnly
        placeholder="Select your date of birth"
        disabledDate={(currentDate) => currentDate && currentDate.isAfter(dayjs(), "day")}
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
  );
};

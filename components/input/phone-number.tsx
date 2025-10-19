"use client";

import { ChevronDownIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { countries, getCountryFromCountryCode } from "country-codes-flags-phone-codes";

type Country = {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
};

type PhoneNumberInputProps = {
  onChange?: (value: string) => void;
};

export const PhoneNumberInput = ({ onChange }: PhoneNumberInputProps) => {
  const [selected, setSelected] = useState<Country | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!Boolean(selected)) {
      const id = getCountryFromCountryCode("ID");
      setSelected(id!);
    }
  }, []);

  const filtered = useMemo(
    () =>
      countries.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) || item.dialCode.includes(value)
      ),
    [value]
  );

  return (
    <InputGroup>
      <Popover>
        <PopoverTrigger asChild>
          <InputGroupAddon>
            <InputGroupButton variant="ghost" className="border-r border-neutral-40">
              <div className="flex flex-row justify-around w-10 items-center">
                <div className="relative h-4 w-4">
                  <Image
                    src={`/images/flags/${selected?.code.toLowerCase()}.svg`}
                    alt={`${selected?.name} Flag`}
                    fill
                    className="object-fill rounded-full border border-neutral-40"
                  />
                </div>

                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </InputGroupButton>
          </InputGroupAddon>
        </PopoverTrigger>

        <PopoverContent side="bottom" className="border border-neutral-40 bg-neutral-10 w-80 p-0">
          <Command>
            <div className="px-4 pt-4">
              <CommandInput placeholder="Search" value={value} onValueChange={setValue} />
            </div>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="overflow-scroll h-32 px-4 mt-3 border-t border-neutral-40">
              {filtered.map((item) => (
                <CommandItem
                  key={item.code}
                  onSelect={() => {
                    setSelected(item);
                  }}
                  className="cursor-pointer flex flex-row text-xs text-neutral-100 hover:bg-neutral-20 rounded-md py-2"
                >
                  <div className="relative h-4 w-4">
                    <Image
                      src={`/images/flags/${item.code.toLowerCase()}.svg`}
                      alt={`${selected?.name} Flag`}
                      fill
                      className="object-fill rounded-full border border-neutral-40"
                    />
                  </div>

                  <span className="grow font-bold">{item.name}</span>

                  <span>{item.dialCode}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <InputGroupAddon>{selected?.dialCode}</InputGroupAddon>

      <InputGroupInput
        placeholder="XXXXX"
        type="number"
        onChange={(e) => {
          const value = e.target.value;
          const result = selected?.dialCode + value;

          onChange?.(result);
        }}
      />
    </InputGroup>
  );
};

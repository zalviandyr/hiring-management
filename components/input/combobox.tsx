"use client";

import { cn } from "@/lib/utils";
import { ConfigProvider, Select } from "antd";
import { BaseOptionType } from "antd/es/select";
import { useEffect, useState } from "react";

type ComboboxInputProps = {
  placeholder?: string;
  options?: BaseOptionType[];
  onChange?: (value: string) => void;
};

export const ComboboxInput = ({ placeholder, options, onChange }: ComboboxInputProps) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (value) onChange?.(value);
  }, [value]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E0E0E0",
        },
      }}
    >
      <div
        className={cn(
          "[&_.ant-select]:!h-10",
          "[&_.ant-select-selection-search]:font-sans",
          "[&_.ant-select-selector]:!border-2 [&_.ant-select-selector]:!rounded-md",
          "[&_.ant-select-arrow]:!text-neutral-90"
        )}
      >
        <Select
          allowClear
          showSearch
          placeholder={placeholder}
          optionFilterProp="label"
          value={value}
          onChange={setValue}
          onClear={() => setValue(null)}
          rootClassName="w-full"
          options={options}
          getPopupContainer={(triggerNode) =>
            triggerNode.closest("[data-slot=dialog-content]") ?? document.body
          }
          optionRender={(opt) => {
            return <span className="font-bold text-xs cursor-pointer">{opt.label}</span>;
          }}
        />
      </div>
    </ConfigProvider>
  );
};

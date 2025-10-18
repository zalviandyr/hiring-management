"use client";

import { cn } from "@/lib/utils";
import { ConfigProvider, Select } from "antd";

type ComboboxInputProps = {
  placeholder?: string;
};

export const ComboboxInput = ({ placeholder }: ComboboxInputProps) => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

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
          onChange={onChange}
          onSearch={onSearch}
          rootClassName="w-full"
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </div>
    </ConfigProvider>
  );
};

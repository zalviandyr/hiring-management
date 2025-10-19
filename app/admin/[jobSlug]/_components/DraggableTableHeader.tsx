import { CSSProperties, useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Column, flexRender, Header } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { Applicant } from "./ApplicantTable";
import { Input } from "@/components/ui/input";

export const DraggableTableHeader = ({ header }: { header: Header<Applicant, unknown> }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
    id: header.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={style}
      className={cn(
        "text-xs uppercase font-bold text-neutral-100 hover:text-neutral-80 py-6",
        !header.column.getIsLastColumn() && "border-r border-neutral-40",
        "relative select-none"
      )}
    >
      <div className="flex h-full flex-col gap-3" {...attributes} {...listeners}>
        <div className="cursor-grab text-center">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>

        <div className="border-t px-4 border-neutral-40">
          {header.column.getCanFilter() ? (
            <Filter column={header.column} />
          ) : (
            <div className="h-14" />
          )}
        </div>
      </div>

      {/* Resize Handle */}
      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none ${
            header.column.getIsResizing() ? "bg-blue-400" : "bg-transparent"
          }`}
        />
      )}
    </th>
  );
};

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();

  return (
    <DebouncedInput
      className="mt-4"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableTableHeader } from "./DraggableTableHeader";
import { DragAlongCell } from "./DragAlongCell";
import { ApplicantFormData } from "@/features/applicants/schema";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type ApplicantTableProps = {
  data: ApplicantFormData[];
};

export const ApplicantTable = ({ data }: ApplicantTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const columns = useMemo<ColumnDef<ApplicantFormData, any>[]>(
    () => [
      {
        id: "full_name",
        accessorKey: "full_name",
        header: "Full name",
        cell: (info) => info.getValue(),
        enableResizing: true,
      },
      {
        id: "email",
        accessorKey: "email",
        header: "Email Address",
        cell: (info) => info.getValue(),
        enableResizing: true,
      },
      {
        id: "phone_number",
        accessorKey: "phone_number",
        header: "Phone Number",
        cell: (info) => info?.getValue() ?? "-",
        enableResizing: true,
      },
      {
        id: "date_of_birth",
        accessorKey: "date_of_birth",
        header: "Date of Birth",
        cell: (info) => <span>{formatDate(info.getValue())}</span>,
        enableResizing: true,
      },
      {
        id: "domicile",
        accessorKey: "domicile",
        header: "Domicile",
        cell: (info) => info?.getValue() ?? "-",
        enableResizing: true,
      },
      {
        id: "gender",
        accessorKey: "gender",
        header: "Gender",
        cell: (info) => (
          <>{info?.getValue() ? <span className="capitalize">{info.getValue()}</span> : "-"}</>
        ),
        enableResizing: true,
      },
      {
        id: "linkedin_link",
        accessorKey: "linkedin_link",
        header: "Link Linkedin",
        cell: (info) => (
          <>
            {info?.getValue() ? (
              <Link href={info.getValue()} className="text-primary-main" target="_blank">
                {info.getValue()}
              </Link>
            ) : (
              "-"
            )}
          </>
        ),
        enableResizing: true,
        enableColumnFilter: false,
      },
      {
        id: "applied_date",
        accessorKey: "created",
        header: "Applied Date",
        cell: (info) => <span>{formatDate(info.getValue(), "long")}</span>,
        enableResizing: true,
      },
    ],
    []
  );

  const initialColumnOrder = useMemo(() => columns.map((column) => column.id!), [columns]);

  useEffect(() => {
    setColumnOrder(initialColumnOrder);
  }, [initialColumnOrder]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    columnResizeMode: "onChange",
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <table className="w-full border-separate border-spacing-0 shadow-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-neutral-20">
              <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                {headerGroup.headers.map((header) => (
                  <DraggableTableHeader key={header.id} header={header} />
                ))}
              </SortableContext>
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="bg-neutral-10">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <SortableContext
                      key={cell.id}
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      <DragAlongCell key={cell.id} cell={cell} />
                    </SortableContext>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </DndContext>
  );
};

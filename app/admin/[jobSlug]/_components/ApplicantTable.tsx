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
import { faker } from "@faker-js/faker";
import { DraggableTableHeader } from "./DraggableTableHeader";
import { DragAlongCell } from "./DragAlongCell";

export type Applicant = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  domicile: string;
  gender: string;
  linkedin: string;
};

const makeData = (len: number): Applicant[] => {
  const result: Applicant[] = [];
  for (let i = 0; i < len; i++) {
    result.push({
      fullName: faker.person.fullName(),
      email: faker.person.lastName(),
      phone: faker.phone.number(),
      dateOfBirth: faker.person.zodiacSign(),
      domicile: faker.person.jobArea(),
      gender: faker.person.gender(),
      linkedin: faker.person.sex(),
    });
  }

  return result;
};

export const ApplicantTable = () => {
  const [data, setData] = useState<Applicant[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const columns = useMemo<ColumnDef<Applicant, any>[]>(
    () => [
      {
        id: "fullName",
        accessorKey: "fullName",
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
        id: "phone",
        accessorKey: "phone",
        header: "Phone Number",
        cell: (info) => info.getValue(),
        enableResizing: true,
      },
      {
        id: "dateOfBirth",
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        cell: (info) => info.getValue(),
        enableResizing: true,
      },
      {
        id: "domicile",
        accessorKey: "domicile",
        header: "Domicile",
        cell: (info) => info.getValue(),
        enableResizing: true,
      },
      {
        id: "gender",
        accessorKey: "gender",
        header: "Gender",
        cell: (info) => info.getValue(),
        enableResizing: true,
      },
      {
        id: "linkedin",
        accessorKey: "linkedin",
        header: "Link Linkedin",
        cell: (info) => info.getValue(),
        enableResizing: true,
        enableColumnFilter: false,
      },
    ],
    []
  );

  const initialColumnOrder = useMemo(() => columns.map((column) => column.id!), [columns]);

  useEffect(() => {
    setColumnOrder(initialColumnOrder);
  }, [initialColumnOrder]);

  useEffect(() => {
    setData(makeData(5000));
  }, []);

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

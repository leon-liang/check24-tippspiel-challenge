"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onRowClick: (selectedIndex?: number) => void;
}

const Table = <TData, TValue>({
  columns,
  data,
  onRowClick,
}: TableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full rounded-md border border-gray-6">
      <table className="w-full">
        <thead
          className="cursor-default rounded-md border-b border-gray-6 bg-colors-indigo-2"
          onClick={() => onRowClick(undefined)}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border-b border-gray-6" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="border-b border-r border-gray-6 py-1.5 font-normal text-gray-12 last:border-r-0"
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              className="border-b border-gray-6 last:border-b-0 hover:bg-colors-gray-2"
              key={row.id}
              onClick={() => onRowClick(index)}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  className="border-r border-gray-6 py-1.5 text-gray-11 last:border-r-0"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
export type Column<TData> = ColumnDef<TData>;

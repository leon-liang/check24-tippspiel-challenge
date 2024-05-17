"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import { colors } from "../../../tailwind.config";
import ChevronFirstIcon from "@/components/icons/ChevronFirstIcon";
import ChevronLastIcon from "@/components/icons/ChevronLastIcon";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  rowsPerPage: number;
  onRowClick: (selectedIndex: number) => void;
}

const Table = <TData, TValue>({
  columns,
  data,
  rowsPerPage,
  onRowClick,
}: TableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: rowsPerPage,
      },
    },
  });

  return (
    <div className="w-full rounded-md border border-gray-6">
      <table className="w-full border-b">
        <thead className="cursor-default rounded-md border-b border-gray-6 bg-colors-indigo-2 text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border-b border-gray-6" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="rounded-md border-b border-r border-gray-6 py-1.5 font-normal text-gray-12 last:border-r-0"
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
              className="cursor-pointer border-b border-gray-6 text-center last:border-b-0 hover:bg-colors-gray-2"
              key={row.id}
              onClick={() =>
                onRowClick(
                  index +
                    table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize,
                )
              }
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
      <div className="flex items-center justify-end gap-2 px-4 py-2">
        <button onClick={() => table.firstPage()}>
          <ChevronFirstIcon width={20} height={20} stroke={colors.gray["11"]} />
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon width={20} height={20} stroke={colors.gray["11"]} />
        </button>
        <p className="text-sm">
          {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
        </p>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon width={20} height={20} stroke={colors.gray["11"]} />
        </button>
        <button onClick={() => table.lastPage()}>
          <ChevronLastIcon width={20} height={20} stroke={colors.gray["11"]} />
        </button>
      </div>
    </div>
  );
};

export default Table;
export type Column<TData> = ColumnDef<TData>;

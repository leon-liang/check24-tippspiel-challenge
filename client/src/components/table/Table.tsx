"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import { colors } from "../../../tailwind.config";
import ChevronFirstIcon from "@/components/icons/ChevronFirstIcon";
import ChevronLastIcon from "@/components/icons/ChevronLastIcon";
import { Select } from "@/components/select/Select";

interface TableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onRowClick: (selectedIndex: number) => void;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
}

const Table = <TData, TValue>({
  columns,
  data,
  onRowClick,
  setCurrentPage,
}: TableProps<TData, TValue>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    autoResetPageIndex: false,
  });

  const currentPageIndex = useMemo(() => {
    return table.getState().pagination.pageIndex;
  }, [table]);

  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage(currentPageIndex);
    }
  }, [currentPageIndex]);

  return (
    <div className="w-full rounded-md border border-gray-6">
      <table className="w-full border-b">
        <thead className="cursor-default rounded-md border-b border-gray-6 bg-colors-indigo-2 text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border-b border-gray-6" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="rounded-md border-b border-r border-gray-6 p-1 font-mono text-sm font-normal text-gray-11 last:border-r-0"
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
      <div className="flex items-center justify-end gap-6 px-4 py-1 text-sm">
        <div className="flex flex-row items-center gap-2">
          <p>Page Size:</p>
          <Select
            variant="xs"
            value={String(pagination.pageSize)}
            items={["5", "10", "20", "50"]}
            onValueChange={(value) => {
              setPagination((prevState) => {
                return {
                  pageIndex: prevState.pageIndex,
                  pageSize: parseInt(value),
                };
              });
            }}
          />
        </div>
        <div className="flex gap-1">
          <button onClick={() => table.firstPage()}>
            <ChevronFirstIcon
              width={20}
              height={20}
              stroke={colors.gray["11"]}
            />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon
              width={20}
              height={20}
              stroke={colors.gray["11"]}
            />
          </button>
          <p className="text-sm">
            {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
          </p>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon
              width={20}
              height={20}
              stroke={colors.gray["11"]}
            />
          </button>
          <button onClick={() => table.lastPage()}>
            <ChevronLastIcon
              width={20}
              height={20}
              stroke={colors.gray["11"]}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
export type Column<TData> = ColumnDef<TData>;

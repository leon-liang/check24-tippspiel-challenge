"use client";

import { notFound } from "next/navigation";
import Banner, { BannerTitle } from "@/components/banner/Banner";
import { DateTime } from "luxon";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useValidatePermissions from "@/hooks/use-validate-permissions";
import { useState } from "react";

type Match = {
  gameTime: string;
  homeTeam: {
    name?: string;
    score?: number;
  };
  awayTeam: {
    name?: string;
    score?: number;
  };
  lastUpdated: string;
};

const defaultData: Match[] = [
  {
    gameTime: DateTime.local(2024, 6, 14, 21).toISOTime() ?? "",
    homeTeam: {
      name: "Germany",
    },
    awayTeam: {
      name: "Scotland",
    },
    lastUpdated: DateTime.now().toISOTime(),
  },
];

const columnHelper = createColumnHelper<Match>();

const columns = [
  columnHelper.accessor("gameTime", {
    header: "Game Time",
  }),
  columnHelper.group({
    header: "Home Team",
    columns: [
      columnHelper.accessor("homeTeam.name", {
        header: "Name",
      }),
      columnHelper.accessor("homeTeam.score", {
        header: "Score",
      }),
    ],
  }),
  columnHelper.group({
    header: "Away Team",
    columns: [
      columnHelper.accessor("awayTeam.name", {
        header: "Name",
      }),
      columnHelper.accessor("awayTeam.score", {
        header: "Score",
      }),
    ],
  }),
  columnHelper.accessor("lastUpdated", {
    header: "Last Updated",
  }),
];

const Matches = () => {
  const [isLoading, isPermitted] = useValidatePermissions(["admin:full"]);

  const [data, setData] = useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return null;
  }

  if (!isPermitted) {
    return notFound();
  }

  return (
    <>
      <Banner>
        <BannerTitle>Matches</BannerTitle>
      </Banner>
      <div className="flex flex-row items-center gap-6 py-6 md:px-32">
        <table className="border">
          <thead className="border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border">
                {headerGroup.headers.map((header) => (
                  <th
                    className="border"
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
            {table.getRowModel().rows.map((row) => (
              <tr
                className="border"
                key={row.id}
                onClick={() => {
                  console.log(row.id);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="border" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Matches;

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import { colors } from "../../../tailwind.config";
import {
  Member,
  useLeaderboard,
  useLeaderboardColumns,
} from "@/hooks/use-leaderboard";
import { useGetMe } from "@/hooks/api/users.api";
import ChevronUpIcon from "@/components/icons/ChevronUpIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { Select } from "@/components/select/Select";

interface LeaderboardProps {
  searchTerm?: string;
  members: Member[];
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  onRowClicked: (selectedPosition: number) => void;
  onBackClicked: (position: number, direction: "forward" | "backward") => void;
  onForwardClicked: (
    position: number,
    direction: "forward" | "backward",
  ) => void;
}

const Leaderboard = ({
  searchTerm,
  members,
  pageSize,
  setPageSize,
  onRowClicked,
  onBackClicked,
  onForwardClicked,
}: LeaderboardProps) => {
  const data = useLeaderboard(members);
  const leaderboardColumns = useLeaderboardColumns();

  const table = useReactTable({
    data,
    columns: leaderboardColumns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        position: false,
      },
    },
  });

  const { data: meData } = useGetMe();

  return (
    <div className="min-h-[120px] w-full rounded-md border border-gray-6 bg-colors-white-A12">
      <div className="flex flex-row items-center gap-2 rounded-t-md border-b border-gray-6 bg-colors-indigo-2 py-1 pl-4 pr-1 text-gray-11">
        <h1 className="p-1 font-mono text-sm">Leaderboard</h1>
      </div>
      <table className="w-full table-fixed border-b">
        <thead className="border-gray-6 text-gray-11">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border-b border-gray-6" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={{
                    width: `${header.getSize()}px`,
                  }}
                  className="rounded-md border-b border-gray-6 pb-1 pt-6 text-sm font-normal text-gray-11"
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
          {table.getRowModel().rows.map((row, index) => {
            return (
              <React.Fragment key={row.id}>
                <tr
                  onClick={() => {
                    onRowClicked(row.getValue("position"));
                  }}
                  className={cn(
                    "cursor-pointer rounded-md border-b border-gray-6 text-center last:border-b-0",
                    row.getValue("username") === meData?.data.user?.username ||
                      row.getValue("username") === searchTerm
                      ? "bg-colors-purple-2"
                      : "",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      style={{ width: `${cell.column.getSize()}px` }}
                      className="rounded-md px-3 py-1.5 text-gray-11 last:border-r-0"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
                {table.getRowModel().rows[index + 1] &&
                (table
                  .getRowModel()
                  .rows[index + 1].getValue("position") as number) >
                  (row.getValue("position") as number) + 1 ? (
                  <React.Fragment>
                    <tr
                      onClick={() =>
                        onForwardClicked(
                          (table
                            .getRowModel()
                            .rows[index].getValue("position") as number) + 1,
                          "forward",
                        )
                      }
                      className="cursor-pointer border-b border-gray-6 bg-colors-gray-2 hover:bg-colors-gray-3"
                    >
                      <td className="text-center" colSpan={4}>
                        <ChevronDownIcon
                          height={18}
                          width={18}
                          stroke={colors.gray["11"]}
                          className="inline-block"
                        />
                      </td>
                    </tr>
                    <tr
                      onClick={() => {
                        onBackClicked(
                          (table
                            .getRowModel()
                            .rows[index + 1].getValue("position") as number) -
                            1,
                          "backward",
                        );
                      }}
                      className="cursor-pointer border-b border-gray-6 bg-colors-gray-2 hover:bg-colors-gray-3"
                    >
                      <td className="text-center" colSpan={4}>
                        <ChevronUpIcon
                          height={18}
                          width={18}
                          stroke={colors.gray["11"]}
                          className="inline-block"
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-end gap-3 px-4 py-1 text-sm">
        <p>Page Size:</p>
        <Select
          variant="xs"
          value={String(pageSize)}
          items={["1", "5", "10", "20", "50", "100"]}
          onValueChange={(value) => {
            setPageSize(parseInt(value));
          }}
        />
      </div>
    </div>
  );
};

export default Leaderboard;

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

interface LeaderboardProps {
  members: Member[];
  onBackClicked: (position: number) => void;
  onForwardClicked: (position: number) => void;
}

const Leaderboard = ({
  members,
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
    <div className="w-full rounded-md border border-gray-6 bg-colors-white-A12">
      <div className="flex flex-row items-center gap-2 rounded-t-md border-b border-gray-6 bg-colors-indigo-2 py-1 pl-4 pr-1 text-gray-11">
        <h1 className="p-1 font-mono text-sm">Leaderboard</h1>
      </div>
      <table className="w-full">
        <thead className="border-gray-6 text-gray-11">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border-b border-gray-6" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
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
                  className={cn(
                    "cursor-pointer rounded-md border-b border-gray-6 text-center last:border-b-0",
                    row.getValue("username") == meData?.data.user?.username
                      ? "bg-colors-purple-2"
                      : "",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="rounded-md py-1.5 text-gray-11 last:border-r-0"
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
                        )
                      }
                      className="cursor-pointer border-b border-gray-6 bg-colors-gray-2 hover:bg-colors-gray-3"
                    >
                      <td className="text-center" colSpan={3}>
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
                        );
                      }}
                      className="cursor-pointer border-b border-gray-6 bg-colors-gray-2 hover:bg-colors-gray-3"
                    >
                      <td className="text-center" colSpan={3}>
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
    </div>
  );
};

export default Leaderboard;

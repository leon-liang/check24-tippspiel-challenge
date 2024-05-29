import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import cn from "classnames";
import { useGetMe } from "@/hooks/api/users.api";
import EllipsisHorizontalIcon from "@/components/icons/EllipsisHorizontalIcon";
import { colors } from "../../../tailwind.config";

type Member = {
  position?: number;
  rank?: number;
  username?: string;
  points?: number;
};

interface CommunityPreviewProps {
  communityId: string;
  communityName: string;
  members: Member[];
}

const CommunityPreview = ({
  communityId,
  communityName,
  members,
}: CommunityPreviewProps) => {
  const router = useRouter();

  const leaderboardColumns = [
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "rank",
      header: "Rank",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "points",
      header: "Points",
    },
  ];

  let data = members.map((member) => {
    return {
      position: member.position,
      rank: member.rank,
      username: member.username,
      points: member.points,
    };
  });

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
    <div
      onClick={() => {
        router.push(`/communities/${communityId}`);
      }}
      className="w-full cursor-pointer rounded-md border border-gray-6 bg-colors-white-A12 hover:shadow-lg"
    >
      <div className="flex flex-row items-center gap-2 rounded-t-md border-b border-gray-6 bg-colors-indigo-2 py-1 pl-4 pr-1 text-gray-11">
        <h1 className="p-1 font-mono text-sm">{communityName}</h1>
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
                  <tr className="border-b border-gray-6 bg-colors-gray-2">
                    <td className="py-1.5 text-center" colSpan={3}>
                      <EllipsisHorizontalIcon
                        height={18}
                        width={18}
                        stroke={colors.gray["11"]}
                        className="inline-block"
                      />
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommunityPreview;

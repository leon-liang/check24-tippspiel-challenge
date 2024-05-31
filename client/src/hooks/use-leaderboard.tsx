import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DotIcon from "@/components/icons/DotIcon";
import { colors } from "../../tailwind.config";

export type Member = {
  pinned?: boolean;
  position?: number;
  rank?: number;
  username?: string;
  points?: number;
};

export const useLeaderboard = (members: Member[]) => {
  return useMemo(
    () =>
      members.map((member) => {
        return {
          pinned: member.pinned,
          position: member.position,
          rank: member.rank,
          username: member.username,
          points: member.points,
        };
      }),
    [members],
  );
};

export const useLeaderboardColumns = () => {
  return useMemo<ColumnDef<Member>[]>(() => {
    return [
      {
        accessorKey: "pinned",
        header: "",
        cell: (col) =>
          col.getValue() ? (
            <div className="flex w-full justify-center">
              <DotIcon width={20} height={20} stroke={colors.indigo["9"]} />
            </div>
          ) : null,
        size: 30,
      },
      {
        accessorKey: "position",
        header: "Position",
      },
      {
        accessorKey: "rank",
        header: "Rank",
        size: 120,
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
  }, []);
};

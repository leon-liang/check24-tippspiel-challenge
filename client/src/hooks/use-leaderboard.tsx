import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DotIcon from "@/components/icons/DotIcon";
import { colors } from "../../tailwind.config";
import Tag from "@/components/tag/Tag";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";

export type Member = {
  pinned?: boolean;
  position?: number;
  prevPosition?: number;
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
          prevPosition: member.prevPosition,
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
        accessorKey: "prevPosition",
        header: "Delta",
        cell: (col) => {
          const position =
            col.row.original.position ?? (col.getValue() as number);
          const delta = (col.getValue() as number) - position;
          if (delta > 0) {
            return (
              <Tag
                icon={
                  <ArrowUpIcon
                    className="stroke-2"
                    width={14}
                    height={14}
                    stroke={colors.green["11"]}
                  />
                }
                variant="success"
                text={`+${delta}`}
              />
            );
          } else if (delta < 0) {
            return (
              <Tag
                icon={
                  <ArrowDownIcon
                    className="stroke-2"
                    width={14}
                    height={14}
                    stroke={colors.red["11"]}
                  />
                }
                variant="warning"
                text={` ${delta}`}
              />
            );
          } else {
            return (
              <Tag
                icon={
                  <DotIcon width={14} height={14} stroke={colors.gray["11"]} />
                }
                variant="mute"
                text={`${delta}`}
              />
            );
          }
        },
      },
      {
        accessorKey: "points",
        header: "Points",
      },
    ];
  }, []);
};

import { useMemo } from "react";

export type Member = {
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
  return useMemo(() => {
    return [
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
  }, []);
};

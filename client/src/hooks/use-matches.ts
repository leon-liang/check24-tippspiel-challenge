import { useMemo } from "react";
import { DateTime } from "luxon";
import { useGetMatches } from "@/hooks/api/matches.api";

const useMatches = () => {
  const { data } = useGetMatches();

  return useMemo(() => {
    return (
      data?.data.matches?.map((match) => {
        const gameTime = DateTime.fromISO(
          match.match?.gameTime?.slice(0, -1) ?? "",
        ).toLocaleString(DateTime.DATETIME_MED);
        const updatedAt = DateTime.fromISO(
          match.match?.updatedAt?.slice(0, -1) ?? "",
        );
        return {
          id: match.match?.id ?? "",
          gameTime: gameTime,
          homeTeam: {
            name: match.match?.homeTeam?.name ?? "",
            result: match.match?.homeTeam?.result,
          },
          awayTeam: {
            name: match.match?.awayTeam?.name ?? "",
            result: match.match?.awayTeam?.result,
          },
          updatedAt: updatedAt,
        };
      }) ?? []
    );
  }, [data?.data.matches]);
};

export default useMatches;

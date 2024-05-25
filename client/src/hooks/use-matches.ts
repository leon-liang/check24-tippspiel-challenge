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
        const resultUpdatedAt = DateTime.fromISO(
          match.match?.resultUpdatedAt?.slice(0, -1) ?? "",
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
          resultUpdatedAt: resultUpdatedAt,
        };
      }) ?? []
    );
  }, [data?.data.matches]);
};

export default useMatches;

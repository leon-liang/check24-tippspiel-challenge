import { useMemo } from "react";
import { DateTime } from "luxon";
import { useGetMatches } from "@/hooks/api/matches.api";

const useMatches = () => {
  const { data } = useGetMatches();

  return useMemo(() => {
    return (
      data?.data.matches?.map((match) => {
        const date = DateTime.fromISO(
          match.match?.gameTime?.slice(0, -1) ?? "",
        ).toLocaleString(DateTime.DATETIME_MED);
        return {
          gameTime: date,
          homeTeam: {
            name: match.match?.homeTeam?.name ?? "",
            score: match.match?.homeTeam?.result,
          },
          awayTeam: {
            name: match.match?.awayTeam?.name ?? "",
            score: match.match?.awayTeam?.result,
          },
        };
      }) ?? []
    );
  }, [data?.data.matches]);
};

export default useMatches;

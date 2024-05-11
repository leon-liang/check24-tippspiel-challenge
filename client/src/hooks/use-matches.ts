import { useGetBets } from "@/hooks/bets.api";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { Round } from "@/components/matches-overview/MatchesOverview";
import useRounds from "@/hooks/use-rounds";

const useMatches = () => {
  const { data, isLoading, error } = useGetBets();
  const rounds = useRounds();

  return useMemo(() => {
    const bets = data?.data.bets?.map((bet) => {
      const date = DateTime.fromISO(
        bet.match?.match?.gameTime?.slice(0, -1) ?? "",
      );
      const currentRound = rounds.find((round) => round.dates.contains(date));

      return {
        betId: bet.id ?? "",
        homeTeam: {
          name: bet.match?.match?.homeTeam?.name ?? "",
          bet: bet.homeTeam,
          result: bet.match?.match?.homeTeam?.result,
        },
        awayTeam: {
          name: bet.match?.match?.awayTeam?.name ?? "",
          bet: bet.awayTeam,
          result: bet.match?.match?.awayTeam?.result,
        },
        round: currentRound?.name as Round,
        date: date,
      };
    });

    return bets?.sort((a, b) => {
      return a.date.toMillis() - b.date.toMillis();
    });
  }, [data?.data.bets, rounds]);
};

export default useMatches;

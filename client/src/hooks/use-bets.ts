import { useGetBets } from "@/hooks/api/bets.api";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { Round } from "@/components/bets-overview/BetsOverview";
import useRounds from "@/hooks/use-rounds";

export const useBets = () => {
  const { data } = useGetBets();
  const rounds = useRounds();

  return useMemo(() => {
    const bets = data?.data.bets?.map((bet) => {
      const date = DateTime.fromISO(
        bet.bet?.match?.match?.gameTime?.slice(0, -1) ?? "",
      );
      const currentRound = rounds.find((round) => round.dates.contains(date));

      return {
        betId: bet.bet?.id ?? "",
        homeTeam: {
          name: bet.bet?.match?.match?.homeTeam?.name,
          bet: bet.bet?.homeTeam,
          result: bet.bet?.match?.match?.homeTeam?.result,
        },
        awayTeam: {
          name: bet.bet?.match?.match?.awayTeam?.name,
          bet: bet.bet?.awayTeam,
          result: bet.bet?.match?.match?.awayTeam?.result,
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

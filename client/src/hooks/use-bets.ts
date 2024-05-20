import { useGetBets } from "@/hooks/api/bets.api";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { Round } from "@/components/bets-overview/BetsOverview";
import useRounds from "@/hooks/use-rounds";
import { useSubscribeMatchUpdate } from "@/hooks/api/matches.api";
import { retry } from "next/dist/compiled/@next/font/dist/google/retry";

const useBets = () => {
  const { data } = useGetBets();
  const updatedMatch = useSubscribeMatchUpdate();
  const rounds = useRounds();

  return useMemo(() => {
    console.log(updatedMatch);

    const betIndex = data?.data.bets?.findIndex((bet) => {
      return bet.match?.match?.id === updatedMatch?.match.id;
    });

    const updatedBets = data?.data.bets?.map((bet, index) => {
      return index === betIndex
        ? {
            awayTeam: bet.awayTeam,
            homeTeam: bet.homeTeam,
            id: bet.id,
            match: {
              match: {
                gameTime: bet.match?.match?.gameTime,
                awayTeam: {
                  name: updatedMatch?.match.awayTeam.name,
                  result: updatedMatch?.match.awayTeam.result,
                },
                homeTeam: {
                  name: updatedMatch?.match.homeTeam.name,
                  result: updatedMatch?.match.homeTeam.result,
                },
              },
            },
          }
        : bet;
    });

    const bets = updatedBets?.map((bet) => {
      const date = DateTime.fromISO(
        bet.match?.match?.gameTime?.slice(0, -1) ?? "",
      );
      const currentRound = rounds.find((round) => round.dates.contains(date));

      return {
        betId: bet.id ?? "",
        homeTeam: {
          name: bet.match?.match?.homeTeam?.name,
          bet: bet.homeTeam,
          result: bet.match?.match?.homeTeam?.result,
        },
        awayTeam: {
          name: bet.match?.match?.awayTeam?.name,
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
  }, [data?.data.bets, rounds, updatedMatch]);
};

export default useBets;

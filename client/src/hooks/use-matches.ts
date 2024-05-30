import { useEffect, useMemo } from "react";
import { DateTime, Interval } from "luxon";
import {
  useGetMatches,
  useSubscribeMatchUpdate,
} from "@/hooks/api/matches.api";
import { useBets } from "@/hooks/use-bets";
import { getClosestDate } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";

export const useMatches = () => {
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

export const useUpcomingMatches = (currentDate: DateTime) => {
  const bets = useBets() ?? [];

  return useMemo(() => {
    const matchDates = bets.map((bet) => bet.date);
    const closestMatchDate = getClosestDate(currentDate, matchDates);

    const currentMatches = bets.filter((bet) => {
      const matchDuration = Interval.fromDateTimes(
        bet.date,
        bet.date.plus({ minute: 120 }),
      );
      return matchDuration.contains(currentDate);
    });

    const upcomingMatches = bets.filter((bet) => {
      return bet.date.toISODate() == closestMatchDate?.toISODate();
    });

    const combinedMatches = [...currentMatches, ...upcomingMatches];

    return [...new Set(combinedMatches)];
  }, [currentDate]);
};

export const useMatchUpdates = () => {
  const message = useSubscribeMatchUpdate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (message?.message.status === "UPDATED") {
      queryClient.invalidateQueries({
        queryKey: ["bets"],
      });
    }
  }, [message?.message.status, message?.message.updatedAt, queryClient]);
};

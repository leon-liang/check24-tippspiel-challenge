import { useGetJob } from "@/hooks/api/jobs.api";
import { useEffect, useMemo } from "react";
import { DateTime } from "luxon";
import { useMatches } from "@/hooks/use-matches";
import { useSubscribePointsUpdates } from "@/hooks/api/points.api";
import { useQueryClient } from "@tanstack/react-query";

export const useIsPointsOutOfDate = () => {
  const { data, isLoading } = useGetJob("calculate_points");
  const matches = useMatches();

  return useMemo(() => {
    if (!isLoading) {
      const pointsLastUpdated = DateTime.fromISO(
        data?.data.job?.completedAt?.slice(0, -1) ?? "",
      );
      return (
        matches.filter((match) => match.resultUpdatedAt > pointsLastUpdated)
          .length > 0
      );
    }
  }, [matches, data, isLoading]);
};

export const usePointsUpdates = () => {
  const message = useSubscribePointsUpdates();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (message?.message.status === "UPDATED") {
      queryClient.invalidateQueries({
        queryKey: ["communities", "community-leaderboard"],
      });
    }
  }, [message?.message.status, message?.message.updatedAt, queryClient]);
};

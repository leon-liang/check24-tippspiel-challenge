import { useGetJob } from "@/hooks/api/jobs.api";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { useMatches } from "@/hooks/use-matches";

const useIsPointsOutOfDate = () => {
  const { data, isLoading } = useGetJob("calculate_points");
  const matches = useMatches();

  return useMemo(() => {
    if (!isLoading) {
      const pointsLastUpdated = DateTime.fromISO(
        data?.data.job?.updatedAt?.slice(0, -1) ?? "",
      );
      return (
        matches.filter((match) => match.resultUpdatedAt > pointsLastUpdated)
          .length > 0
      );
    }
  }, [matches, data, isLoading]);
};

export default useIsPointsOutOfDate;

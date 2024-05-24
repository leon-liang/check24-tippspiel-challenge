import { useGetJob } from "@/hooks/api/jobs.api";
import { useMemo } from "react";
import { DateTime } from "luxon";

const useCalculatePointsJob = () => {
  const { data, isLoading } = useGetJob("calculate_points");

  return useMemo(() => {
    if (!isLoading) {
      return {
        name: data?.data.job?.name,
        updatedAt: DateTime.fromISO(
          data?.data.job?.updatedAt?.slice(0, -1) ?? "",
        ),
      };
    }
  }, [isLoading, data]);
};

export default useCalculatePointsJob;

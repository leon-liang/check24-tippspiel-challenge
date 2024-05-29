import { useSubscribeCalculatePointsJob } from "@/hooks/api/jobs.api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface CalculatePointsStatusProps {
  jobName: string;
}

const CalculatePointsStatus = ({ jobName }: CalculatePointsStatusProps) => {
  const job = useSubscribeCalculatePointsJob(jobName);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (job?.job.outstanding == job?.job.completed) {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  }, [job]);

  return null;
};

export default CalculatePointsStatus;

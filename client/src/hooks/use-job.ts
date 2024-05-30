import { useSubscribeCalculatePointsJob } from "@/hooks/api/jobs.api";
import { useQueryClient } from "@tanstack/react-query";

const useJobUpdates = (jobName: string) => {
  const job = useSubscribeCalculatePointsJob(jobName);
  const queryClient = useQueryClient();

  if (job?.job.outstanding === job?.job.completed) {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
  }
};

export default useJobUpdates;

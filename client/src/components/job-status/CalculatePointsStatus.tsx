import { useSubscribeCalculatePointsJob } from "@/hooks/api/jobs.api";
import { useQueryClient } from "@tanstack/react-query";

interface CalculatePointsStatusProps {
  jobName: string;
}

const CalculatePointsStatus = ({ jobName }: CalculatePointsStatusProps) => {
  const job = useSubscribeCalculatePointsJob(jobName);
  const queryClient = useQueryClient();

  if (job?.job.outstanding == job?.job.completed) {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
  }

  return null;
};

export default CalculatePointsStatus;

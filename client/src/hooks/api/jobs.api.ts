import { useQuery } from "@tanstack/react-query";
import { jobsApiFactory } from "@/api-client";

export const useGetJob = (jobName: string) => {
  return useQuery({
    queryFn: () => jobsApiFactory.v1JobsJobNameGet(jobName),
    queryKey: ["jobs", jobName],
  });
};

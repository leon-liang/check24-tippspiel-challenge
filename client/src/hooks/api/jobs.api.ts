import { useQuery } from "@tanstack/react-query";
import { jobsApiFactory } from "@/api-client";
import { useEffect, useState } from "react";

export const useGetJob = (jobName: string) => {
  return useQuery({
    queryFn: () => jobsApiFactory.v1JobsJobNameGet(jobName),
    queryKey: ["jobs", jobName],
  });
};

interface Job {
  job: {
    name: string;
    outstanding: number;
    completed: number;
  };
}

export const useSubscribeCalculatePointsJob = (jobName: string) => {
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    const websocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/v1/ws/jobs/${jobName}/status`,
    );

    websocket.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      setJob(JSON.parse(event.data));
    };

    return () => {
      websocket.close();
    };
  }, []);

  return job;
};

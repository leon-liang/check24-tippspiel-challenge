import { useQuery } from "@tanstack/react-query";
import { betsApiFactory } from "@/api-client";

export const useGetBets = () => {
  return useQuery({
    queryFn: () => betsApiFactory.v1BetsGet(),
    queryKey: ["bets"],
  });
};

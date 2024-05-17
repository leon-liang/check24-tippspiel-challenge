import { useQuery } from "@tanstack/react-query";
import { matchesApiFactory } from "@/api-client";

export const useGetMatches = () => {
  return useQuery({
    queryFn: () => matchesApiFactory.v1MatchesGet(),
    queryKey: ["matches"],
  });
};

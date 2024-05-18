import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { matchesApiFactory } from "@/api-client";
import { HttpMatchUpdateRequest } from "@/api-client/generated";

export const useGetMatches = () => {
  return useQuery({
    queryFn: () => matchesApiFactory.v1MatchesGet(),
    queryKey: ["matches"],
  });
};

export const useUpdateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      matchId,
      data,
    }: {
      matchId: string;
      data: HttpMatchUpdateRequest;
    }) => {
      return matchesApiFactory.v1MatchesMatchIdPut(matchId, data);
    },
    onSuccess: async () => [
      await queryClient.invalidateQueries({ queryKey: ["matches"] }),
    ],
  });
};

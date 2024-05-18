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
      homeTeamName,
      homeTeamResult,
      awayTeamName,
      awayTeamResult,
    }: {
      matchId: string;
      homeTeamName?: string;
      homeTeamResult?: number;
      awayTeamName?: string;
      awayTeamResult?: number;
    }) => {
      const updatedMatch: HttpMatchUpdateRequest = {
        match: {
          homeTeam: {
            name: homeTeamName,
            result: homeTeamResult,
          },
          awayTeam: {
            name: awayTeamName,
            result: awayTeamResult,
          },
        },
      };

      return matchesApiFactory.v1MatchesMatchIdPut(matchId, updatedMatch);
    },
    onSuccess: async () => [
      await queryClient.invalidateQueries({ queryKey: ["matches"] }),
    ],
  });
};

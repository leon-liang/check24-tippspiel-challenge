import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { betsApiFactory } from "@/api-client";
import { HttpBetUpdateRequest } from "@/api-client/generated";

export const useGetBets = () => {
  return useQuery({
    queryFn: () => betsApiFactory.v1BetsGet(),
    queryKey: ["bets"],
  });
};

export const useUpdateBet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      betId,
      homeTeam,
      awayTeam,
    }: {
      betId: string;
      homeTeam: number;
      awayTeam: number;
    }) => {
      const updatedBet: HttpBetUpdateRequest = {
        bet: {
          awayTeam: awayTeam,
          homeTeam: homeTeam,
        },
      };

      return betsApiFactory.v1BetsBetIdPut(betId, updatedBet);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bets"] });
    },
  });
};

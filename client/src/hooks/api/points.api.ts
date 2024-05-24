import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pointsApiFactory } from "@/api-client";

export const useCalculatePoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => pointsApiFactory.v1PointsPut(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

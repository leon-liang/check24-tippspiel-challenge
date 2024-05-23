import { useMutation } from "@tanstack/react-query";
import { pointsApiFactory } from "@/api-client";

export const useCalculatePoints = () => {
  return useMutation({
    mutationFn: () => pointsApiFactory.v1PointsPut(),
  });
};

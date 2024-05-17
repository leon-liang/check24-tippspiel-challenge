import { useQuery } from "@tanstack/react-query";
import { defaultApiFactory } from "@/api-client";

export const useGetExample = () => {
  return useQuery({
    queryKey: ["example"],
    queryFn: defaultApiFactory.rootGet,
  });
};

import { useQuery } from "@tanstack/react-query";
import { defaultApiFactory } from "@/lib";

export const useGetExample = () => {
  return useQuery({
    queryKey: ["example"],
    queryFn: defaultApiFactory.rootGet,
  });
};

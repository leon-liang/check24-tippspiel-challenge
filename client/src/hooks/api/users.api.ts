import { useQuery } from "@tanstack/react-query";
import { usersApiFactory } from "@/api-client";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: usersApiFactory.v1UsersMeGet,
  });
};

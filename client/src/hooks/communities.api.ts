import { useMutation, useQueryClient } from "@tanstack/react-query";
import { communitiesApiFactory } from "@/api-client";
import { HandlerCommunityCreateRequest } from "@/api-client/generated";

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (community: HandlerCommunityCreateRequest) => {
      return communitiesApiFactory.v1CommunitiesPost(community);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { communitiesApiFactory } from "@/api-client";
import { HttpCommunityCreateRequest } from "@/api-client/generated";

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (community: HttpCommunityCreateRequest) => {
      return communitiesApiFactory.v1CommunitiesPost(community);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId: string) => {
      return communitiesApiFactory.v1CommunitiesCommunityIdJoinPost(
        communityId,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId: string) => {
      return communitiesApiFactory.v1CommunitiesCommunityIdLeavePut(
        communityId,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};

export const useDeleteCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId: string) => {
      return communitiesApiFactory.v1CommunitiesCommunityIdDelete(communityId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};

export const useGetUserCommunities = () => {
  return useQuery({
    queryFn: communitiesApiFactory.v1CommunitiesGet,
    queryKey: ["communities"],
  });
};

export const useGetUserCommunitiesPreview = () => {
  return useQuery({
    queryFn: communitiesApiFactory.v1CommunitiesPreviewGet,
    queryKey: ["communities", "community-leaderboard", "communities-preview"],
  });
};

export const useGetCommunityLeaderboard = (communityId: string) => {
  return useQuery({
    queryFn: () =>
      communitiesApiFactory.v1CommunitiesCommunityIdLeaderboardGet(communityId),
    queryKey: ["communities", "community-leaderboard"],
  });
};

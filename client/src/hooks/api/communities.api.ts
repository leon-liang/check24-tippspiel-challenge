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
    queryKey: ["communities", "community-leaderboard", communityId],
  });
};

export type PaginateCommunityMembersParams = {
  communityId: string;
  from?: number;
  pageSize?: number;
  direction?: "forward" | "backward";
};

export const usePaginateCommunityMembers = (
  params: PaginateCommunityMembersParams,
) => {
  return useQuery({
    queryFn: () =>
      communitiesApiFactory.v1CommunitiesCommunityIdMembersGet(
        params?.communityId,
        params?.from ?? 0,
        params?.pageSize ?? 10,
        params?.direction ?? "forward",
      ),
    queryKey: [
      "communities",
      "community-leaderboard",
      "community-members",
      params,
    ],
    enabled:
      params?.from !== undefined &&
      params?.pageSize !== undefined &&
      params?.direction !== undefined,
  });
};

export const usePinnedUsers = (communityId: string) => {
  return useQuery({
    queryFn: () =>
      communitiesApiFactory.v1CommunitiesCommunityIdPinnedUsersGet(communityId),
    queryKey: ["pinned-users"],
  });
};

export const useAddPinnedMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      communityId,
      userId,
    }: {
      communityId: string;
      userId: string;
    }) => {
      return communitiesApiFactory.v1CommunitiesCommunityIdPinnedUsersUserIdPut(
        communityId,
        userId,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pinned-users"] });
    },
  });
};

export const useRemovePinnedMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      communityId,
      userId,
    }: {
      communityId: string;
      userId: string;
    }) => {
      return communitiesApiFactory.v1CommunitiesCommunityIdPinnedUsersUserIdDelete(
        communityId,
        userId,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pinned-users"] });
    },
  });
};

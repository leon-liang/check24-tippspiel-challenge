import { useMemo } from "react";
import { useGetUserCommunities } from "@/hooks/api/communities.api";
import { useGetMe } from "@/hooks/api/users.api";

export const useGetCurrentCommunity = (communityId: string) => {
  const { data: communitiesData } = useGetUserCommunities();

  return useMemo(() => {
    return communitiesData?.data.communities?.find(
      (entry) => entry.community?.id === communityId,
    );
  }, [communitiesData?.data.communities, communityId]);
};

export const useIsCommunityOwner = (communityId: string) => {
  const { data: meData } = useGetMe();
  const currentCommunity = useGetCurrentCommunity(communityId);

  return useMemo(() => {
    return meData?.data.user?.id === currentCommunity?.community?.owner;
  }, [currentCommunity]);
};

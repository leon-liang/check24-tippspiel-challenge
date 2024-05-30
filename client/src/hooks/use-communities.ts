import { useMemo } from "react";
import { useGetUserCommunities } from "@/hooks/api/communities.api";

export const useGetCurrentCommunity = (communityId: string) => {
  const { data: communitiesData } = useGetUserCommunities();

  return useMemo(() => {
    return communitiesData?.data.communities?.find(
      (entry) => entry.community?.id === communityId,
    );
  }, [communitiesData?.data.communities, communityId]);
};

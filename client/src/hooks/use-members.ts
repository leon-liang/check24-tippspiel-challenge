import {
  PaginateCommunityMembersParams,
  useGetCommunityLeaderboard,
  usePaginateCommunityMembers,
} from "@/hooks/api/communities.api";
import { useMemo } from "react";

export type Member = {
  position?: number;
  rank?: number;
  username?: string;
  points?: number;
};

export const usePaginatedMembers = (
  communityId: string,
  paginationParams: PaginateCommunityMembersParams,
) => {
  const { data: initialMembersData } = useGetCommunityLeaderboard(communityId);
  const { data: paginatedMembersData } =
    usePaginateCommunityMembers(paginationParams);

  return useMemo(() => {
    const initialMembers =
      initialMembersData?.data.communityLeaderboard?.members ?? [];
    const paginatedMembers =
      paginatedMembersData?.data.communityLeaderboard?.members ?? [];

    const combinedMembers = [...initialMembers, ...paginatedMembers];

    const positionMap: { [position: string]: boolean } = {};
    const uniqueMembers: Member[] = combinedMembers.reduce(
      (acc: Member[], current) => {
        if (!positionMap[current.position!]) {
          positionMap[current.position!] = true;
          return acc.concat([current]);
        } else {
          return acc;
        }
      },
      [],
    );

    return uniqueMembers.sort((a, b) => a.position! - b.position!);
  }, [initialMembersData, paginatedMembersData]);
};

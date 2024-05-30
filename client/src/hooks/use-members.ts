import {
  PaginateCommunityMembersParams,
  useGetCommunityLeaderboard,
  usePaginateCommunityMembers,
} from "@/hooks/api/communities.api";
import { useMemo, useState } from "react";
import { DtosMember } from "@/api-client/generated";

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

  const [members, setMembers] = useState<DtosMember[]>([]);

  return useMemo(() => {
    const initialMembers =
      initialMembersData?.data.communityLeaderboard?.members ?? [];
    const newPaginatedMembers =
      paginatedMembersData?.data.communityLeaderboard?.members || [];

    const combinedMembers = [
      ...initialMembers,
      ...members,
      ...newPaginatedMembers,
    ];

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
    const sortedMembers = uniqueMembers.sort(
      (a, b) => a.position! - b.position!,
    );
    setMembers(sortedMembers);

    return sortedMembers;
  }, [initialMembersData, paginatedMembersData]);
};

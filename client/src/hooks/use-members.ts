import {
  PaginateCommunityMembersParams,
  useGetCommunityLeaderboard,
  usePaginateCommunityMembers,
  usePinnedUsers,
} from "@/hooks/api/communities.api";
import { useEffect, useMemo, useState } from "react";
import { DtosMember } from "@/api-client/generated";
import { useSubscribePointsUpdates } from "@/hooks/api/points.api";

export type Member = {
  id?: string;
  position?: number;
  rank?: number;
  username?: string;
  points?: number;
  pinned?: boolean;
};

export const usePaginatedMembers = (
  communityId: string,
  paginationParams: PaginateCommunityMembersParams,
) => {
  const message = useSubscribePointsUpdates();
  const { data: initialMembersData } = useGetCommunityLeaderboard(communityId);
  const { data: paginatedMembersData } =
    usePaginateCommunityMembers(paginationParams);
  const { data: pinnedUsersData } = usePinnedUsers(communityId);

  const [members, setMembers] = useState<DtosMember[]>([]);

  useEffect(() => {
    if (message?.message.status === "UPDATED") {
      setMembers([]);
    }
  }, [message?.message.status, message?.message.updatedAt]);

  return useMemo(() => {
    const pinnedMembers = pinnedUsersData?.data.users;
    const pinnedMemberIds = new Set(
      pinnedMembers?.map((member) => member.user?.id),
    );

    const initialMembers =
      initialMembersData?.data.communityLeaderboard?.members ?? [];

    const newPaginatedMembers =
      paginatedMembersData?.data.communityLeaderboard?.members || [];

    const combinedMembers = [
      ...initialMembers,
      ...newPaginatedMembers,
      ...members,
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

    const updatedMembers = sortedMembers.map((member) => ({
      ...member,
      pinned: pinnedMemberIds.has(member.id),
    }));

    setMembers(updatedMembers);
    return updatedMembers;
  }, [initialMembersData, paginatedMembersData, pinnedUsersData]);
};

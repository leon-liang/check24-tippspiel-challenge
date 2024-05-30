"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { useParams } from "next/navigation";
import {
  useGetCommunityLeaderboard,
  useGetCommunityMembers,
  useGetUserCommunities,
} from "@/hooks/api/communities.api";
import CopyToClipboard from "@/components/copy-to-clipboard/CopyToClipboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu/DropdownMenu";
import LogoutIcon from "@/components/icons/LogoutIcon";
import EllipsisHorizontalIcon from "@/components/icons/EllipsisHorizontalIcon";
import { useMemo, useState } from "react";
import { useGetMe } from "@/hooks/api/users.api";
import DeleteCommunity from "@/components/delete-community/DeleteCommunity";
import LeaveCommunity from "@/components/leave-community/LeaveCommunity";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import { usePointsUpdates } from "@/hooks/use-points";
import { Member } from "@/hooks/use-leaderboard";

type GetCommunityMembersParams = {
  from: number;
  pageSize: number;
  direction: "forward" | "backward";
};

const Community = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [getCommunityMembersParams, setGetCommunityMembersParams] =
    useState<GetCommunityMembersParams>();

  const params = useParams<{ id: string }>();
  const { data: meData } = useGetMe();
  const { data: communitiesData, isLoading } = useGetUserCommunities();

  const { data: leaderboardData } = useGetCommunityLeaderboard(params.id);

  const { data: membersData } = useGetCommunityMembers(
    params.id,
    getCommunityMembersParams?.from,
    getCommunityMembersParams?.pageSize,
    getCommunityMembersParams?.direction,
  );

  usePointsUpdates();

  const currentCommunity = useMemo(() => {
    return communitiesData?.data.communities?.find(
      (entry) => entry.community?.id === params.id,
    );
  }, [communitiesData?.data.communities, params.id]);

  const isCommunityOwner =
    meData?.data.user?.id === currentCommunity?.community?.owner;

  if (isLoading) {
    return null;
  }

  const members = leaderboardData?.data.communityLeaderboard?.members ?? [];
  const newMembers = membersData?.data.communityLeaderboard?.members ?? [];

  const combinedMembers = [...members, ...newMembers];

  const uniqueMembers: Member[] = combinedMembers.reduce(
    (acc: Member[], current) => {
      const x = acc.find((item: Member) => item.position === current.position);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    },
    [],
  );

  const sortedMembers = uniqueMembers.sort((a, b) => a.position - b.position);

  function onBackClicked(position: number) {
    setGetCommunityMembersParams({
      from: position,
      pageSize: 10,
      direction: "backward",
    });
  }

  function onForwardClicked(position: number) {
    setGetCommunityMembersParams({
      from: position,
      pageSize: 10,
      direction: "forward",
    });
  }

  return (
    <div className="relative">
      <div className="absolute right-5 top-5"></div>
      <Banner>
        <BannerTitle>
          {currentCommunity?.community?.name ?? ""}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded p-1.5 hover:bg-colors-gray-4">
                <EllipsisHorizontalIcon height={22} width={22} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>More Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <LogoutIcon width={22} height={22} className="mr-2" />
                {isCommunityOwner ? "Delete Community" : "Leave Community"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BannerTitle>
        <BannerContent>
          <div className="flex flex-row gap-1">
            <p className="font-medium">Community Tag:</p>
            <CopyToClipboard text={params.id} />
          </div>
          <div className="flex flex-row gap-1">
            <p className="font-medium">Invite Link:</p>
            <CopyToClipboard
              text={`${process.env.NEXT_PUBLIC_BASE_URL}/communities/${params.id}/join`}
            />
          </div>
        </BannerContent>
      </Banner>
      {isCommunityOwner ? (
        <DeleteCommunity
          open={open}
          setOpen={setOpen}
          communityId={currentCommunity?.community?.id ?? ""}
        />
      ) : (
        <LeaveCommunity
          open={open}
          setOpen={setOpen}
          communityId={currentCommunity?.community?.id ?? ""}
        />
      )}
      <div className="flex flex-row gap-6 px-[10%] py-6">
        {leaderboardData ? (
          <Leaderboard
            onBackClicked={onBackClicked}
            onForwardClicked={onForwardClicked}
            members={sortedMembers ?? []}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Community;

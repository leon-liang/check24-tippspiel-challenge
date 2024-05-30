"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { useParams } from "next/navigation";
import { PaginateCommunityMembersParams } from "@/hooks/api/communities.api";
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
import { useState } from "react";
import DeleteCommunity from "@/components/delete-community/DeleteCommunity";
import LeaveCommunity from "@/components/leave-community/LeaveCommunity";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import { usePointsUpdates } from "@/hooks/use-points";
import {
  useGetCurrentCommunity,
  useIsCommunityOwner,
} from "@/hooks/use-communities";
import { usePaginatedMembers } from "@/hooks/use-members";

const Community = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [paginationParams, setPaginationParams] =
    useState<PaginateCommunityMembersParams>();
  const params = useParams<{ id: string }>();

  const currentCommunity = useGetCurrentCommunity(params.id);
  const isCommunityOwner = useIsCommunityOwner(params.id);

  const members = usePaginatedMembers(
    params.id,
    paginationParams as PaginateCommunityMembersParams,
  );

  usePointsUpdates();

  function onPaginate(position: number, direction: "forward" | "backward") {
    setPaginationParams({
      communityId: params.id,
      from: position,
      pageSize: 10,
      direction: direction,
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
        <Leaderboard
          onBackClicked={onPaginate}
          onForwardClicked={onPaginate}
          members={members ?? []}
        />
      </div>
    </div>
  );
};

export default Community;

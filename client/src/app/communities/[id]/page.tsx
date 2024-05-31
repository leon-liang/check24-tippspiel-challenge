"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { useDebounce } from "@uidotdev/usehooks";
import { useParams } from "next/navigation";
import {
  PaginateCommunityMembersParams,
  useGetMemberByUsername,
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
import React, { useEffect, useState } from "react";
import DeleteCommunity from "@/components/delete-community/DeleteCommunity";
import LeaveCommunity from "@/components/leave-community/LeaveCommunity";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import { usePointsUpdates } from "@/hooks/use-points";
import {
  useGetCurrentCommunity,
  useIsCommunityOwner,
} from "@/hooks/use-communities";
import { Member, usePaginatedMembers } from "@/hooks/use-members";
import PinUser from "@/components/pin-user/PinUser";
import SearchIcon from "@/components/icons/SearchIcon";

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<Member>();

  const [paginationParams, setPaginationParams] =
    useState<Omit<PaginateCommunityMembersParams, "pageSize">>();
  const [pageSize, setPageSize] = useState<number>(10);

  const params = useParams<{ id: string }>();

  const currentCommunity = useGetCurrentCommunity(params.id);
  const isCommunityOwner = useIsCommunityOwner(params.id);

  const { members, refetchMembers, refetchSearch } = usePaginatedMembers(
    params.id,
    debouncedSearchTerm,
    paginationParams as PaginateCommunityMembersParams,
    pageSize,
  );

  usePointsUpdates();

  useEffect(() => {
    refetchMembers();
    if (debouncedSearchTerm !== "") {
      refetchSearch();
    }
  }, [paginationParams, debouncedSearchTerm]);

  if (!currentCommunity) {
    return null;
  }

  function onInputChanged(e: React.FormEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  function onPageSizeChanged(pageSize: number) {
    setPageSize(pageSize);
  }

  function onPaginate(position: number, direction: "forward" | "backward") {
    setPaginationParams({
      communityId: params.id,
      from: position,
      direction: direction,
    });
  }

  function onRowClick(position: number) {
    const member = members.find((member) => member.position === position);
    setSelectedMember(member);
    setSheetOpen(true);
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
              <DropdownMenuItem onClick={() => setTooltipOpen(true)}>
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
          open={tooltipOpen}
          setOpen={setTooltipOpen}
          communityId={currentCommunity?.community?.id ?? ""}
        />
      ) : (
        <LeaveCommunity
          open={tooltipOpen}
          setOpen={setTooltipOpen}
          communityId={currentCommunity?.community?.id ?? ""}
        />
      )}
      <div className="flex flex-col gap-3 px-[10%] py-6">
        <div className="-mt-14 flex h-14 w-full items-center gap-3 rounded-md border border-gray-6 bg-colors-white-A12 pl-4 text-gray-12 shadow-md">
          <SearchIcon width={20} height={22} />
          <input
            onChange={onInputChanged}
            name="search"
            className="h-full w-full rounded-md outline-0"
            placeholder="Search"
            type="text"
          />
        </div>
        <div className="mt-6">
          <Leaderboard
            pageSize={pageSize}
            setPageSize={onPageSizeChanged}
            onRowClicked={onRowClick}
            onBackClicked={onPaginate}
            onForwardClicked={onPaginate}
            members={members ?? []}
          />
        </div>
        <PinUser
          member={selectedMember}
          open={sheetOpen}
          setOpen={setSheetOpen}
        />
      </div>
    </div>
  );
};

export default Community;

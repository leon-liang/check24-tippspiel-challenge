"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { useParams } from "next/navigation";
import { useGetUserCommunities } from "@/hooks/api/communities.api";
import CopyToClipboard from "@/components/copy-to-clipboard/CopyToClipboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu/DropdownMenu";
import LogoutIcon from "@/components/icons/LogoutIcon";
import EllipsisHorizontalIcon from "@/components/icons/EllipsisHorizontalIcon";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog/Dialog";
import Button from "@/components/button/Button";

const Community = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetUserCommunities();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <Banner>
        <BannerTitle>
          {data?.data.communities?.find(
            (entry) => entry.community?.id === params.id,
          )?.community?.name ?? ""}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded p-1.5 hover:bg-colors-gray-4">
                <EllipsisHorizontalIcon height={22} width={22} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <LogoutIcon width={22} height={22} className="mr-2" /> Leave
                Community
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Click on leave to confirm that you want to leave the community.
          </DialogDescription>
          <div className="flex justify-end gap-3">
            <Button onClick={() => setOpen(false)} variant="mute">
              Cancel
            </Button>
            <Button variant="action">Leave</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;

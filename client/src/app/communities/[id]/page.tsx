"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { useParams } from "next/navigation";
import { useGetUserCommunities } from "@/hooks/communities.api";
import CopyToClipboard from "@/components/copy-to-clipboard/CopyToClipboard";

const Community = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetUserCommunities();

  return (
    <div>
      <Banner>
        <BannerTitle>
          {data?.data.communities?.find(
            (entry) => entry.community?.id === params.id,
          )?.community?.name ?? ""}
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
    </div>
  );
};

export default Community;

"use client";

import Banner from "@/components/banner/Banner";
import { useParams } from "next/navigation";
import { useGetCommunity } from "@/hooks/communities.api";
import CopyToClipboard from "@/components/copy-to-clipboard/CopyToClipboard";

const Community = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCommunity(params.id);

  return (
    <div>
      <Banner title={data?.data.community?.name ?? ""}>
        <div className="flex flex-row gap-1">
          <p className="font-medium">{"Community Tag: "}</p>
          <CopyToClipboard text={params.id} />
        </div>
        <div className="flex flex-row gap-1">
          <p className="font-medium">{"Invite Link: "}</p>
          <CopyToClipboard
            text={`${process.env.NEXT_PUBLIC_BASE_URL}/communities/${params.id}/join`}
          />
        </div>
      </Banner>
    </div>
  );
};

export default Community;

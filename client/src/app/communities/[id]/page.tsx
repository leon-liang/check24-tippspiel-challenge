"use client";

import Banner from "@/components/banner/Banner";
import { useParams } from "next/navigation";
import { useGetCommunity } from "@/hooks/communities.api";

const Community = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCommunity(params.id);

  return (
    <div>
      <Banner
        title={data?.data.community?.name ?? ""}
        descriptions={[
          `Community Tag: ${params.id}`,
          `Invite Link: ${process.env.NEXT_PUBLIC_BASE_URL}/communities/${params.id}/join`,
        ]}
      />
    </div>
  );
};

export default Community;

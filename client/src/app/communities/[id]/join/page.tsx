"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useJoinCommunity } from "@/hooks/communities.api";

const JoinCommunity = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const mutation = useJoinCommunity();

  useEffect(() => {
    (async function () {
      try {
        await mutation.mutateAsync(params.id);
      } catch {
        console.log("You are already part of the community");
      } finally {
        router.push(`/communities/${params.id}`);
      }
    })();
  }, [params]);

  return (
    <div>
      {/*<Toast*/}
      {/*  title="Successfully joined the community"*/}
      {/*  description="Place a bet to get started!"*/}
      {/*/>*/}
    </div>
  );
};

export default JoinCommunity;

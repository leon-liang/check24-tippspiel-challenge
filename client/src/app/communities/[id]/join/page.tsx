"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useJoinCommunity } from "@/hooks/communities.api";
import { useToast } from "@/hooks/use-toast";

const JoinCommunity = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useJoinCommunity();

  useEffect(() => {
    (async function () {
      try {
        await mutation.mutateAsync(params.id);
        toast({
          variant: "success",
          title: "Successfully joined",
          description: "Place a bet to get started!",
        });
        router.push(`/communities/${params.id}`);
      } catch (error) {
        toast({
          variant: "error",
          title: "Failed to join the community",
          description: "Please try again later!",
        });
        router.push("/");
      }
    })();
  }, []);

  return <></>;
};

export default JoinCommunity;

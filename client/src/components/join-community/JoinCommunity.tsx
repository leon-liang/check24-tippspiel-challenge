import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet/Sheet";
import Button from "@/components/button/Button";
import ArrowRight from "@/components/icons/ArrowRight";
import React from "react";
import {
  useGetUserCommunities,
  useJoinCommunity,
} from "@/hooks/api/communities.api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Form, { Input } from "@/components/form/Form";
import Alert from "@/components/alert/Alert";

const JoinCommunity = () => {
  const { data } = useGetUserCommunities();
  const mutation = useJoinCommunity();
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const FormSchema = z.object({
    communityTag: z.string().min(36),
  });
  type FormData = z.infer<typeof FormSchema>;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await mutation.mutateAsync(data.communityTag);
      toast({
        variant: "success",
        title: "Successfully joined",
        description: "Place a bet to get started!",
      });
      router.push(`/communities/${response.data.community?.id}`);
    } catch (e) {
      toast({
        variant: "error",
        title: "Failed to join the community",
        description: "Please try again later!",
      });
    }
    setOpen(false);
  };

  const communitiesAmount = data?.data.communities?.length;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="mute">Join Community</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col gap-8">
            <SheetTitle>Join Community</SheetTitle>
            <div className="flex flex-col gap-6 text-sm text-gray-11">
              <p>
                Enter the community tag below to join the community. Fields
                marked with * are required.
              </p>
              <p>
                Alternatively, you can join a community using their invite link.
              </p>
            </div>
          </SheetHeader>
          {communitiesAmount && communitiesAmount >= 5 ? (
            <Alert
              variant="warning"
              message="You can be part of at most 5 communities. Leave a community first before joining a new one."
            />
          ) : (
            <Form schema={FormSchema} onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Input
                  required
                  displayName="Community Tag *"
                  name="communityTag"
                  type="text"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="mute"
                >
                  Cancel
                </Button>
                <Button
                  variant="action"
                  className="flex flex-row items-center gap-2"
                  type="submit"
                >
                  Join
                  <ArrowRight className="stroke-2" width={16} height={16} />
                </Button>
              </div>
            </Form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default JoinCommunity;

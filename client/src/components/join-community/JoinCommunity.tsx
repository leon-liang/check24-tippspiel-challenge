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
import { useJoinCommunity } from "@/hooks/communities.api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Form, { Input } from "@/components/form/Form";

const JoinCommunity = () => {
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

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="mute">Join Community</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col gap-8">
            <SheetTitle>Join Community</SheetTitle>
            <div className="flex flex-col gap-6">
              <p>
                Enter the community tag below to join the community. Click join
                when you are done.
              </p>
              <p>
                Alternatively, you can join a community using their invite link.
              </p>
            </div>
            <Form schema={FormSchema} onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Input
                  displayName="Community Tag"
                  name="communityTag"
                  type="text"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button onClick={() => setOpen(false)} variant="mute">
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
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default JoinCommunity;

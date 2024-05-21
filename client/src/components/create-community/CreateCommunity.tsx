import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet/Sheet";
import Button from "@/components/button/Button";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import React from "react";
import {
  useCreateCommunity,
  useGetUserCommunities,
} from "@/hooks/api/communities.api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Form, { Input } from "@/components/form/Form";
import Alert from "@/components/alert/Alert";

const CreateCommunity = () => {
  const { data } = useGetUserCommunities();
  const mutation = useCreateCommunity();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const FormSchema = z.object({
    communityName: z.string().min(1),
  });
  type FormData = z.infer<typeof FormSchema>;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await mutation.mutateAsync({
        community: {
          name: data.communityName,
        },
      });

      toast({
        variant: "success",
        title: "Successfully created",
        description: "Place a bet to get started!",
      });

      router.push(`/communities/${response.data.community?.id}`);
    } catch (e) {
      toast({
        variant: "error",
        title: "Failed to create community",
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
          <Button variant="action">Create Community</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col gap-8">
            <SheetTitle>Create Community</SheetTitle>
            <div className="flex flex-col gap-6 text-sm text-gray-11">
              <p>
                Bring your friends together in communities and compete against
                them for the top spot!
              </p>
              <p>
                Give your community a name. Fields marked with * are required.
              </p>
            </div>
          </SheetHeader>
          {communitiesAmount && communitiesAmount >= 5 ? (
            <Alert
              variant="warning"
              message="You can be part of at most 5 communities. Leave a community first before creating a new one."
            />
          ) : (
            <Form schema={FormSchema} onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Input
                  required={true}
                  name="communityName"
                  displayName="Community Name *"
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
                  Save
                  <ArrowRightIcon className="stroke-2" width={16} height={16} />
                </Button>
              </div>
            </Form>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateCommunity;

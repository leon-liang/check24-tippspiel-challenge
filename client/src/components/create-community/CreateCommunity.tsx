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
import { useCreateCommunity } from "@/hooks/communities.api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Form, { Input } from "@/components/form/Form";

const CreateCommunity = () => {
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
              <p>Give your community a name. Click save when you are done.</p>
            </div>
            <Form schema={FormSchema} onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <Input
                  name="communityName"
                  displayName="Community Name"
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
                  Save
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

export default CreateCommunity;

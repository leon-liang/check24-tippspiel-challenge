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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateCommunity = () => {
  const mutation = useCreateCommunity();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const FormSchema = z.object({
    communityName: z.string().min(1),
  });

  type FormData = z.infer<typeof FormSchema>;

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    reset();
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
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label
                  className="text-[15px] text-indigo-11"
                  htmlFor="community-name"
                >
                  Community Name
                </label>
                <input
                  className="inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
                  {...register("communityName")}
                  id="community-name"
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
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateCommunity;

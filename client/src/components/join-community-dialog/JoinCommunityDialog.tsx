import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog/Dialog";
import Button from "@/components/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useJoinCommunity } from "@/hooks/communities.api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import ArrowRight from "@/components/icons/ArrowRight";

const JoinCommunityDialog = () => {
  const mutation = useJoinCommunity();
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const FormSchema = z.object({
    communityTag: z.string().min(36),
  });

  type FormData = z.infer<typeof FormSchema>;
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    event?.target.reset();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="mute">Join Community</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Join a Community</DialogTitle>
        <DialogDescription>
          Enter the community tag below. Click join when you are done.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-indigo-11"
              htmlFor="community-tag"
            >
              Community Tag
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
              {...register("communityTag")}
              id="community-tag"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Button className="flex flex-row items-center gap-2" type="submit">
              Join <ArrowRight className="stroke-2" width={16} height={16} />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityDialog;

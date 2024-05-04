import React from "react";
import { useCreateCommunity } from "@/hooks/communities.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog/Dialog";
import Button from "@/components/button/Button";
import { useToast } from "@/hooks/use-toast";
import ArrowRight from "@/components/icons/ArrowRight";

const CreateCommunityDialog = () => {
  const mutation = useCreateCommunity();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const FormSchema = z.object({
    communityName: z.string().min(1),
  });

  type FormData = z.infer<typeof FormSchema>;

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    event?.target.reset();
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
      router.push("/");
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Community</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Community</DialogTitle>
        <DialogDescription>
          Give your community a name. Click save when you are done.
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="w-[90px] text-right text-[15px] text-indigo-11"
              htmlFor="community-name"
            >
              Community Name
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
              {...register("communityName")}
              id="community-name"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Button className="flex flex-row items-center gap-2" type="submit">
              Save <ArrowRight className="stroke-2" width={16} height={16} />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;

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

const CreateCommunityDialog = () => {
  const mutation = useCreateCommunity();
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
    const response = await mutation.mutateAsync({
      community: {
        name: data.communityName,
      },
    });
    setOpen(false);
    router.push(`/communities/${response.data.community?.id}`);
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
            <Button
              type="submit"
              className="inline-flex h-[35px] w-[80px] items-center justify-center rounded-[4px] bg-colors-gray-12 px-[15px] leading-none text-white-A12 hover:bg-colors-gray-11 focus:shadow-[0_0_0_2px] focus:shadow-gray-7 focus:outline-none"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityDialog;

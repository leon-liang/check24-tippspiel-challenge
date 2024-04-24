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

const JoinCommunityDialog = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const FormSchema = z.object({
    communityTag: z.string().min(36),
  });

  type FormData = z.infer<typeof FormSchema>;
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    event?.target.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join Community</Button>
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
            <Button
              type="submit"
              className="inline-flex h-[35px] w-[80px] items-center justify-center rounded-[4px] bg-colors-gray-12 px-[15px] leading-none text-white-A12 hover:bg-colors-gray-11 focus:shadow-[0_0_0_2px] focus:shadow-gray-7 focus:outline-none"
            >
              Join
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityDialog;

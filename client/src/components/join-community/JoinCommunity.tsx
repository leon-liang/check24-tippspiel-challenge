import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const JoinCommunity = () => {
  const mutation = useJoinCommunity();
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const FormSchema = z.object({
    communityTag: z.string().min(36),
  });

  type FormData = z.infer<typeof FormSchema>;
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    reset();
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
            <SheetDescription>
              <div className="flex flex-col gap-6">
                <p>
                  Enter the community tag below to join the community. Click
                  join when you are done.
                </p>
                <p>
                  Alternatively, you can join a community using their invite
                  link.
                </p>
              </div>
            </SheetDescription>
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label
                  className="text-[15px] text-indigo-11"
                  htmlFor="community-tag"
                >
                  Community Tag
                </label>
                <input
                  className="inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
                  {...register("communityTag")}
                  id="community-tag"
                />
              </div>
              <div className="flex justify-end gap-3">
                <SheetClose>
                  <Button variant="mute">Cancel</Button>
                </SheetClose>
                <Button
                  variant="action"
                  className="flex flex-row items-center gap-2"
                  type="submit"
                >
                  Join
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

export default JoinCommunity;

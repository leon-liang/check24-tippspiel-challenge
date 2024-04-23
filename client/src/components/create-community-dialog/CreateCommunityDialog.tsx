import CrossIcon from "@/components/icons/CrossIcon";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useCreateCommunity } from "@/hooks/communities.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="text-sm">Create Community</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-colors-black-A6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-30 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-colors-white-A12 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-[17px] font-medium text-gray-12">
            Create Community
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-gray-11">
            Give your community a name. Click save when you are done.
          </Dialog.Description>
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
              <button
                type="submit"
                className="inline-flex h-[35px] w-[80px] items-center justify-center rounded-[4px] bg-colors-gray-12 px-[15px] leading-none text-white-A12 hover:bg-colors-gray-11 focus:shadow-[0_0_0_2px] focus:shadow-gray-7 focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[32px] w-[32px] appearance-none items-center justify-center rounded text-gray-11 hover:bg-colors-gray-4 focus:shadow-[0_0_0_2px] focus:shadow-gray-7 focus:outline-none"
              aria-label="Close"
            >
              <CrossIcon width={24} height={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateCommunityDialog;

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet/Sheet";
import Form, { Input } from "@/components/form/Form";
import Switch from "@/components/switch/Switch";
import React, { Dispatch, SetStateAction } from "react";
import { Member } from "@/hooks/use-members";
import { z } from "zod";
import {
  useAddPinnedMember,
  usePinnedUsers,
  useRemovePinnedMember,
} from "@/hooks/api/communities.api";
import { useParams } from "next/navigation";

interface PinUserProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  member?: Member;
}

const PinUser = ({ open, setOpen, member }: PinUserProps) => {
  const params = useParams<{ id: string }>();

  const { data: pinnedUsersData } = usePinnedUsers(params.id);
  const addPinnedMemberMutation = useAddPinnedMember();
  const removePinnedMemberMutation = useRemovePinnedMember();

  const FormSchema = z.object({
    username: z.string(),
    points: z.number().int(),
  });

  const defaultValues = {
    username: member?.username,
    points: member?.points,
  };

  function onSwitchChanged(checked: boolean) {
    const mutationParams = {
      communityId: params.id,
      userId: member?.id ?? "",
    };

    if (checked) {
      addPinnedMemberMutation.mutate(mutationParams);
    } else {
      removePinnedMemberMutation.mutate(mutationParams);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-8">
          <SheetTitle>User Info</SheetTitle>
          <div className="flex flex-col gap-6 text-sm text-gray-11">
            <p>
              Find all information about a user, including their bets below.
            </p>
          </div>
        </SheetHeader>
        <Form schema={FormSchema} defaultValues={defaultValues}>
          <div className="flex flex-col gap-4">
            <Input
              disabled={true}
              name="username"
              displayName="Username"
              type="text"
            />
            <Input
              disabled={true}
              name="points"
              displayName="Points"
              type="number"
            />
          </div>
          <hr className="border-gray-6" />
          <Switch
            name="pinned"
            displayName="Pin user"
            checked={pinnedUsersData?.data.users?.some(
              (user) => user.user?.username === member?.username,
            )}
            onChange={onSwitchChanged}
          />
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default PinUser;

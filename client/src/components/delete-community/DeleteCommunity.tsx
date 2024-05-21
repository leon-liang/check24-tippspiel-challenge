import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog/Dialog";
import Button from "@/components/button/Button";
import { useDeleteCommunity } from "@/hooks/api/communities.api";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface DeleteCommunityProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  communityId: string;
}

const DeleteCommunity = ({
  open,
  setOpen,
  communityId,
}: DeleteCommunityProps) => {
  const mutation = useDeleteCommunity();
  const router = useRouter();

  const onClick = async () => {
    try {
      await mutation.mutateAsync(communityId);
      toast({
        variant: "success",
        title: "Successfully deleted",
        description: "You have successfully deleted the community",
      });
      router.push("/dashboard");
    } catch (e) {
      toast({
        variant: "error",
        title: "Failed to delete the community",
        description: "Please try again later!",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Click on delete to confirm that you want
          to delete the community.
        </DialogDescription>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setOpen(false)} variant="mute">
            Cancel
          </Button>
          <Button variant="action" onClick={onClick}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommunity;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog/Dialog";
import Button from "@/components/button/Button";
import { useLeaveCommunity } from "@/hooks/api/communities.api";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface LeaveCommunityProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  communityId: string;
}

const LeaveCommunity = ({
  open,
  setOpen,
  communityId,
}: LeaveCommunityProps) => {
  const mutation = useLeaveCommunity();
  const router = useRouter();

  const onClick = async () => {
    try {
      await mutation.mutateAsync(communityId);
      toast({
        variant: "success",
        title: "Successfully left",
        description: "You have successfully left the community",
      });
      router.push("/dashboard");
    } catch (e) {
      toast({
        variant: "error",
        title: "Failed to leave the community",
        description: "Please try again later!",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          Click on leave to confirm that you want to leave the community.
        </DialogDescription>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setOpen(false)} variant="mute">
            Cancel
          </Button>
          <Button onClick={onClick} variant="action">
            Leave
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveCommunity;

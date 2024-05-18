import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet/Sheet";
import Form, { Input } from "@/components/form/Form";
import Button from "@/components/button/Button";
import ArrowRight from "@/components/icons/ArrowRight";
import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { useUpdateMatch } from "@/hooks/api/matches.api";
import { toast } from "@/hooks/use-toast";

export type Match = {
  id: string;
  gameTime: string;
  homeTeam: {
    name?: string;
    result?: number;
  };
  awayTeam: {
    name?: string;
    result?: number;
  };
};

interface UpdateMatchProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  match?: Match;
}

const UpdateMatch = ({ open, setOpen, match }: UpdateMatchProps) => {
  const mutation = useUpdateMatch();

  const defaultValues = {
    homeTeamName: match?.homeTeam.name,
    homeTeamResult: match?.homeTeam.result,
    awayTeamName: match?.awayTeam.name,
    awayTeamResult: match?.awayTeam.result,
  };

  const FormSchema = z.object({
    homeTeamName: z.string(),
    homeTeamResult: z
      .union([z.number().int().positive().min(1), z.nan()])
      .optional(),
    awayTeamName: z.string(),
    awayTeamResult: z
      .union([z.number().int().positive().min(1), z.nan()])
      .optional(),
  });

  type FormData = z.infer<typeof FormSchema>;

  const onSubmit = async (data: FormData) => {
    try {
      await mutation.mutateAsync({
        matchId: match?.id ?? "",
        data: {
          match: {
            homeTeam: {
              name: data.homeTeamName,
              result: data.homeTeamResult,
            },
            awayTeam: {
              name: data.awayTeamName,
              result: data.awayTeamResult,
            },
          },
        },
      });

      toast({
        variant: "success",
        title: "Successfully updated",
        description: "Your changed have been registered",
      });
    } catch (e) {
      toast({
        variant: "error",
        title: "Failed to update match",
        description: "Please try again later!",
      });
    }
    setOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader className="flex flex-col gap-8">
            <SheetTitle>Update Match</SheetTitle>
            <div className="flex flex-col gap-6 text-sm text-gray-11">
              <p>Update Match details below. Click save when you are done.</p>
            </div>
          </SheetHeader>
          <Form
            schema={FormSchema}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
            <div className="flex flex-col gap-4">
              <Input
                name="homeTeamName"
                displayName="Home Team Name"
                type="text"
              />
              <Input
                name="homeTeamResult"
                displayName="Home Team Score"
                type="number"
                required={false}
              />
            </div>
            <hr className="border-gray-6" />
            <div className="flex flex-col gap-4">
              <Input
                name="awayTeamName"
                displayName="Away Team Name"
                type="text"
              />
              <Input
                name="awayTeamResult"
                displayName="Away Team Score"
                type="number"
                required={false}
              />
            </div>
            <div className="flex justify-end gap-4">
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
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UpdateMatch;

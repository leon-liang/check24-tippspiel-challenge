import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet/Sheet";
import Form, { Input } from "@/components/form/Form";
import Button from "@/components/button/Button";
import ArrowRight from "@/components/icons/ArrowRight";
import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type Match = {
  gameTime: string;
  homeTeam: {
    name?: string;
    score?: number;
  };
  awayTeam: {
    name?: string;
    score?: number;
  };
};

interface UpdateMatchProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  match?: Match;
}

const UpdateMatch = ({ open, setOpen, match }: UpdateMatchProps) => {
  const defaultValues = {
    homeTeamName: match?.homeTeam.name,
    homeTeamScore: match?.homeTeam.score,
    awayTeamName: match?.awayTeam.name,
    awayTeamScore: match?.awayTeam.score,
  };

  const FormSchema = z.object({
    homeTeamName: z.string().optional(),
    homeTeamScore: z.number().int(),
    awayTeamName: z.string().optional(),
    awayTeamScore: z.number().int(),
  });

  type FormData = z.infer<typeof FormSchema>;

  const onSubmit = async (data: FormData) => {};

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
                name="homeTeamScore"
                displayName="Home Team Score"
                type="text"
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
                name="awayTeamScore"
                displayName="Away Team Score"
                type="text"
              />
            </div>
            <div className="flex justify-end gap-4">
              <SheetClose>
                <Button variant="mute">Cancel</Button>
              </SheetClose>
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

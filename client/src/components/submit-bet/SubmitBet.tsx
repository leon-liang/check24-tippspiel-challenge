import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet/Sheet";
import GameView from "@/components/game-view/GameView";
import Button from "@/components/button/Button";
import ArrowRight from "@/components/icons/ArrowRight";
import React from "react";
import { z } from "zod";
import Form, { Input } from "@/components/form/Form";

interface Team {
  name: string;
  bet?: number;
  result?: number;
}

interface SubmitBetProps {
  teamA: Team;
  teamB: Team;
}

const SubmitBet = ({ teamA, teamB }: SubmitBetProps) => {
  const [open, setOpen] = React.useState(false);

  const FormSchema = z.object({
    teamAScore: z.number().int(),
    teamBScore: z.number().int(),
  });
  type FormData = z.infer<typeof FormSchema>;

  const defaultValues = {
    teamAScore: teamA.bet,
    teamBScore: teamB.bet,
  };

  const onSubmit = async (data: FormData) => {
    setOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <GameView teamA={teamA} teamB={teamB} gameTime="18:00" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col gap-8">
            <SheetTitle>Submit your Bet</SheetTitle>
            <div className="flex flex-col gap-6 text-sm text-gray-11">
              <p>
                Place your bet by predicting the final score of the game. Points
                are calculated in the following manner:
              </p>
              <ul className="ml-8 list-disc">
                <li>8 points for the exact result</li>
                <li>6 points for the correct goal difference if not a draw</li>
                <li>4 points for the correct tendency</li>
                <li>0 points for everything else</li>
              </ul>
            </div>
            <Form
              schema={FormSchema}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
            >
              <div className="flex flex-col gap-4">
                <Input
                  name="teamAScore"
                  displayName={`${teamA.name} final score:`}
                  type="number"
                />
                <Input
                  name="teamBScore"
                  displayName={`${teamB.name} final score:`}
                  type="number"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  variant="mute"
                >
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
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SubmitBet;

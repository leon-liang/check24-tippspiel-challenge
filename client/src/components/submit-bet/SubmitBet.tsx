import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet/Sheet";
import GameView from "@/components/game-view/GameView";
import Button from "@/components/button/Button";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import React from "react";
import { z } from "zod";
import Form, { Input } from "@/components/form/Form";
import { DateTime } from "luxon";
import { useUpdateBet } from "@/hooks/api/bets.api";
import { toast } from "@/hooks/use-toast";
import Alert from "@/components/alert/Alert";

interface Team {
  name?: string;
  bet?: number;
  result?: number;
}

interface SubmitBetProps {
  betId: string;
  homeTeam: Team;
  awayTeam: Team;
  currentDate: DateTime;
  date: DateTime;
}

const SubmitBet = ({
  betId,
  homeTeam,
  awayTeam,
  currentDate,
  date,
}: SubmitBetProps) => {
  const mutation = useUpdateBet();

  const [open, setOpen] = React.useState(false);

  const FormSchema = z.object({
    homeTeamScore: z.number().int().min(0),
    awayTeamScore: z.number().int().min(0),
  });
  type FormData = z.infer<typeof FormSchema>;

  const defaultValues = {
    homeTeamScore: homeTeam.bet,
    awayTeamScore: awayTeam.bet,
  };

  const onSubmit = async (data: FormData) => {
    try {
      await mutation.mutateAsync({
        betId: betId,
        homeTeam: data.homeTeamScore,
        awayTeam: data.awayTeamScore,
      });

      toast({
        variant: "success",
        title: "Successfully updated",
        description: "Your bet has been registered",
      });
    } catch (e) {
      toast({
        variant: "error",
        title: "Failed to update your bet",
        description: "Please try again later!",
      });
    }
    setOpen(false);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <GameView
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            gameTime={date}
            currentDate={currentDate}
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col gap-8">
            <SheetTitle>Submit your Bet</SheetTitle>
            {!homeTeam.name || !awayTeam.name ? (
              <Alert
                variant="warning"
                message="Bet submission not yet possible, as the pairings for this game day are not known yet."
              />
            ) : null}
            {DateTime.now() >= date ? (
              <Alert
                variant="warning"
                message="Bet submission only possible until the game starts."
              />
            ) : null}
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
              <p>Fields marked with * are required.</p>
            </div>
          </SheetHeader>
          {DateTime.now() < date && homeTeam.name && awayTeam.name ? (
            <Form<FormData>
              schema={FormSchema}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
            >
              <div className="flex flex-col gap-4">
                <Input
                  required
                  name="homeTeamScore"
                  displayName={`${homeTeam.name}'s final score`}
                  type="number"
                />
                <Input
                  required
                  name="awayTeamScore"
                  displayName={`${awayTeam.name}'s final score`}
                  type="number"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
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
                  <ArrowRightIcon className="stroke-2" width={16} height={16} />
                </Button>
              </div>
            </Form>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SubmitBet;

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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Team {
  name: string;
  bet?: number;
  result?: number;
}

interface BetProps {
  teamA: Team;
  teamB: Team;
}

const Bet = ({ teamA, teamB }: BetProps) => {
  const [open, setOpen] = React.useState(false);

  const FormSchema = z.object({
    teamAScore: z.number(),
    teamBScore: z.number(),
  });

  type FormData = z.infer<typeof FormSchema>;

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    reset();
    console.log("Here");
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
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4">
                <fieldset className="flex flex-col items-start gap-2">
                  <label
                    className="text-right text-[15px] text-indigo-11"
                    htmlFor="community-tag"
                  >
                    {`${teamA.name} final score:`}
                  </label>
                  <input
                    className="inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
                    id="community-tag"
                  />
                </fieldset>
                <fieldset className="flex flex-col items-start gap-2">
                  <label
                    className="text-right text-[15px] text-indigo-11"
                    htmlFor="community-tag"
                  >
                    {`${teamB.name}'s final score:`}
                  </label>
                  <input
                    className="inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
                    id="community-tag"
                  />
                </fieldset>
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
            </form>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Bet;

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet/Sheet";
import GameView from "@/components/game-view/GameView";
import Button from "@/components/button/Button";
import ArrowRight from "@/components/icons/ArrowRight";
import React from "react";

const SubmitBet = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <GameView />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex flex-col gap-8">
            <SheetTitle>Submit your Bet</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col gap-6">
                <p>
                  Place your bet by predicting the final score of the game.
                  Points are calculated in the following manner:
                </p>
                <ul className="ml-8 list-disc">
                  <li>8 points for the exact result</li>
                  <li>
                    6 points for the correct goal difference if not a draw
                  </li>
                  <li>4 points for the correct tendency</li>
                  <li>0 points for everything else</li>
                </ul>
              </div>
            </SheetDescription>
            <form className="flex flex-col gap-8" onSubmit={() => {}}>
              <div className="flex flex-col gap-4">
                <fieldset className="flex flex-col items-start gap-2">
                  <label
                    className="text-right text-[15px] text-indigo-11"
                    htmlFor="community-tag"
                  >
                    {"Luxembourg's final score:"}
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
                    {"Armenia's final score:"}
                  </label>
                  <input
                    className="inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
                    id="community-tag"
                  />
                </fieldset>
              </div>
              <div className="flex justify-end gap-3">
                <SheetClose>
                  <Button variant="mute">Cancel</Button>
                </SheetClose>
                <Button
                  variant="action"
                  className="flex flex-row items-center gap-2"
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

export default SubmitBet;

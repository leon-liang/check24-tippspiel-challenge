"use client";

import Banner from "@/components/banner/Banner";
import { Select } from "@/components/select/Select";

const Bets = () => {
  return (
    <div>
      <Banner title="Your bets">
        <p>{"Place your bet by predicting the final score of the game."}</p>
        <p>
          {
            "Betting is available until the game starts, after which no further bets can be placed."
          }
        </p>
      </Banner>
      <div className="flex flex-row items-center gap-6 py-12 md:px-32">
        {/*TODO: Change Default value based on the date*/}
        <h1 className="text-xl font-medium">Game Stage:</h1>
        <Select
          defaultValue={"1st Game Day"}
          items={[
            "1st Game Day",
            "2nd Game Day",
            "3rd Game Day",
            "Round of 16",
            "Quarterfinals",
            "Semifinals",
            "Finals",
          ]}
          onValueChange={() => {}}
        />
      </div>
    </div>
  );
};

export default Bets;

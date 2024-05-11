"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { Select } from "@/components/select/Select";
import React, { useEffect, useState } from "react";
import MatchesOverview from "@/components/matches-overview/MatchesOverview";
import { DateTime } from "luxon";
import useRounds from "@/hooks/use-rounds";
import useMatches from "@/hooks/use-matches";

const Bets = () => {
  const [selectedRound, setSelectedRound] = useState("");
  const rounds = useRounds();
  const matches = useMatches();

  useEffect(() => {
    const currentDate = DateTime.now();
    const currentRound = rounds.find((round) =>
      round.dates.contains(currentDate),
    );
    setSelectedRound(currentRound ? currentRound.name : "Match day 1");
  }, [rounds]);

  return (
    <div>
      <Banner>
        <BannerTitle>
          <h1>Your Bets</h1>
          <Select
            value={selectedRound}
            items={rounds.map((round) => round.name)}
            onValueChange={(value) => {
              setSelectedRound(value);
            }}
          />
        </BannerTitle>
        <BannerContent>
          <p>Place your bet by predicting the final score of the game.</p>
          <p>
            Betting is available until the game starts, after which no further
            bets can be placed.
          </p>
        </BannerContent>
      </Banner>
      <div className="flex flex-row items-center gap-6 py-6 md:px-32">
        {matches ? (
          <MatchesOverview
            key={selectedRound}
            matches={
              matches?.filter((match) => match.round === selectedRound) ?? []
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default Bets;

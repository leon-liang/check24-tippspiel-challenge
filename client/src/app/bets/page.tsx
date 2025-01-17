"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { Select } from "@/components/select/Select";
import React, { useEffect, useState } from "react";
import BetsOverview from "@/components/bets-overview/BetsOverview";
import { DateTime } from "luxon";
import useRounds from "@/hooks/use-rounds";
import { useBets } from "@/hooks/use-bets";
import { getClosestDate } from "@/utils/date";
import { useMatchUpdates } from "@/hooks/use-matches";

const Bets = () => {
  const [selectedRound, setSelectedRound] = useState("");
  const rounds = useRounds();
  const bets = useBets();
  useMatchUpdates();

  useEffect(() => {
    const currentDate = DateTime.now();
    const matchDates = bets?.map((bet) => bet?.date) ?? [];
    const closestMatchDate = getClosestDate(currentDate, matchDates);
    const currentRound = rounds.find((round) =>
      round.dates.contains(closestMatchDate),
    );
    setSelectedRound(currentRound ? currentRound.name : "Match day 1");
  }, [bets, rounds]);

  return (
    <div>
      <Banner>
        <BannerTitle>
          <h1>Your Bets</h1>
          <Select
            variant="md"
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
      <div className="flex flex-row items-center gap-6 px-[10%] py-6">
        {bets ? (
          <BetsOverview
            key={selectedRound}
            bets={bets?.filter((bet) => bet.round === selectedRound) ?? []}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Bets;

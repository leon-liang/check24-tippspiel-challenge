"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { Select } from "@/components/select/Select";
import React, { useEffect, useMemo, useState } from "react";
import MatchesOverview from "@/components/matches-overview/MatchesOverview";
import { DateTime, Interval } from "luxon";

// Match day 1    [14.06; 19.06)
// Match day 2    [19.06; 23.06)
// Match day 3    [23.06; 27.06)
// Round of 16    [29.06; 03.07)
// Quarter Finals [05.07; 07.07)
// Semi Finals    [09.07; 11.07)
// Finals         [14.07; 15.07)

const Bets = () => {
  const [selectedRound, setSelectedRound] = useState("");

  const rounds = useMemo(
    () => [
      {
        name: "Match day 1",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 14),
          DateTime.local(2024, 6, 19),
        ),
      },
      {
        name: "Match day 2",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 19),
          DateTime.local(2024, 6, 23),
        ),
      },
      {
        name: "Match day 3",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 23),
          DateTime.local(2024, 6, 27),
        ),
      },
      {
        name: "Round of 16",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 6, 29),
          DateTime.local(2024, 7, 3),
        ),
      },
      {
        name: "Quarter-finals",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 7, 5),
          DateTime.local(2024, 7, 7),
        ),
      },
      {
        name: "Semi-finals",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 7, 9),
          DateTime.local(2024, 7, 11),
        ),
      },
      {
        name: "Finals",
        dates: Interval.fromDateTimes(
          DateTime.local(2024, 7, 14),
          DateTime.local(2024, 7, 15),
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    const currentDate = DateTime.now();
    const currentRound = rounds.find((round) =>
      round.dates.contains(currentDate),
    );
    setSelectedRound(currentRound ? currentRound.name : "Match day 1");
  }, []);

  const matches = [
    {
      teamA: {
        name: "Germany",
        bet: 2,
        result: 2,
      },
      teamB: {
        name: "Scotland",
        bet: 1,
        result: 2,
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 14, 21, 0),
    },
    {
      teamA: {
        name: "Hungary",
      },
      teamB: {
        name: "Switzerland",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 15, 15, 0),
    },
    {
      teamA: {
        name: "Spain",
      },
      teamB: {
        name: "Croatia",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 15, 18, 0),
    },
    {
      teamA: {
        name: "Italy",
      },
      teamB: {
        name: "Albania",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 15, 21, 0),
    },
    {
      teamA: {
        name: "Poland",
      },
      teamB: {
        name: "Netherlands",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 16, 15, 0),
    },
    {
      teamA: {
        name: "Slovenia",
      },
      teamB: {
        name: "Denmark",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 16, 18, 0),
    },
    {
      teamA: {
        name: "Serbia",
      },
      teamB: {
        name: "England",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 16, 21, 0),
    },
    {
      teamA: {
        name: "Romania",
      },
      teamB: {
        name: "Ukraine",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 17, 15, 0),
    },
    {
      teamA: {
        name: "Belgium",
      },
      teamB: {
        name: "Slovakia",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 17, 18, 0),
    },
    {
      teamA: {
        name: "Austria",
      },
      teamB: {
        name: "France",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 17, 21, 0),
    },
    {
      teamA: {
        name: "Türkiye",
      },
      teamB: {
        name: "Georgia",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 18, 18, 0),
    },
    {
      teamA: {
        name: "Portugal",
      },
      teamB: {
        name: "Czechia",
      },
      round: "Match day 1",
      date: DateTime.local(2024, 6, 18, 21, 0),
    },
    {
      teamA: {
        name: "Croatia",
      },
      teamB: {
        name: "Albania",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 19, 15, 0),
    },
    {
      teamA: {
        name: "Germany",
      },
      teamB: {
        name: "Hungary",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 19, 18, 0),
    },
    {
      teamA: {
        name: "Scotland",
      },
      teamB: {
        name: "Switzerland",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 19, 21, 0),
    },
    {
      teamA: {
        name: "Slovenia",
      },
      teamB: {
        name: "Serbia",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 20, 15, 0),
    },
    {
      teamA: {
        name: "Denmark",
      },
      teamB: {
        name: "England",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 20, 18, 0),
    },
    {
      teamA: {
        name: "Spain",
      },
      teamB: {
        name: "Italy",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 20, 21, 0),
    },
    {
      teamA: {
        name: "Slovakia",
      },
      teamB: {
        name: "Ukraine",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 21, 15, 0),
    },
    {
      teamA: {
        name: "Poland",
      },
      teamB: {
        name: "Austria",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 21, 18, 0),
    },
    {
      teamA: {
        name: "Netherlands",
      },
      teamB: {
        name: "France",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 21, 21, 0),
    },
    {
      teamA: {
        name: "Georgia",
      },
      teamB: {
        name: "Czechia",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 22, 15, 0),
    },
    {
      teamA: {
        name: "Türkiye",
      },
      teamB: {
        name: "Portugal",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 22, 18, 0),
    },
    {
      teamA: {
        name: "Belgium",
      },
      teamB: {
        name: "Romania",
      },
      round: "Match day 2",
      date: DateTime.local(2024, 6, 22, 21, 0),
    },
    {
      teamA: {
        name: "Switzerland",
      },
      teamB: {
        name: "Germany",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 23, 21, 0),
    },
    {
      teamA: {
        name: "Scotland",
      },
      teamB: {
        name: "Hungary",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 23, 21, 0),
    },
    {
      teamA: {
        name: "Albania",
      },
      teamB: {
        name: "Spain",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 24, 21, 0),
    },
    {
      teamA: {
        name: "Croatia",
      },
      teamB: {
        name: "Italy",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 24, 21, 0),
    },
    {
      teamA: {
        name: "Netherlands",
      },
      teamB: {
        name: "Austria",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 25, 18, 0),
    },
    {
      teamA: {
        name: "France",
      },
      teamB: {
        name: "Poland",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 25, 18, 0),
    },
    {
      teamA: {
        name: "England",
      },
      teamB: {
        name: "Slovenia",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 25, 21, 0),
    },
    {
      teamA: {
        name: "Denmark",
      },
      teamB: {
        name: "Serbia",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 25, 21, 0),
    },
    {
      teamA: {
        name: "Slovakia",
      },
      teamB: {
        name: "Romania",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 26, 18, 0),
    },
    {
      teamA: {
        name: "Ukraine",
      },
      teamB: {
        name: "Belgium",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 26, 18, 0),
    },
    {
      teamA: {
        name: "Georgia",
      },
      teamB: {
        name: "Portugal",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 26, 21, 0),
    },
    {
      teamA: {
        name: "Czechia",
      },
      teamB: {
        name: "Türkiye",
      },
      round: "Match day 3",
      date: DateTime.local(2024, 6, 26, 21, 0),
    },
  ];

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
        <MatchesOverview
          key={selectedRound}
          // @ts-ignore
          matches={matches.filter((match) => match.round === selectedRound)}
        />
      </div>
    </div>
  );
};

export default Bets;

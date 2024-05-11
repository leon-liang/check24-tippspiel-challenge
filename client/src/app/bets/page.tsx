"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { Select } from "@/components/select/Select";
import React, { useEffect, useMemo, useState } from "react";
import MatchesOverview, {
  Round,
} from "@/components/matches-overview/MatchesOverview";
import { DateTime, Interval } from "luxon";
import { useGetBets } from "@/hooks/bets.api";

// Match day 1    [14.06; 19.06)
// Match day 2    [19.06; 23.06)
// Match day 3    [23.06; 27.06)
// Round of 16    [29.06; 03.07)
// Quarter Finals [05.07; 07.07)
// Semi Finals    [09.07; 11.07)
// Finals         [14.07; 15.07)

const Bets = () => {
  const { data, isLoading, error } = useGetBets();

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

  const matches = useMemo(() => {
    return data?.data.bets?.map((bet) => {
      const date = DateTime.fromISO(
        bet.match?.match?.gameTime?.slice(0, -1) ?? "",
      );

      const currentRound = rounds.find((round) => round.dates.contains(date));

      return {
        homeTeam: {
          name: bet.match?.match?.homeTeam?.name ?? "",
          bet: bet.homeTeam,
          result: bet.match?.match?.homeTeam?.result,
        },
        awayTeam: {
          name: bet.match?.match?.awayTeam?.name ?? "",
          bet: bet.awayTeam,
          result: bet.match?.match?.awayTeam?.result,
        },
        round: currentRound?.name as Round,
        date: date,
      };
    });
  }, [data?.data.bets, rounds]);

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
        {data?.data.bets ? (
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

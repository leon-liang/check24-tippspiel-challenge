"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/Tabs";
import SubmitBet from "@/components/submit-bet/SubmitBet";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { getClosestDate } from "@/utils/date";

interface Team {
  name?: string;
  bet?: number;
  result?: number;
}

export type Round =
  | "Match day 1"
  | "Match day 2"
  | "Match day 3"
  | "Round of 16"
  | "Quarter-finals"
  | "Semi-finals"
  | "Finals";

interface Bet {
  betId: string;
  homeTeam: Team;
  awayTeam: Team;
  round: Round;
  date: DateTime;
}

interface BetOverviewProps {
  bets: Bet[];
}

const BetsOverview = ({ bets }: BetOverviewProps) => {
  const dates = [...new Set(bets.map((bet) => bet.date.toISODate() ?? ""))];

  const [selectedTab, setSelectedTab] = useState(dates[0]);

  useEffect(() => {
    const currentDate = DateTime.now();
    const matchDates = dates.map((date) => DateTime.fromISO(date));

    setSelectedTab(getClosestDate(currentDate, matchDates)?.toISODate() ?? "");
  }, []);

  return (
    <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value)}>
      <div className="overflow-auto">
        <TabsList>
          {dates.map((date, index) => (
            <TabsTrigger key={index} value={date}>
              {DateTime.fromISO(date)
                .setLocale("en")
                .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {dates.map((date, index) => (
        <TabsContent key={index} value={date}>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {bets
              .filter((bet) => bet.date.toISODate() === date)
              .map((bet, index) => (
                <SubmitBet
                  key={index}
                  betId={bet.betId}
                  homeTeam={bet.homeTeam}
                  awayTeam={bet.awayTeam}
                  date={bet.date}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default BetsOverview;

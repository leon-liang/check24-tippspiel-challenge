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
  name: string;
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

interface Match {
  homeTeam: Team;
  awayTeam: Team;
  round: Round;
  date: DateTime;
}

interface MatchOverviewProps {
  matches: Match[];
}

const MatchesOverview = ({ matches }: MatchOverviewProps) => {
  const dates = [
    ...new Set(matches.map((match) => match.date.toISODate() ?? "")),
  ];

  const [selectedTab, setSelectedTab] = useState(dates[0]);

  useEffect(() => {
    const currentDate = DateTime.now();
    const matchDates = dates.map((date) => DateTime.fromISO(date));

    setSelectedTab(getClosestDate(currentDate, matchDates)?.toISODate() ?? "");
  }, []);

  return (
    <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value)}>
      <TabsList>
        {dates.map((date, index) => (
          <TabsTrigger key={index} value={date}>
            {DateTime.fromISO(date)
              .setLocale("en")
              .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
          </TabsTrigger>
        ))}
      </TabsList>
      {dates.map((date, index) => (
        <TabsContent key={index} value={date}>
          <div className="grid grid-cols-3 gap-4">
            {matches
              .filter((match) => match.date.toISODate() === date)
              .map((match, index) => (
                <SubmitBet
                  key={index}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  date={match.date}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MatchesOverview;

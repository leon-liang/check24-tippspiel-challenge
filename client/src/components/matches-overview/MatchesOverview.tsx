import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/Tabs";
import SubmitBet from "@/components/submit-bet/SubmitBet";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface Team {
  name: string;
  bet?: number;
  result?: number;
}

interface Match {
  teamA: Team;
  teamB: Team;
  round:
    | "Match day 1"
    | "Match day 2"
    | "Match day 3"
    | "Round of 16"
    | "Quarter-finals"
    | "Semi-finals"
    | "Finals";
  date: DateTime;
}

interface MatchOverviewProps {
  matches: Match[];
}

const MatchesOverview = ({ matches }: MatchOverviewProps) => {
  const currentDate = DateTime.now().toISODate();
  const dates = [
    ...new Set(matches.map((match) => match.date.toISODate() ?? "")),
  ];

  const findClosestDate = (currentDate: string, dates: string[]) => {
    let differences = dates.map(
      (date) =>
        DateTime.fromISO(currentDate).diff(DateTime.fromISO(date), "days").days,
    );

    let minIndex = differences.reduce(
      (minIndex, diff, index) =>
        Math.abs(diff) < differences[minIndex] ? index : minIndex,
      0,
    );
    return dates[minIndex];
  };

  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    setSelectedTab(findClosestDate(currentDate, dates));
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
                  teamA={match.teamA}
                  teamB={match.teamB}
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

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/Tabs";
import SubmitBet from "@/components/submit-bet/SubmitBet";
import React from "react";
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
  const dates = [
    ...new Set(matches.map((match) => match.date.toISODate() ?? "")),
  ];

  return (
    <Tabs defaultValue={dates[0] ?? ""}>
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

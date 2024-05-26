"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { getClosestDate } from "@/utils/date";
import { DateTime } from "luxon";
import useBets from "@/hooks/use-bets";
import SubmitBet from "@/components/submit-bet/SubmitBet";
import React from "react";
import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const bets = useBets() ?? [];

  const currentDate = DateTime.now();
  const matchDates = bets.map((bet) => bet.date);
  const closestMatchDate = getClosestDate(currentDate, matchDates);

  const upcomingMatches = bets.filter((bet) => {
    return bet.date.toISODate() == closestMatchDate?.toISODate();
  });

  return (
    <>
      <Banner>
        <BannerTitle>Dashboard</BannerTitle>
        <BannerContent>
          <p>
            View your global standings and a preview of your communities in the
            dashboard.
          </p>
          <p>
            Get a snapshot of where you stand worldwide and what is happening in
            your communities.
          </p>
        </BannerContent>
      </Banner>
      <div className="px-[10%] py-6">
        <div className="flex flex-col gap-6">
          <div
            className="flex cursor-pointer flex-row items-center gap-2 underline-offset-2"
            onClick={() => router.push("/bets")}
          >
            <h1 className="text-lg underline">Your Bets</h1>
            <ExternalLinkIcon width={22} height={22} />
          </div>
          <div className="grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {upcomingMatches.map((match, index) => (
              <SubmitBet
                key={index}
                betId={match.betId}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                date={match.date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

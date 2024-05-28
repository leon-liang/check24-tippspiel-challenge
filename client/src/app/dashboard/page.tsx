"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { getClosestDate } from "@/utils/date";
import { DateTime, Interval } from "luxon";
import useBets from "@/hooks/use-bets";
import SubmitBet from "@/components/submit-bet/SubmitBet";
import React from "react";
import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon";
import { useRouter } from "next/navigation";
import { useGetUserCommunitiesPreview } from "@/hooks/api/communities.api";
import CommunityPreview from "@/components/community-preview/CommunityPreview";

const Dashboard = () => {
  const router = useRouter();
  const bets = useBets() ?? [];

  const { data } = useGetUserCommunitiesPreview();
  const currentDate = DateTime.now();
  const matchDates = bets.map((bet) => bet.date);
  const closestMatchDate = getClosestDate(currentDate, matchDates);

  const currentMatches = bets.filter((bet) => {
    const matchDuration = Interval.fromDateTimes(
      bet.date,
      bet.date.plus({ minute: 120 }),
    );
    return matchDuration.contains(currentDate);
  });

  const upcomingMatches = bets.filter((bet) => {
    return bet.date.toISODate() == closestMatchDate?.toISODate();
  });

  const matches = [...currentMatches, ...upcomingMatches];

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
      <div className="flex flex-row px-[10%] py-6">
        <div className="flex w-full flex-1 flex-col gap-6 text-lg">
          Community Previews
          {data?.data.communityPreviews?.map((preview, index) => {
            return (
              <CommunityPreview
                key={index}
                communityName={preview.name ?? ""}
              />
            );
          })}
        </div>
        <div className="flex flex-none flex-col gap-6">
          <div
            className="flex cursor-pointer flex-row items-center justify-end gap-2"
            onClick={() => router.push("/bets")}
          >
            <h1 className="text-lg underline underline-offset-4">Your Bets</h1>
            <ExternalLinkIcon width={22} height={22} />
          </div>
          <div className="grid w-full grid-cols-1 gap-3">
            {matches.map((match, index) => (
              <SubmitBet
                key={index}
                betId={match.betId}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                date={match.date}
                currentDate={currentDate}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

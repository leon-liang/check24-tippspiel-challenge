"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { DateTime } from "luxon";
import SubmitBet from "@/components/submit-bet/SubmitBet";
import React, { useMemo, useState } from "react";
import { useGetUserCommunitiesPreview } from "@/hooks/api/communities.api";
import CommunityPreview from "@/components/community-preview/CommunityPreview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/Tabs";
import { useMatchUpdates, useUpcomingMatches } from "@/hooks/use-matches";
import { usePointsUpdates } from "@/hooks/use-points";

const Dashboard = () => {
  const { data } = useGetUserCommunitiesPreview();
  const [selectedTab, setSelectedTab] = useState("global-standings");
  const currentDate = DateTime.now();
  const matches = useUpcomingMatches(currentDate);
  useMatchUpdates();
  usePointsUpdates();

  const userCommunities = useMemo(() => {
    return data?.data.communityLeaderboard?.filter(
      (preview) => preview.communityLeaderboard?.name !== "CHECK24 Global",
    );
  }, [data]);

  const globalStandings = useMemo(() => {
    return data?.data.communityLeaderboard?.filter(
      (preview) => preview.communityLeaderboard?.name === "CHECK24 Global",
    );
  }, [data]);

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
      <div className="flex flex-row gap-6 px-[10%] py-6">
        <div className="flex flex-1">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="overflow-auto">
              <TabsList>
                <TabsTrigger value="global-standings">
                  Global Standings
                </TabsTrigger>
                <TabsTrigger value="user-communities">
                  Your Communities
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="global-standings">
              <div className="mt-6 flex flex-col gap-6">
                {globalStandings?.map((preview, index) => {
                  return (
                    <CommunityPreview
                      key={index}
                      communityName={preview.communityLeaderboard?.name ?? ""}
                      communityId={preview.communityLeaderboard?.id ?? ""}
                      members={preview.communityLeaderboard?.members ?? []}
                    />
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="user-communities">
              <div className="mt-6 flex flex-col gap-3">
                {userCommunities?.map((preview, index) => {
                  return (
                    <CommunityPreview
                      key={index}
                      communityName={preview.communityLeaderboard?.name ?? ""}
                      communityId={preview.communityLeaderboard?.id ?? ""}
                      members={preview.communityLeaderboard?.members ?? []}
                    />
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-3 flex w-2/6 flex-none flex-col gap-6">
          <h1 className="text-md text-gray-12">Upcoming Matches</h1>
          <div className="grid w-full grid-cols-1 gap-3">
            {matches.map((match, index) => (
              <SubmitBet
                key={index}
                betId={match.betId}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                currentDate={currentDate}
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

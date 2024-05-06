"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import { Select } from "@/components/select/Select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/Tabs";
import React from "react";
import Bet from "@/components/bet/Bet";

const Bets = () => {
  return (
    <div>
      <Banner>
        <BannerTitle>
          <h1>Your Bets</h1>
          <Select
            defaultValue={"1st Game Day"}
            items={[
              "1st Game Day",
              "2nd Game Day",
              "3rd Game Day",
              "Round of 16",
              "Quarterfinals",
              "Semifinals",
              "Finals",
            ]}
            onValueChange={() => {}}
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
        <Tabs defaultValue="friday">
          <TabsList>
            <TabsTrigger value="friday">Friday, 14.06.24</TabsTrigger>
            <TabsTrigger value="saturday">Saturday, 15.06.24</TabsTrigger>
            <TabsTrigger value="sunday">Sunday, 16.06.24</TabsTrigger>
            <TabsTrigger value="monday">Monday, 17.06.24</TabsTrigger>
            <TabsTrigger value="tuesday">Tuesday, 18.06.24</TabsTrigger>
          </TabsList>
          <TabsContent value="friday">
            <div className="grid grid-cols-3 gap-4">
              <Bet />
              <Bet />
              <Bet />
              <Bet />
              <Bet />
            </div>
          </TabsContent>
          <TabsContent value="saturday"></TabsContent>
          <TabsContent value="sunday"></TabsContent>
          <TabsContent value="monday"></TabsContent>
          <TabsContent value="tuesday"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bets;

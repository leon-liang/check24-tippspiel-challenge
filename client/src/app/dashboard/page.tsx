"use client";

import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";

const Dashboard = () => {
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
    </>
  );
};

export default Dashboard;

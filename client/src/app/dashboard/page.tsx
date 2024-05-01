"use client";

import Banner from "@/components/banner/Banner";

const Dashboard = () => {
  return (
    <>
      <Banner
        title="Dashboard"
        descriptions={[
          "View your global standings and a preview of your communities in the dashboard.",
          "Get a snapshot of where you stand worldwide and what's happening in your communities.",
        ]}
      />
    </>
  );
};

export default Dashboard;

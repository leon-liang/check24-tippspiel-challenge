"use client";

import { useGetExample } from "@/hooks/example.api";

const Dashboard = () => {
  const { isLoading, error, data } = useGetExample();

  return (
    <>
      <p>{isLoading ? "Loading..." : data?.data.message}</p>
    </>
  );
};

export default Dashboard;

"use client";

import { notFound } from "next/navigation";
import Banner, { BannerTitle } from "@/components/banner/Banner";
import { DateTime } from "luxon";
import { createColumnHelper, useReactTable } from "@tanstack/react-table";
import useValidatePermissions from "@/hooks/use-validate-permissions";

type Match = {
  gameTime: DateTime;
  homeTeam: {
    name?: string;
    score?: number;
  };
  awayTeam: {
    name?: string;
    score?: number;
  };
  lastUpdated: DateTime;
};

const defaultData: Match[] = [
  {
    gameTime: DateTime.local(2024, 6, 14, 21),
    homeTeam: {
      name: "Germany",
    },
    awayTeam: {
      name: "Scotland",
    },
    lastUpdated: DateTime.now(),
  },
];

const columnHelper = createColumnHelper<Match>();

const columns = [
  columnHelper.group({
    header: "Game Time",
  }),
  columnHelper.group({
    header: "Home Team",
    columns: [
      columnHelper.accessor("homeTeam.name", {
        header: "Name",
      }),
      columnHelper.accessor("homeTeam.score", {
        header: "Score",
      }),
    ],
  }),
  columnHelper.group({
    header: "Away Team",
    columns: [
      columnHelper.accessor("awayTeam.name", {
        header: "Name",
      }),
      columnHelper.accessor("awayTeam.score", {
        header: "Score",
      }),
    ],
  }),
  columnHelper.group({
    header: "Last Updated",
  }),
];

const Matches = () => {
  const [isLoading, isPermitted] = useValidatePermissions(["admin:full"]);
  if (!isLoading && !isPermitted) {
    return notFound();
  }

  return (
    <>
      <Banner>
        <BannerTitle>Matches</BannerTitle>
      </Banner>
    </>
  );
};

export default Matches;

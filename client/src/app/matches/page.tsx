"use client";

import { notFound } from "next/navigation";
import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import useValidatePermissions from "@/hooks/use-validate-permissions";
import Table, { Column } from "@/components/table/Table";
import React, { useState } from "react";
import useMatches from "@/hooks/use-matches";
import UpdateMatch from "@/components/update-match/UpdateMatch";

type Match = {
  gameTime: string;
  homeTeam: {
    name?: string;
    score?: number;
  };
  awayTeam: {
    name?: string;
    score?: number;
  };
};

const columns: Column<Match>[] = [
  {
    accessorKey: "gameTime",
    header: "Game Time",
  },
  {
    id: "homeTeam",
    header: "Home Team",
    columns: [
      {
        accessorKey: "homeTeam.name",
        header: "Name",
      },
      {
        accessorKey: "homeTeam.score",
        header: "Score",
      },
    ],
  },
  {
    id: "awayTeam",
    header: "Away Team",
    columns: [
      {
        accessorKey: "awayTeam.name",
        header: "Name",
      },
      {
        accessorKey: "awayTeam.score",
        header: "Score",
      },
    ],
  },
];

const Matches = () => {
  const [isLoading, isPermitted] = useValidatePermissions(["admin:full"]);
  const [selectedRow, setSelectedRow] = useState<number>();

  const [open, setOpen] = useState<boolean>(false);
  const matches = useMatches();

  const selectedMatch = matches[selectedRow ?? 0];

  if (!isLoading && !isPermitted) return notFound();

  function onRowClick(selectedIndex: number) {
    setOpen(true);
    setSelectedRow(selectedIndex);
  }

  return (
    <>
      <Banner>
        <BannerTitle>Matches</BannerTitle>
        <BannerContent>
          <p>Manage team scores and upcoming matches on this page.</p>
          <p>Changed made are synced in real time to all users.</p>
        </BannerContent>
      </Banner>
      <div className="py-6 md:px-32">
        <Table
          data={matches}
          columns={columns}
          rowsPerPage={12}
          onRowClick={onRowClick}
        />
      </div>
      <UpdateMatch open={open} setOpen={setOpen} match={selectedMatch} />
    </>
  );
};

export default Matches;

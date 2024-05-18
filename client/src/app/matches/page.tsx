"use client";

import { notFound } from "next/navigation";
import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import useValidatePermissions from "@/hooks/use-validate-permissions";
import Table, { Column } from "@/components/table/Table";
import React, { useState } from "react";
import useMatches from "@/hooks/use-matches";
import UpdateMatch from "@/components/update-match/UpdateMatch";
import useMatchColumns from "@/hooks/use-match-columns";

type Match = {
  id: string;
  gameTime: string;
  homeTeam: {
    name?: string;
    result?: number;
  };
  awayTeam: {
    name?: string;
    result?: number;
  };
};

const Matches = () => {
  const [isLoading, isPermitted] = useValidatePermissions(["admin:full"]);
  const [selectedRow, setSelectedRow] = useState<number>();

  const [open, setOpen] = useState<boolean>(false);
  const matches: Match[] = useMatches();
  const matchColumns: Column<Match>[] = useMatchColumns();

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
          columns={matchColumns}
          rowsPerPage={10}
          onRowClick={onRowClick}
        />
      </div>
      <UpdateMatch open={open} setOpen={setOpen} match={selectedMatch} />
    </>
  );
};

export default Matches;

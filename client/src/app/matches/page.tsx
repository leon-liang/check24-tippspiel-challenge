"use client";

import { notFound } from "next/navigation";
import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import useValidatePermissions from "@/hooks/use-validate-permissions";
import Table, { Column } from "@/components/table/Table";
import React, { useState } from "react";
import useMatches from "@/hooks/use-matches";
import UpdateMatch from "@/components/update-match/UpdateMatch";
import useMatchColumns from "@/hooks/use-match-columns";
import Button from "@/components/button/Button";

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
      <div className="flex flex-col gap-4 px-[10%] py-6">
        {/* TODO: Only show if any match was updated more recently than the last time the score was last calculated */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-amber-6 bg-colors-amber-3 px-6 py-2 text-sm text-amber-12">
          The match scores have been updated since you last recalculated the
          points
          <Button className="text-xs" variant="outline">
            Calculate Points
          </Button>
        </div>
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

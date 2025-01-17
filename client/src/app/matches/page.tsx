"use client";

import { notFound } from "next/navigation";
import Banner, { BannerContent, BannerTitle } from "@/components/banner/Banner";
import useValidatePermissions from "@/hooks/use-validate-permissions";
import Table, { Column } from "@/components/table/Table";
import React, { useState } from "react";
import { useMatches } from "@/hooks/use-matches";
import UpdateMatch from "@/components/update-match/UpdateMatch";
import { useMatchColumns } from "@/hooks/use-matches";
import { useCalculatePoints } from "@/hooks/api/points.api";
import { useIsPointsOutOfDate } from "@/hooks/use-points";
import CalculatePoints from "@/components/calculate-points/CalculatePoints";
import useJobUpdates from "@/hooks/use-job";

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
  const [jobName, setJobName] = useState<string>("");

  const calculatePointsMutation = useCalculatePoints();
  const matches: Match[] = useMatches();
  const isOutOfDate = useIsPointsOutOfDate();
  const matchColumns: Column<Match>[] = useMatchColumns();
  useJobUpdates(jobName);

  const selectedMatch = matches[selectedRow ?? 0];

  if (!isLoading && !isPermitted) return notFound();

  function onRowClick(selectedIndex: number) {
    setOpen(true);
    setSelectedRow(selectedIndex);
  }

  async function onCalculatePointsClicked() {
    const result = await calculatePointsMutation.mutateAsync();
    setJobName(result.data.job?.name ?? "");
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
        {isOutOfDate ? (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-amber-6 bg-colors-amber-3 px-6 py-2 text-sm text-amber-12">
            The match scores have been updated since you last recalculated the
            points
            <CalculatePoints onClick={onCalculatePointsClicked} />
          </div>
        ) : null}
        <Table data={matches} columns={matchColumns} onRowClick={onRowClick} />
      </div>
      <UpdateMatch open={open} setOpen={setOpen} match={selectedMatch} />
    </>
  );
};

export default Matches;

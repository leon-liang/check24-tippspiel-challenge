"use client";

import { notFound } from "next/navigation";
import Banner, { BannerTitle } from "@/components/banner/Banner";
import { DateTime } from "luxon";
import useValidatePermissions from "@/hooks/use-validate-permissions";
import Table, { Column } from "@/components/table/Table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet/Sheet";
import { useState } from "react";

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

const defaultData: Match[] = [
  {
    gameTime: DateTime.local(2024, 6, 14, 21)
      .setLocale("en")
      .toLocaleString(DateTime.DATETIME_SHORT),
    homeTeam: {
      name: "Germany",
    },
    awayTeam: {
      name: "Scotland",
    },
  },
  {
    gameTime: DateTime.local(2024, 6, 14, 15)
      .setLocale("en")
      .toLocaleString(DateTime.DATETIME_SHORT),
    homeTeam: {
      name: "Hungary",
    },
    awayTeam: {
      name: "Switzerland",
    },
  },
];

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

  if (!isLoading && !isPermitted) return notFound();

  function onRowClick(selectedIndex?: number) {
    setSelectedRow(selectedIndex);
  }

  return (
    <>
      <Banner>
        <BannerTitle>Matches</BannerTitle>
      </Banner>
      <div className="flex flex-row items-center gap-6 py-6 md:px-32">
        <Sheet open={open && selectedRow !== undefined} onOpenChange={setOpen}>
          <SheetTrigger className="w-full">
            <Table
              data={defaultData}
              columns={columns}
              onRowClick={onRowClick}
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Update Match</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Matches;

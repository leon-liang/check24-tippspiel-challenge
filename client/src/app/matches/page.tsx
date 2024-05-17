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
import React, { useState } from "react";
import Form, { Input } from "@/components/form/Form";
import Button from "@/components/button/Button";
import ArrowRight from "@/components/icons/ArrowRight";
import { z } from "zod";

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

  const FormSchema = z.object({
    homeTeamName: z.string().optional(),
    homeTeamScore: z.number().int(),
    awayTeamName: z.string().optional(),
    awayTeamScore: z.number().int(),
  });

  type FormData = z.infer<typeof FormSchema>;

  const selectedMatch = defaultData[selectedRow ?? 0];
  const defaultValues = {
    homeTeamName: selectedMatch.homeTeam.name,
    homeTeamScore: selectedMatch.homeTeam.score,
    awayTeamName: selectedMatch.awayTeam.name,
    awayTeamScore: selectedMatch.awayTeam.score,
  };

  const onSubmit = async (data: FormData) => {};

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
            <SheetHeader className="flex flex-col gap-8">
              <SheetTitle>Update Match</SheetTitle>
              <div className="flex flex-col gap-6 text-sm text-gray-11">
                <p>Update Match details below. Click save when you are done.</p>
              </div>
            </SheetHeader>
            <Form
              schema={FormSchema}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
            >
              <div className="flex flex-col gap-4">
                <Input
                  name="homeTeamName"
                  displayName="Home Team Name"
                  type="text"
                />
                <Input
                  name="homeTeamScore"
                  displayName="Home Team Score"
                  type="text"
                />
              </div>
              <hr className="border-gray-6" />
              <div className="flex flex-col gap-4">
                <Input
                  name="awayTeamName"
                  displayName="Away Team Name"
                  type="text"
                />
                <Input
                  name="awayTeamScore"
                  displayName="Away Team Score"
                  type="text"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  variant="mute"
                >
                  Cancel
                </Button>
                <Button
                  variant="action"
                  className="flex flex-row items-center gap-2"
                  type="submit"
                >
                  Save
                  <ArrowRight className="stroke-2" width={16} height={16} />
                </Button>
              </div>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Matches;

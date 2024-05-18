import { useMemo } from "react";

const useMatchColumns = () => {
  return useMemo(() => {
    return [
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
            accessorKey: "homeTeam.result",
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
            accessorKey: "awayTeam.result",
            header: "Score",
          },
        ],
      },
    ];
  }, []);
};

export default useMatchColumns;

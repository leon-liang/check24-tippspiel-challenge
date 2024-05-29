import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { matchesApiFactory } from "@/api-client";
import { HttpMatchUpdateRequest } from "@/api-client/generated";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const useGetMatches = () => {
  return useQuery({
    queryFn: () => matchesApiFactory.v1MatchesGet(),
    queryKey: ["matches"],
  });
};

export const useUpdateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      matchId,
      homeTeamName,
      homeTeamResult,
      awayTeamName,
      awayTeamResult,
    }: {
      matchId: string;
      homeTeamName?: string;
      homeTeamResult?: number;
      awayTeamName?: string;
      awayTeamResult?: number;
    }) => {
      const updatedMatch: HttpMatchUpdateRequest = {
        match: {
          homeTeam: {
            name: homeTeamName,
            result: homeTeamResult,
          },
          awayTeam: {
            name: awayTeamName,
            result: awayTeamResult,
          },
        },
      };

      return matchesApiFactory.v1MatchesMatchIdPut(matchId, updatedMatch);
    },
    onSuccess: async () => [
      await queryClient.invalidateQueries({ queryKey: ["matches"] }),
    ],
  });
};

interface UpdatedMatch {
  match: {
    id: string;
    homeTeam: {
      name: string;
      result: number;
    };
    awayTeam: {
      name: string;
      result: number;
    };
  };
}

export const useSubscribeMatchUpdate = () => {
  const [match, setMatch] = useState<UpdatedMatch>();

  useEffect(() => {
    const websocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/v1/ws/matches`,
    );

    websocket.onmessage = (event) => {
      setMatch(JSON.parse(event.data));
    };

    return () => {
      websocket.close();
    };
  }, []);

  return match;
};

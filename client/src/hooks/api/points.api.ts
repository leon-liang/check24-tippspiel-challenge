import { useMutation } from "@tanstack/react-query";
import { pointsApiFactory } from "@/api-client";
import { useEffect, useState } from "react";

export const useCalculatePoints = () => {
  return useMutation({
    mutationFn: () => pointsApiFactory.v1PointsPut(),
  });
};

interface Message {
  message: {
    status: string;
    updatedAt: string;
  };
}

export const useSubscribePointsUpdates = () => {
  const [message, setMessage] = useState<Message>();

  useEffect(() => {
    const websocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/v1/ws/points/status`,
    );

    websocket.onmessage = (event) => {
      setMessage(JSON.parse(event.data));
    };

    return () => {
      websocket.close();
    };
  }, []);

  return message;
};

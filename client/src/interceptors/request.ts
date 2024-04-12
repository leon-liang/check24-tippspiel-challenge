import globalAxios from "axios";
import { getSession } from "next-auth/react";

globalAxios.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    // @ts-ignore
    request.headers["Authorization"] = `Bearer ${session.accessToken}`;
  }
  return request;
});

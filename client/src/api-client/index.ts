import {
  Configuration,
  RootApiFactory,
  UsersApiFactory,
  CommunitiesApiFactory,
  BetsApiFactory,
  MatchesApiFactory,
  PointsApiFactory,
  JobsApiFactory,
} from "@/api-client/generated";

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

const configuration: Configuration = {
  isJsonMime(mime: string): boolean {
    const jsonMime = new RegExp(
      "^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$",
      "i",
    );
    return (
      mime !== null &&
      (jsonMime.test(mime) ||
        mime.toLowerCase() === "application/json-patch+json")
    );
  },
  basePath: process.env.NEXT_PUBLIC_API_URL,
};

export const defaultApiFactory = RootApiFactory(configuration);
export const usersApiFactory = UsersApiFactory(configuration);
export const communitiesApiFactory = CommunitiesApiFactory(configuration);
export const betsApiFactory = BetsApiFactory(configuration);
export const matchesApiFactory = MatchesApiFactory(configuration);
export const pointsApiFactory = PointsApiFactory(configuration);
export const jobsApiFactory = JobsApiFactory(configuration);

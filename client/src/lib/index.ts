import { Configuration, DefaultApiFactory } from "@/lib/api-client";

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

export const defaultApiFactory = DefaultApiFactory(configuration);

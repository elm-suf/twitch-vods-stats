import type { PageServerLoad } from "@analogjs/router";
import { getQuery } from "h3";
import { handlers } from "../../../../server/handlers";

export async function load({ event }: PageServerLoad) {
  const query = getQuery(event);
  const searchTerm = query["searchTerm"] as string;
  console.debug("loaded search", query["searchTerm"]);

  if (searchTerm) {
    const data = await handlers.searchChannels(searchTerm);
    return data;
  }

  return {
    loaded: true,
    searchTerm: `${query["searchTerm"]}`,
    users: []
  };
}

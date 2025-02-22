import { inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TwitchApiSingleton } from "../../core/twitch-singleton";
import { ISearchUser } from "../../models";

// inferred types
export type SearchResponse = inferProcedureOutput<
  (typeof twitchRouter)["search"]
>;

export const twitchRouter = router({
  search: publicProcedure
    .input(
      z.object({
        term: z.string(),
      })
    )
    .query(({ input }) => search(input.term)),
});

// handlers
async function search(term: string) {
  const apiClient = TwitchApiSingleton.getInstance();

  const data = await apiClient.search.searchChannels(term);

  const users = data.data.map<ISearchUser>((channel) => ({
    id: channel.id,
    name: channel.displayName,
    thumbnailUrl: channel.thumbnailUrl,
  }));

  return {
    loaded: true,
    searchTerm: term,
    users,
  };
}

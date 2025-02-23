import { inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import { handlers } from "../../handlers";
import { publicProcedure, router } from "../trpc";

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
    .query(({ input }) => handlers.searchChannels(input.term)),
});

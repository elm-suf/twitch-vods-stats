import { router } from "../trpc";
import { twitchRouter } from "./twitch";

export const appRouter = router({
  twitch: twitchRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

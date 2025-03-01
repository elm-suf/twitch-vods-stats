import type { PageServerLoad } from "@analogjs/router";
import { getRouterParams } from "h3";
import { handlers } from "../../../../server/handlers";

export async function load({ event }: PageServerLoad) {
  const query = getRouterParams(event);
  const userName = query["userName"] as string;
  console.debug("loading user page", userName);

  const userInfo = await handlers.getUserByUsername(userName);
  const vods = await handlers.getVideosByChannelId(userInfo?.id);

  return {
    loaded: true,
    userName,
    userInfo,
    paginatedVods: vods,
  };
}

import type { PageServerLoad } from "@analogjs/router";
import { getRouterParams } from "h3";
import { handlers } from "../../../../server/handlers";

export async function load({ event }: PageServerLoad) {
  const query = getRouterParams(event);
  const vodId = query["vodId"] as string;
  console.log("loading vods page", vodId);

  const messages = await handlers.getVodChatByVodId(vodId);
  // const messages = await handlers.getVideosByChannelId(userInfo?.id);

  return {
    loaded: true,
    messages
    // userName,
    // userInfo,
    // paginatedVods: vods,
  };
}

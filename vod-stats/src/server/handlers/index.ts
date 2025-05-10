import { getUserByUsername } from "./getUserByUsername";
import { getVideosByChannelId } from "./getVideosByUser";
import { getVodChatByVodId } from "./getVodChat/getVodChatByVodId";
import { searchChannels } from "./searchChannels";

export const handlers = {
  searchChannels,
  getUserByUsername,
  getVideosByChannelId,
  getVodChatByVodId,
};

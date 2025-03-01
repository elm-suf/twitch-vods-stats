import { getUserByUsername } from "./getUserByUsername";
import { getVideosByChannelId } from "./getVideosByUser";
import { searchChannels } from "./searchChannels";

export const handlers = {
  searchChannels,
  getUserByUsername,
  getVideosByChannelId,
};

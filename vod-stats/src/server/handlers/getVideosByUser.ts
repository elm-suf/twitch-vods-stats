import { HelixPaginatedResult, HelixVideo } from "@twurple/api";
import { TwitchApiSingleton } from "../core/twitch-singleton";

export async function getVideosByChannelId(userName?: string) {
  if (!userName) {
    return { data: [], pagination: null };
  }
  const apiClient = TwitchApiSingleton.getInstance();

  const data = await apiClient.videos.getVideosByUser(userName);

  return { data: mapVods(data), pagination: data.cursor };
}

export function mapVods(data: HelixPaginatedResult<HelixVideo>) {
  return data.data.map((video) => ({
    id: video.id,
    userId: video.userId,
    userName: video.userName,
    title: video.title,
    description: video.description,
    url: video.url,
    thumbnailUrl: video.getThumbnailUrl(320, 180),
    creationDate: video.creationDate,
    streamId: video.streamId,
  }));
}

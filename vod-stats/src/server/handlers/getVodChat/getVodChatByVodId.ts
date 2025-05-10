import { TwitchApiSingleton } from "../../core/twitch-singleton";
import {
  IVodChat,
  IVodChatMessage,
  VodChatByVodIdGQL,
  VodMetadata,
} from "./models";

const baseUrl = "https://gql.twitch.tv/gql";
const headers = { "Client-ID": "kd1unb4b3q4t58fwlpcbzcbnm76a8fp" };

const firstQuery = (videoId: string, videoStart: number): string =>
  JSON.stringify({
    operationName: "VideoCommentsByOffsetOrCursor",
    variables: {
      videoID: videoId,
      contentOffsetSeconds: videoStart,
    },

    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "b70a3591ff0f4e0313d126c6a1502d79a1c02baebb288227c582044aa76adf6a",
      },
    },
  });

const cursorQuery = (videoId: string, cursor: string): string => {
  return JSON.stringify({
    operationName: "VideoCommentsByOffsetOrCursor",
    variables: {
      videoID: videoId,
      cursor: cursor,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash:
          "b70a3591ff0f4e0313d126c6a1502d79a1c02baebb288227c582044aa76adf6a",
      },
    },
  });
};

export async function getVodChatByVodId(videoId: string): Promise<IVodChat> {
  const apiClient = TwitchApiSingleton.getInstance();
  const [videoMetadata, firstQueryDataResponse] = await Promise.all([
    apiClient.videos.getVideoById(videoId),
    fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: firstQuery(videoId, 0),
    }),
  ]);

  if (!videoMetadata) {
    throw new Error("Invalid video metadata response");
  }

  const firstQueryData: VodChatByVodIdGQL.RawResponse =
    await firstQueryDataResponse.json();
  if (!firstQueryData?.data?.video?.comments?.edges?.length) {
    throw new Error("Invalid chat data response");
  }

  const res: IVodChat = {
    meta: {
      id: videoMetadata.id,
      title: videoMetadata.title,
      thumbnailUrl: videoMetadata.thumbnailUrl,
      creationDate: videoMetadata.creationDate,
      views: videoMetadata.views,
      publishDate: videoMetadata.publishDate,
      durationInSeconds: videoMetadata.durationInSeconds,
      url: videoMetadata.url,
    },
    messages: [],
  };

  let cursor = firstQueryData.data.video.comments.edges[0].cursor;
  const mapEdge = (edge: VodChatByVodIdGQL.Edge) => {
    return {
      message: edge.node.message.fragments[0].text,
      time: edge.node.contentOffsetSeconds,
      user: edge.node.commenter?.displayName ?? "[deleted]",
    };
  };
  const messages: IVodChatMessage[] =
    firstQueryData.data.video.comments.edges.map<IVodChatMessage>(mapEdge);

  let count = 0;

  while (cursor) {
    console.log("cursor count ", count++, cursor);
    const cursorQueryResponse = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: cursorQuery(videoId, cursor),
    });
    const cursorQueryData: VodChatByVodIdGQL.RawResponse =
      await cursorQueryResponse.json();
    cursor = cursorQueryData.data.video.comments.pageInfo.hasNextPage
      ? cursorQueryData.data.video.comments.edges[0].cursor
      : "";
    messages.push(...cursorQueryData.data.video.comments.edges.map(mapEdge));
  }
  res.messages = messages;
  return res;
}

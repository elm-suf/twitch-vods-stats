export namespace VodMetadata {
  export interface RawResponse {
    data: Data;
    extensions: Extensions;
  }

  export interface Data {
    user: User;
    currentUser: any;
    video: Video;
  }

  export interface User {
    id: string;
    primaryColorHex: string;
    isPartner: boolean;
    profileImageURL: string;
    lastBroadcast: LastBroadcast;
    stream: any;
    followers: Followers;
    __typename: string;
  }

  export interface LastBroadcast {
    id: string;
    startedAt: string;
    __typename: string;
  }

  export interface Followers {
    totalCount: number;
    __typename: string;
  }

  export interface Video {
    id: string;
    title: string;
    description: any;
    previewThumbnailURL: string;
    createdAt: string;
    viewCount: number;
    publishedAt: string;
    lengthSeconds: number;
    broadcastType: string;
    owner: Owner;
    game: Game;
    __typename: string;
  }

  export interface Owner {
    id: string;
    login: string;
    displayName: string;
    __typename: string;
  }

  export interface Game {
    id: string;
    slug: string;
    boxArtURL: string;
    name: string;
    displayName: string;
    __typename: string;
  }

  export interface Extensions {
    durationMilliseconds: number;
    operationName: string;
    requestID: string;
  }
}

export namespace VodChatByVodIdGQL {
  export interface RawResponse {
    data: Data;
  }

  interface Data {
    video: Video;
  }

  interface Video {
    id: string;
    creator: Creator;
    comments: Comments;
    __typename: string;
  }

  interface Creator {
    id: string;
    channel: Channel;
    __typename: string;
  }

  interface Channel {
    id: string;
    __typename: string;
  }

  interface Comments {
    edges: Edge[];
    pageInfo: PageInfo;
    __typename: string;
  }

  export interface Edge {
    cursor: string;
    node: Node;
    __typename: string;
  }

  interface Node {
    id: string;
    commenter: Commenter | null;
    contentOffsetSeconds: number;
    createdAt: string;
    message: Message;
    __typename: string;
  }

  interface Commenter {
    id: string;
    login: string;
    displayName: string;
    __typename: string;
  }

  interface Message {
    fragments: Fragment[];
    userBadges: UserBadge[];
    userColor: string;
    __typename: string;
  }

  interface Fragment {
    emote: any;
    text: string;
    __typename: string;
  }

  interface UserBadge {
    id: string;
    setID: string;
    version: string;
    __typename: string;
  }

  interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    __typename: string;
  }
}

export interface IVodChat {
  meta: {
    id: string;
    title: string;
    thumbnailUrl: string;
    creationDate: Date;
    views: number;
    publishDate: Date;
    durationInSeconds: number;
    url: string;
  };
  messages: IVodChatMessage[];
}

export interface IVodChatMessage {
  user: string;
  message: string;
  time: number;
}

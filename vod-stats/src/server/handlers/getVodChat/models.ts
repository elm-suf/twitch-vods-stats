export namespace VodChatByVodIdGQL {
  export interface RawResponse {
    data: Data;
  }

  export interface Data {
    video: Video;
  }

  export interface Video {
    id: string;
    creator: Creator;
    comments: Comments;
    __typename: string;
  }

  export interface Creator {
    id: string;
    channel: Channel;
    __typename: string;
  }

  export interface Channel {
    id: string;
    __typename: string;
  }

  export interface Comments {
    edges: Edge[];
    pageInfo: PageInfo;
    __typename: string;
  }

  export interface Edge {
    cursor: string;
    node: Node;
    __typename: string;
  }

  export interface Node {
    id: string;
    commenter: Commenter;
    contentOffsetSeconds: number;
    createdAt: string;
    message: Message;
    __typename: string;
  }

  export interface Commenter {
    id: string;
    login: string;
    displayName: string;
    __typename: string;
  }

  export interface Message {
    fragments: Fragment[];
    userBadges: UserBadge[];
    userColor: string;
    __typename: string;
  }

  export interface Fragment {
    emote: any;
    text: string;
    __typename: string;
  }

  export interface UserBadge {
    id: string;
    setID: string;
    version: string;
    __typename: string;
  }

  export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    __typename: string;
  }
}

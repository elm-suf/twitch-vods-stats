import { TwitchApiSingleton } from "../core/twitch-singleton";
import { ISearchUser } from "../models";

// handlers
export async function searchChannels(term: string) {
  const apiClient = TwitchApiSingleton.getInstance();

  const data = await apiClient.search.searchChannels(term);

  const users = data.data.map<ISearchUser>((channel) => ({
    id: channel.id,
    name: channel.displayName,
    thumbnailUrl: channel.thumbnailUrl,
  }));

  return {
    loaded: true,
    searchTerm: term,
    users,
  };
}



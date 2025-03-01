import { TwitchApiSingleton } from "../core/twitch-singleton";

export async function getUserByUsername(userName: string) {
  if (!userName) {
    return null;
  }
  const apiClient = TwitchApiSingleton.getInstance();

  const data = await apiClient.users.getUserByName(userName);

  return mapUser(data);
}

function mapUser(data: import("@twurple/api").HelixUser | null) {
  if (!data) {
    return null;
  }
  return {
    id: data.id,
    name: data.name,
    displayName: data.displayName,
    description: data.description,
    type: data.type,
    broadcasterType: data.broadcasterType,
    profilePictureUrl: data.profilePictureUrl,
    offlinePlaceholderUrl: data.offlinePlaceholderUrl,
    creationDate: data.creationDate,
  };
}

import { ApiClient } from "@twurple/api";
import { AppTokenAuthProvider } from "@twurple/auth";

export class TwitchApiSingleton {
  private static instance: ApiClient;

  private constructor() {} // Private constructor to prevent instantiation

  static getInstance(): ApiClient {
    if (!TwitchApiSingleton.instance) {
      const clientId = import.meta.env["TWITCH_CLIENT_ID"];
      const clientSecret = import.meta.env["TWITCH_CLIENT_SECRET"];

      const authProvider = new AppTokenAuthProvider(clientId, clientSecret);
      TwitchApiSingleton.instance = new ApiClient({ authProvider });
    }
    return TwitchApiSingleton.instance;
  }
}

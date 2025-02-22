import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { provideClientHydration } from "@angular/platform-browser";
import { provideFileRouter, requestContextInterceptor } from "@analogjs/router";

import { provideTrpcClient } from "../trpc-client";
import {
  withComponentInputBinding,
  withNavigationErrorHandler,
} from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(
      withComponentInputBinding(),
      withNavigationErrorHandler(console.error)
    ),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),

    provideTrpcClient(),
  ],
};

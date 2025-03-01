import { Component, Input } from "@angular/core";

import { injectLoad } from "@analogjs/router";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { load } from "./[userName].server";
import { RouterLink } from "@angular/router";

@Component({
  selector: "vod-stats-users",
  imports: [CommonModule, RouterLink],
  host: {
    class: "block p-4 min-h-full",
  },
  template: `
    USER PAGE : {{ userName }}
    <main>
      @if (data().userInfo; as userInfo) {
      <div>
        <h1>{{ userInfo.displayName }}</h1>
        <img [src]="userInfo.profilePictureUrl" />
        <p>{{ userInfo.description }}</p>
      </div>
      } @if (data().paginatedVods.data; as vods) {
      <div>
        <h2>Videos</h2>
        <ul>
          @for (video of vods; track $index) {
          <li>
            <a
              [routerLink]="['/vods/' + video.id]"
              routerLinkActive="router-link-active"
            >
              <img [src]="video.thumbnailUrl" />
              <h3>{{ video.title }}</h3>
              <p>{{ video.description }}</p>
            </a>
            <a [href]="video.url"> watch on twitch</a>
          </li>
          }
        </ul>
      </div>
      }
    </main>
  `,
})
export default class HomeComponent {
  @Input() userName!: string;

  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}

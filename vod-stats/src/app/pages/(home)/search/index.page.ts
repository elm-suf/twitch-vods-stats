import { Component } from "@angular/core";

import { injectLoad } from "@analogjs/router";
import { CommonModule } from "@angular/common";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";

import { RouterLink } from "@angular/router";
import { load } from "./index.server";

@Component({
  selector: "vod-stats-users",
  imports: [CommonModule, FormsModule, RouterLink],
  host: {
    class: "block p-4 min-h-full",
  },
  template: `
    @if (data().users; as users) {
    <div class="mt-8">
      <h3
        *ngIf="users.length > 0"
        class="text-xl font-semibold"
        role="heading"
        aria-level="2"
      >
        Search Results
      </h3>
      <ul
        *ngIf="users.length > 0"
        class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        @for (user of users; track $index) {
        <li
          class="cursor-pointer group flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
          role="listitem"
          tabindex="0"
          [attr.aria-labelledby]="'user-' + user.id"
          [routerLink]="['../users', user.name]"
          routerLinkActive="router-link-active"
        >
          <img
            [src]="user.thumbnailUrl"
            alt="{{ user.name }}'s profile picture"
            class="w-16 h-16 rounded-full border-2 border-blue-500 transition-transform group-hover:scale-105"
          />
          <span
            id="user-{{ user.id }}"
            class="mt-2 text-lg font-medium"
            role="heading"
            aria-level="3"
          >
            {{ user.name }}
          </span>
        </li>
        }
      </ul>

      <p *ngIf="users.length === 0" class="mt-6 text-gray-500 text-center">
        No results found.
      </p>
    </div>
    }
  `,
})
export default class HomeComponent {
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}

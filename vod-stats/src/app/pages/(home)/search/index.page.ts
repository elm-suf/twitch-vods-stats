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
    class: "layout-container flex h-full grow flex-col",
  },
  template: `
    <div class="px-4 md:px-40 flex flex-1 justify-center py-5">
      <div class="layout-content-container flex flex-col max-w-full md:max-w-[960px] flex-1">
        <h2
          class="text-white text-[18px] md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
        >
          Results for:
          <span class="text-[#FFA500] italic underline">{{ data().searchTerm }}</span>
        </h2>
        @if (data().users; as users) {
        <ul
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4"
        >
          @for (user of users; track user.id) {
          <li
            class="flex flex-col gap-3 pb-3 cursor-pointer "
            role="listitem"
            tabindex="0"
            [attr.aria-labelledby]="'user-' + user.id"
            [routerLink]="['../users', user.name]"
            #li
            (keydown.enter)="li.click()"
          >
            <div
              class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
              [style.background-image]="'url(' + user.thumbnailUrl + ')'"
            ></div>
            <div>
              <p
                class="text-white text-base font-medium leading-normal"
                id="user-{{ user.id }}"
                role="heading"
                aria-level="3"
              >
                {{ user.name }}
              </p>
            </div>
          </li>
          }
        </ul>
        }
      </div>
    </div>
  `,
})
export default class HomeComponent {
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}

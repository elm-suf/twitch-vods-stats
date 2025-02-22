import { Component, Input } from "@angular/core";

import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { SearchResponse } from "../../../../server/trpc/routers/twitch";
import { injectTrpcClient } from "../../../../trpc-client";


@Component({
  selector: "vod-stats-users",
  imports: [AsyncPipe, NgFor, NgIf, FormsModule, RouterLink],
  host: {
    class: "block p-4 min-h-screen",
  },
  template: `
    <div *ngIf="searchResults$ | async as results" class="mt-8">
      <h3
        *ngIf="results.users.length > 0"
        class="text-xl font-semibold"
        role="heading"
        aria-level="2"
      >
        Search Results
      </h3>
      <ul
        *ngIf="results.users.length > 0"
        class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <li
          *ngFor="let user of results.users"
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
      </ul>

      <p
        *ngIf="results.users.length === 0"
        class="mt-6 text-gray-500 text-center"
      >
        No results found.
      </p>
    </div>
  `,
})
export default class HomeComponent {
  private _searchTerm!: string;
  public get searchTerm(): string {
    return this._searchTerm;
  }
  @Input()
  public set searchTerm(value: string) {
    this._searchTerm = value;
    this.searchResults$ = this._trpc.twitch.search.query({ term: value });
  }
  private _trpc = injectTrpcClient();

  searchResults$?: Observable<SearchResponse>;
}

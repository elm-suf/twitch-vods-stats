import { Component } from "@angular/core";

import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { injectTrpcClient } from "../../trpc-client";
import { RouterLink } from "@angular/router";

@Component({
  selector: "vod-stats-home",
  imports: [AsyncPipe, NgFor, NgIf, FormsModule, RouterLink],
  host: {
    class: "block p-4 min-h-screen",
  },
  template: `<main
    class="flex-1 mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-gray-900"
  >
    <form
      (ngSubmit)="search(searchInput.value)"
      class="flex items-center gap-3 bg-white shadow-md rounded-full px-5 py-3 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500"
      role="search"
      aria-labelledby="search-form"
    >
      <label for="searchInput" id="search-form" class="sr-only"
        >Search Twitch</label
      >
      <input
        #searchInput
        type="text"
        placeholder="Search Twitch..."
        id="searchInput"
        name="searchInput"
        class="flex-1 bg-transparent outline-none text-lg"
        aria-label="Search Twitch channels"
      />
      <button
        type="submit"
        class="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>

    <!-- Display search results -->
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
          [routerLink]="['users', user.name]"
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
  </main> `,
})
export default class HomeComponent {
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();

  searchResults$?: Observable<any>;
  search(term: string) {
    console.debug("Searching for:", term);
    this.searchResults$ = this._trpc.twitch.search.query({ term });
  }
}

import { Component } from "@angular/core";

import { injectRouter } from "@analogjs/router";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "vod-stats-home",
  imports: [AsyncPipe, NgFor, NgIf, FormsModule, RouterLink, RouterOutlet],
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

    <router-outlet></router-outlet>
  </main> `,
})
export default class HomeComponent {
  private router = injectRouter();
  search(term: string) {
    console.debug("Searching for:", term);
    this.router.navigate(["/search"], { queryParams: { searchTerm: term } });
  }
}

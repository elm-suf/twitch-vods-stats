import { injectRouter } from "@analogjs/router";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { HeaderComponent } from "../components/header.component";
import { HomepageBannerComponent } from "../components/homepage-banner.component";

@Component({
  selector: "vod-stats-home",
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    HeaderComponent,
    HomepageBannerComponent,
  ],
  host: {
    class: "block  min-h-screen",
  },
  template: `
    <div
      class="relative flex size-full min-h-screen flex-col bg-[#1A1A1A] dark group/design-root overflow-x-hidden"
      style='font-family: "Be Vietnam Pro", "Noto Sans", sans-serif;'
    >
      <div class="layout-container flex h-full grow flex-col">
        <app-header (onSearch)="search($event)"/>

        <router-outlet #routerOutlet="outlet"></router-outlet>
        @if (!routerOutlet.isActivated) {

        <app-home-banner (onSearch)="search($event)" />
        }
      </div>
    </div>
  `,
})
export default class HomeComponent {
  readonly searchTerm$ = inject(ActivatedRoute).queryParams.pipe(
    map((params) => params["searchTerm"])
  );

  private router = injectRouter();
  search(term: string) {
    console.debug("redirect-to: /search with param", term);
    this.router.navigate(["/search"], { queryParams: { searchTerm: term } });
  }
}

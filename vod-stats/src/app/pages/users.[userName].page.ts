import { Component, Input } from "@angular/core";

import { Observable, Subject } from "rxjs";
import { injectTrpcClient } from "../../trpc-client";

@Component({
  selector: "vod-stats-users",
  imports: [],
  host: {
    class: "block p-4 min-h-screen",
  },
  template: ` USERS PAGE {{ userName }} - userName `,
})
export default class HomeComponent {
  @Input() userName!: string;
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
}

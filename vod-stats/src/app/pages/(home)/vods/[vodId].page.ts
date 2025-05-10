import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";
import { load } from "./[vodId].server";
import { injectLoad } from "@analogjs/router";
import { toSignal } from "@angular/core/rxjs-interop";
@Component({
  selector: "vod-stats-vods",
  imports: [CommonModule],
  host: {
    class: "block p-4 min-h-full",
  },
  template: `
    VOD PAGE : {{ vodId }}
    <pre>
      messages: {{ data() | json }}
    </pre
    >
  `,
})
export default class VodsPage {
  @Input() vodId!: string;
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });
}

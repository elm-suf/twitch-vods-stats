import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

@Component({
  selector: "vod-stats-vods",
  imports: [CommonModule],
  host: {
    class: "block p-4 min-h-full",
  },
  template: ` VOD PAGE : {{ vodId }} `,
})
export default class VodsPage {
  @Input() vodId!: string;
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'vod-stats-root',
  imports: [RouterOutlet],
  host: {
    class:
      'block min-h-screen',
  },
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {}

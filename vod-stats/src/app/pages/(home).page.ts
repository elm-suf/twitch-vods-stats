import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'vod-stats-home',
  
  imports: [AnalogWelcomeComponent],
  template: `
     <vod-stats-analog-welcome/>
  `,
})
export default class HomeComponent {
}

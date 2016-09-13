import { Component, Input, trigger, state, transition, style, animate } from '@angular/core';

@Component({
    selector: 'des-tip',
    template: `
    <span class="des-tip" @state='state'>{{des}}</span>
  `,
    styles: [`
    .des-tip{
      min-width: 80px;
      background: rgb(62, 62, 62);
      color: white;
      font-size: 0.5rem;
      padding: 8px;
      border-radius: 8%;
      top: 48px;
      position: absolute;
      left: -15px;
    }
  `],
  animations: [
      trigger('state', [
          state('in', style({ transform: 'translateX(0)' })),
          transition('void => *', [
              style({ transform: 'translateX(-20%)' }),
              animate(300)
          ]),
          transition('* => void', [
              animate(300, style({ transform: 'translateX(20%)' }))
          ])
      ])
  ]
})
export class DesTip {

    @Input() des: string;
    @Input() state: boolean;

    constructor() { }

}

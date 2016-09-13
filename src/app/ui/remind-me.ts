import { Component, Output, EventEmitter, trigger, state, transition, style, animate } from '@angular/core';
import {DesTip} from './des-tip';

@Component({
    selector: 'remind-me',
    directives:[
      DesTip
    ]
    ,
    styles: [`
    .color-selector {
      position: relative;
    }
    .selector {
      min-width: 100px;
      border: 1px solid lightgrey;
      padding: 5px;
      background-color: #efefef;
      position: absolute;
      top: -75px;
      left: 0;
    }
    .color {
      height: 25px;
      width: 25px;
      border-radius: 100%;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .color:hover {
      border: 1px solid darkgrey;
    }
    .icon-positiion {
      position: absolute;
      color: black;
      border: 1px solid lightgrey;
      background-color: white;
      font-size: 25px;
      top: -10px;
      left: -10px;
      width: 27px;
      height: 27px;
      border-radius: 100%;
      cursor: pointer;
    }
    .check{
      font-size:1.4rem;
    }
    .des-tip{

    }
    .icon {
      font-size: 1.4rem;
      color: grey;
      cursor: pointer;
      padding-top:10px;
    }`],
    template: `
    <div class="color-selector" (mouseenter)="toggle()" (mouseleave)="toggle()">
      <i class="material-icons icon">touch_app</i>
      <des-tip  *ngIf="isSelectorVisibile"  [state]="isSelectorVisibile" [des]='des'></des-tip>
    </div>
  `
})
export class RemindMe {
    isSelectorVisibile: boolean = false;

    des:string='提醒我';

    showSelector(value: boolean) {
        this.isSelectorVisibile = value;
    }

    toggle() {
        this.showSelector(!this.isSelectorVisibile);
    }

}

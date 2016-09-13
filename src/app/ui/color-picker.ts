import { Component, Output, EventEmitter, trigger, state, transition, style, animate } from '@angular/core';
import {DesTip} from './des-tip';

@Component({
    selector: 'color-picker',
    directives:[
      DesTip
    ]
    ,
    styles: [`
    .color-selector {
      position: relative;
    }
    .selector {
      min-width: 135px;
      border: 1px solid lightgrey;
      padding: 2px;
      background-color: #efefef;
      position: absolute;
      top: -60px;
      left: 0;
    }
    .color {
      height: 25px;
      width: 25px;
      border-radius: 100%;
      cursor: pointer;
      margin:2px;
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
      <i  class="material-icons icon">color_lens</i>
      <div *ngIf="isSelectorVisibile" @colorState="isSelectorVisibile" class="selector row center-xs">
        <div class="color" *ngFor = "let color of colors"   [ngStyle]="{'background-color':color.color}" (click)="onSelectedColor(color)">
            <i *ngIf='color.disable' class="material-icons md-12 check" >check</i>
        </div>
      </div>
      <des-tip  *ngIf="isSelectorVisibile" [state]="isSelectorVisibile" [des]='des'></des-tip>
    </div>
  `,
    animations: [
        trigger('colorState', [
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
export class ColorPicker {
    isSelectorVisibile: boolean = false;

    des:string='更改颜色';

    colors: Array<any> = [ { color: '#FFF', disable: true }, { color: '#aec6cf', disable: false },{ color: '#b19cd9', disable: false }, { color: '#ff9691', disable: false }, { color: '#77dd77', disable: false }, { color: '#f49ac2', disable: false }, { color: '#77dddd', disable: false }, { color: '#dbdd77', disable: false }];

    showSelector(value: boolean) {
        this.isSelectorVisibile = value;
    }

    @Output() selectedColor = new EventEmitter();

    onSelectedColor(color) {
        this.colors.forEach(_color => {
            _color.disable = _color == color;
        })
        this.selectedColor.next(color.color);
    }

    toggle() {
        this.showSelector(!this.isSelectorVisibile);
    }

}

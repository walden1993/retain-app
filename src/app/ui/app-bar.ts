import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector:'app-bar',
  directives:[
    ...ROUTER_DIRECTIVES
  ],
  template:`
    <header class="app-bar row middle-xs">
        <span class="logo col-xs-10" [routerLink]="['']">
          Retain
        </span>
        <nav class="col-xs-2">
            <div class="row middle-xs between-xs">
              <span class="link" [routerLink]="['','about']">About</span>
              <span class="link" (click)="signout()">Signout</span>
            </div>
        </nav>
    </header>
  `,
  styles:[
    `.app-bar{
      height: 65px;
      padding: 5px 30px;
      background-color: #00bcd4;
    }
    .logo{
      color: white;
      font-size: 30px;
      font-weight: 300;
      cursor: pointer;
    }
    .link{
      color: white;
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;
    }
`
  ]
})
export class appBar{
  constructor(private authService:AuthService){};

  signout(){
    this.authService.signout();
  }

}

import {Component} from '@angular/core';
import { appBar } from '../ui';
import { Notes } from './notes';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
   selector:'main-container',
   directives:[
     appBar,
     Notes,
     ...ROUTER_DIRECTIVES
   ],
   template:`
      <div>
          <app-bar></app-bar>
          <main class="main">
              <router-outlet></router-outlet>
          </main>
      </div>
   `,
})
export class Main {

}

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {ApiService} from './api';
import {StoreHelper} from './store-helper';
import {Store} from '../store';
import {USER_ID} from './../const';

@Injectable()
export class AuthService implements CanActivate {

    JWT_KEY: string = 'retain_token';

    setJwt(jwt: string) {
        window.localStorage.setItem(this.JWT_KEY, jwt);
        this.apiService.setHeaders({ Authorization: `${jwt}` });
    }

    constructor(private router: Router, private apiService: ApiService, private storeHelper: StoreHelper, private store: Store) {
        this.setJwt(window.localStorage.getItem(this.JWT_KEY));
    }

    isAuthorized(): boolean {
        const ratain_token = window.localStorage.getItem(this.JWT_KEY);
        return Boolean(ratain_token === 'null' ? false : true);
    }

    setUserId(userId){
      window.localStorage.setItem(USER_ID,userId);
    }

    authenticate(path, cred) {
        return this.apiService.post(`/${path}`, cred)
            .do(res =>{ this.setJwt(res.token);this.setUserId(res.data.id)})
            .do(res => this.storeHelper.update('user', res.data))
            .map(res => res.data);
    }

    signout() {
        window.localStorage.removeItem(this.JWT_KEY);
        this.store.purge();
        this.router.navigate(['', 'auth']);
    }


    canActivate(): boolean {
        const isAuth = this.isAuthorized();
        if (!isAuth) {
            this.router.navigate(['', 'auth']);
        }
        return isAuth;
    }

}

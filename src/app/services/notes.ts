import { Injectable } from '@angular/core';
import { ApiService } from './api';
import {StoreHelper} from './store-helper';
import {USER_ID} from './../const';
import 'rxjs/Rx';

@Injectable()
export class NotesService {
  path:string = "/notes";
  user_id:any;

  constructor(private apiService:ApiService,private storeHelper:StoreHelper) {
      this.user_id = window.localStorage.getItem(USER_ID);
  }

  createNotes(note){
    note = Object.assign({},note,{userId:this.user_id});
    console.log(note)
    return this.apiService.post(this.path,note)
    .do(saveNote => this.storeHelper.add('notes',saveNote));
  }

  getNotes(){
    return this.apiService.get(this.path)
    .do(res => this.storeHelper.update('notes',res.data));
  }

  completeNotes(note){
    return this.apiService.delete(`${this.path}/${note.id}`)
    .do(res => this.storeHelper.findAndDelete('notes',res.id));
  }

}

import { Component,Input } from '@angular/core';
import { NoteCard,NoteCreator } from '../ui';
import { NotesService } from '../services';
import {Store} from '../store';

@Component({
  selector:'notes-container',
  directives:[
    NoteCard,NoteCreator
  ],
  template:`
    <div class="notes row center-xs">
        <div class="creator col-xs-6">
                <note-creator (createNote)="onCreateNote($event)"></note-creator>
        </div>
        <div class="notes col-xs-8">
            <div class="row between-xs">
                <note-card [note]="note" *ngFor="let note of notes;let i = index" (checked)="onNoteChecked($event,i)"></note-card>
            </div>
        </div>
    </div>
  `,
  styles:[`
    .notes{
        padding-top:50px;
    }
    .creator{
        margin-bottom:40px;
    }
    `]
})


export class Notes{
    notes = [];

    constructor(private notesService:NotesService,private store:Store){
      this.store.changes.pluck('notes').subscribe((notes:any)=>this.notes = notes);
       this.notesService.getNotes().subscribe();
    }

    onNoteChecked(note,i){
      this.notesService.completeNotes(note).subscribe();
    }

    onCreateNote(note){
      this.notesService.createNotes(note).subscribe();
    }
}

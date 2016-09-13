import { Component, Output, EventEmitter } from '@angular/core';
import { ColorPicker } from './color-picker';
import {RemindMe} from './remind-me';

@Component({
    selector: 'note-creator',
    template: `
  <div class="note-creator shadow-2" [ngStyle]="{'background-color':newNote.color}">
      <form class="row"  (submit)="onCreateNote()">
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
          (focus)="toggle(true)"
        >
        <div class="actions col-xs-12 row between-xs" *ngIf="fullForm">
          <div class="col-xs-3 row">
              <div class="col-xs-4">
                  <remind-me></remind-me>
              </div>
              <div class="col-xs-4">
                  <color-picker (selectedColor)="onSelectedColor($event)"></color-picker>
              </div>
          </div>

          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    </div>`,
    styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
	`],
    directives: [
        ColorPicker,
        RemindMe
    ]
})

export class NoteCreator {
    newNote = {
        title: '',
        value: '',
        color: 'white'
    }

    @Output() createNote = new EventEmitter();

    fullForm: boolean = false;

    onCreateNote() {
        const {title, value, color} = this.newNote;
        if (title && value) {
            this.createNote.next({ title: title, value: value, color: color });
            this.onreset();
        }
    }

    onreset() {
        this.newNote = {
            title: '',
            value: '',
            color: 'white'
        };
        this.fullForm = false;
    }

    toggle(value: boolean) {
        this.fullForm = value;
    }

    onSelectedColor(color) {
        this.newNote.color = color;
    }
}

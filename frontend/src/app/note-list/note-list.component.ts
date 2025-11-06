import { Component } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';
import { NoteListService } from '../api-services/note-list.service';



@Component({
    selector: 'app-note-list',
    imports: [FormsModule, CommonModule, NoteComponent],
    templateUrl: './note-list.component.html',
    styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  noteList: Note[] = [];
  favFilter: "all" | "fav" = "all";
  status: "notes" | "trash" = "notes";

  constructor(private noteService: NoteListService) {
    this.noteService.fetchNotes();
  }

  getNotes(): Note[] {
    if (this.status == "notes") {
      if (this.favFilter == "fav") {
        return this.noteService.normalNotes.filter(note => note.marked);
      } else {
        return this.noteService.normalNotes;
      }
    } else {
      return this.noteService.trashNotes;
    }
  }

  changeFavFilter(filter:"all" | "fav"){
    this.favFilter = filter;
  }

  changeTrashStatus(){
    if(this.status == "trash"){
      this.status = "notes";
    } else {
      this.status = "trash";
      this.favFilter = "all";
    }
  }
} 

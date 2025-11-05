import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collection, collectionData, doc, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { list } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  firestore: Firestore = inject(Firestore);

  unsubTrash;
  unsubNotes;
  unsubSingle;

  constructor() {
    this.unsubTrash = this.subTrashList();
    this.unsubNotes = this.subNotesList();
    this.unsubSingle = onSnapshot(this.getSingleDoc("notes", "lNN9npCD4tNv41aNSyFQ"), (doc) => {
      console.log(doc);
    });
  }

  ngOnDestroy() {
    if (this.unsubTrash) {
      this.unsubTrash();
    }
    if (this.unsubNotes) {
      this.unsubNotes();
    }
    if (this.unsubSingle) {
      this.unsubSingle();
    }
  }

  subTrashList() {
    return onSnapshot(this.getTrashRef(), (list) => {
      this.trashNotes = []
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
      });
    })
  }

  subNotesList() {
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = []
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
      });
    })
  }

  setNoteObject(obj: any, id: string): Note {
    return {
      id: id,
      type: obj.type || 'note',
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,  
    };
  }

  async deleteNote(note: Note) {
    await deleteDoc(this.getSingleDoc(this.getColIdFromNote(note), note.id)).catch((error) => {
      console.error("Error deleting document: ", error);
    }).then(
      () => {console.log("Document with ID ", note.id, " deleted successfully"); }
    )
  }

  async updateNote(note: Note) {
    await updateDoc(this.getSingleDoc(this.getColIdFromNote(note), note.id), this.getCleanJson(note)).catch((error) => {
      console.error("Error updating document: ", error);
    }).then(
      () => {console.log("Document with ID ", note.id, " updated successfully"); }
    )
  }

  getCleanJson(note: Note) {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked
    };
  }

  getColIdFromNote(note: Note) {
    if (note.type === 'trash') {
      return 'trash';
    } else {
      return 'notes';
    }
  }

  async addNote(item: {}) {
    await addDoc(this.getNotesRef(), item).catch(
      (error) => {console.error("Error adding document: ", error); }
    ).then(
      (docRef) => {console.log("Document with ID ", docRef?.id, " added successfully"); }
    )
  }

  async addTrash(item: {}) {
    await addDoc(this.getTrashRef(), item).catch(
      (error) => {console.error("Error adding document: ", error); }
    ).then(
      (docRef) => {console.log("Trash with ID ", docRef?.id, " added successfully"); }
    )
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getSingleDoc(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

}

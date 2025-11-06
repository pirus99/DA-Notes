import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];
  apiUrl: string = 'http://localhost:8000/api/v1/';

  async fetchNotes() {
    this.trashNotes = [];
    this.normalNotes = [];
    try {
      const response = await fetch(`${this.apiUrl}notes/`);
      if (!response.ok) {
        throw new Error('API request failed!');
      }

      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'trash') {
          this.trashNotes.push(data[i]);
        } else {
          this.normalNotes.push(data[i]);
        }
      }
      return data;
    }
    catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }

  async addNote(note: Note) {
    note.type = 'note';
    const response = await fetch(`${this.apiUrl}notes/`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
    this.fetchNotes();
    return response.json();
  }

  async addTrash(note: Note) {
    note.type = 'trash';
    const response = await fetch(`${this.apiUrl}notes/`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
    this.fetchNotes();
    return response.json();
  }

  async updateNote(note: Note) {
    const response = await fetch(`${this.apiUrl}note/${note.id}/`, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
    this.fetchNotes();
    return response.json();
  }

  async deleteNote(note: Note) {
    const response = await fetch(`${this.apiUrl}note/${note.id}/`, {
      method: 'DELETE'
    });
    this.fetchNotes();
    return response.ok;
  }

}


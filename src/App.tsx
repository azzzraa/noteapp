import React, { useState } from 'react';
import './App.css';
import { updateConditionalTypeNode } from 'typescript';

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'note title 1', content: 'content 1' },
    { id: 2, title: 'note title 2', content: 'content 2' },
    { id: 3, title: 'note title 3', content: 'content 3' },
    { id: 4, title: 'note title 4', content: 'content 4' },
  ]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectedNote, setSelectedNote] =
  useState<Note | null> (null);

  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title)
    setContent(note.content);
  }

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
   
    

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
  };

  const handleUpdateNote = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if(!selectedNote) {
      return;
    }

    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    }

    const updateNotesList = notes.map((note) =>
      note.id === selectedNote.id
    ? updateNote 
    : note
  )

  setNotes(updateNotesList)
  setTitle("")
    setContent("")
    setSelectedNote(null);

  };

  const handleCancel = ( )=> {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  };

  const deleteNote= (
    event: React.MouseEvent,
     noteId: number) => {
      event.stopPropagation();

      const updateNotes = notes.filter(
        (note) => note.id != noteId
      )

       setNotes(updateNotes);
  };

  return (
    <div className="app-container">
      <form className="note-form" 
       onSubmit= {(event) => 
       selectedNote
       ? handleUpdateNote(event)
       : handleAddNote(event)}>
        <input
          value={title}
          onChange={(event) =>
          setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required>
          
        </textarea>

        {selectedNote ? (
          <div className='edit-buttons'>
            <button type ="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ): (
        
      
        <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={()=> handleNoteClick(note)}>
            <div className="note-header">
              <button 
              onClick={(event)=>
                deleteNote(event,note.id)
              }>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import NoteContext from "./NoteContext";
import { useContext, useState } from "react";
import AlertContext from "../AlertContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const { showAlert } = useContext(AlertContext);

  const GetNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setNotes(json)
  }

  const AddNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
    showAlert("Note added successfully", "success");
  }

  const DeleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
    showAlert("Note deleted successfully", "danger"); 
  }

  const EditNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      if (!response.ok) {
        console.error('Failed to update note:', response.statusText);
        return;
      }

      await response.json(); 

      setNotes(notes.map(note => note._id === id ? { ...note, title, description, tag } : note));
      showAlert("Note updated successfully", "success");
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, AddNote, DeleteNote, EditNote, GetNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
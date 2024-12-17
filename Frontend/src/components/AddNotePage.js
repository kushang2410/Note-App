import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/AlertContext';

const AddNotePage = () => {
  const { AddNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: '', description: '', tag: '' });
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (note.description.length < 5) {
      showAlert("Description must be at least 5 characters", "danger");
      return;
    }
    AddNote(note.title, note.description, note.tag);
    showAlert("Note added successfully", "success");
    navigate('/YourNotes');
  };
  

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container w-75 mt-5">
      <h2 className='my-5'>Add a New Note</h2>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">Title :</label>
          <input type="text" className="form-control fw-bold border-3" id="title" name="title" value={note.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">Description :</label>
          <input type="text" className="form-control fw-bold border-3" id="description" name="description" value={note.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label fw-bold">Tag :</label>
          <input type="text" className="form-control fw-bold border-3" id="tag" name="tag" value={note.tag} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-dark fw-bold mt-3">Add Note</button>
      </form>
    </div>
  );
};

export default AddNotePage;
import React, { useContext ,useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const YourNotes = () => {
  const context = useContext(noteContext);
  const { notes , GetNotes} = context;
  const navigate = useNavigate();

  const handleAddNoteClick = () => {
    navigate('/add-note'); 
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
      GetNotes()
    }else{
      navigate('/login'); 
    }
    // eslint-disable-next-line
}, [])

  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline mb-3 mt-5">
        <h2>Your Notes</h2>
        <button type="button" className="btn btn-dark fw-bold" onClick={handleAddNoteClick}>
            Add Note
        </button>
      </div>
      <div className='container row'>
        {notes.length===0 && "No Notes To Display"}
        {notes.map(note => (
            <Noteitem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};

export default YourNotes;

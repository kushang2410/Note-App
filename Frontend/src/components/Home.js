// components/Home.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';

const Home = () => {
  const { notes, GetNotes } = useContext(noteContext);
  const [recentNotes, setRecentNotes] = useState([]);
  const [loginTimestamp, setLoginTimestamp] = useState(null);

  useEffect(() => {
    const storedLoginTimestamp = localStorage.getItem('loginTimestamp');
    if (storedLoginTimestamp) {
      setLoginTimestamp(parseInt(storedLoginTimestamp, 10));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      GetNotes().then(() => {
        if (loginTimestamp) {
          const recent = notes.filter(note => new Date(note.createdAt) > new Date(loginTimestamp));
          setRecentNotes(recent);
        }
      });
    }
  }, [notes, GetNotes, loginTimestamp]);

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1>Welcome to iNotebook</h1>
        <p>Your personal digital notebook, always at your fingertips.</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Secure Notes</h5>
              <p className="card-text">Keep your notes all notes safe and secure with encryption.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Organized Categories</h5>
              <p className="card-text">Organize your notes all thenotes by category for easy access.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold">Cloud Sync</h5>
              <p className="card-text">Access your notes from anywhere with cloud synchronization.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <Link to="/add-note" className="btn btn-primary mx-2 fw-bold">Create a New Note</Link>
        <Link to="/YourNotes" className="btn btn-outline-primary mx-2 fw-bold">View All Notes</Link>
      </div>

      <div className="text-center">
        <h2>Recent Notes</h2>
        {recentNotes.length === 0 ? (
          <p>No recent notes added. Start by creating your first note!</p>
        ) : (
          <div className="row">
            {recentNotes.map(note => (
              <Noteitem key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
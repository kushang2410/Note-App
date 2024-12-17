import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import { AlertProvider } from './context/AlertContext';
import AppContent from './AppContent';

const App = () => {
  return (
    <Router>
      <AlertProvider>
        <NoteState>
          <AppContent />
        </NoteState>
      </AlertProvider>
    </Router>
  );
};

export default App;
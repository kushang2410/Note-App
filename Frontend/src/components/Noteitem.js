// import React, { useState, useContext } from 'react';
// import UpdateNotes from './UpdateNotes';
// import noteContext from '../context/notes/NoteContext';

// const Noteitem = ({ note }) => {
//   const [showUpdateModal, setShowUpdateModal] = useState(false);

//   const context = useContext(noteContext);
//   const { DeleteNote , EditNote} = context;

//   const handleEdit = () => {
//     EditNote(note.id, note.etitle, note.edescription, note.etag)
//     setShowUpdateModal(true);
//   };

//   return (
//     <div className="col-md-4">
//       <div className="card my-3">
//         <div className="card-body">
//           <h5 className="card-title">{note.title}</h5>
//           <p className="card-text">{note.description}</p>
//           <p className="card-text"><small className="text-muted">{note.tag}</small></p>
//           <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
//           <button className="btn btn-danger mx-2" onClick={() => DeleteNote(note._id)}>Delete</button>
//         </div>
//       </div>
//       {showUpdateModal && <UpdateNotes currentNote={note} closeModal={() => setShowUpdateModal(false)} />}
//     </div>
//   );
// };

// export default Noteitem;

import React, { useState, useContext } from 'react';
import UpdateNotes from './UpdateNotes';
import noteContext from '../context/notes/NoteContext';

const Noteitem = ({ note }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const context = useContext(noteContext);
  const { DeleteNote, EditNote } = context;

  const handleEdit = () => {
    setShowUpdateModal(true);
  };

  const handleSave = () => {
    EditNote(note._id, note.title, note.description, note.tag)
      .then(() => {
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error("Failed to update note:", error);
      });
  };

  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text"><small className="text-muted">{note.tag}</small></p>
          <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
          <button className="btn btn-danger mx-2" onClick={() => DeleteNote(note._id)}>Delete</button>
        </div>
      </div>
      {showUpdateModal && <UpdateNotes currentNote={note} closeModal={() => setShowUpdateModal(false)} saveNote={handleSave} />}
    </div>
  );
};

export default Noteitem;


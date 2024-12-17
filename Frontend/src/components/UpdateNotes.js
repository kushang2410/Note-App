import React, { useRef, useEffect, useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import { Modal } from 'bootstrap';
import { showOverlay, hideOverlay } from '../utils/overlayUtils';
import AlertContext from '../context/AlertContext';

const UpdateNotes = ({ currentNote, closeModal }) => {
  const { EditNote } = useContext(noteContext);
  const [note, setNote] = useState(currentNote);
  const modalRef = useRef(null);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote]);

  useEffect(() => {
    const modalElement = modalRef.current;
    const bsModal = new Modal(modalElement);
    bsModal.show();
    showOverlay();

    return () => {
      bsModal.hide();
      hideOverlay();
    };
  }, []);

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EditNote(note._id, note.title, note.description, note.tag);
    closeModal();
    hideOverlay();
    showAlert("Note updated successfully", "success");
  };

  return (
    <>
      <div ref={modalRef} className="modal fade" id="updateNoteModal" tabIndex="-1" aria-labelledby="updateNoteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { closeModal(); hideOverlay(); }}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div id="dark-overlay" className="dark-overlay"></div>
    </>
  );
};

export default UpdateNotes;
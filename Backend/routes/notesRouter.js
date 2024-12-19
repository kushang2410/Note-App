const express = require('express');
const { body } = require('express-validator');
const fetchuser = require('../middleware/FetchUser');
const { fetchAllNotes, addNote, updateNote, deleteNote } = require('../controller/notesController');
const router = express.Router();

router.get('/fetchallnotes', fetchuser,fetchAllNotes);

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
],addNote);

router.put('/updatenote/:id', fetchuser,updateNote);

router.delete('/deletenote/:id', fetchuser,deleteNote);

module.exports = router;

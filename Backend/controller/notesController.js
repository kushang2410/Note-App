const Note = require('../models/Note');
const { validationResult } = require('express-validator');

const fetchAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
};

const addNote = async (req, res) => {
    console.log("User ID from token:", req.user.id); // Log the user ID
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array()); // Log validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        console.log("Note saved:", savedNote); // Log the saved note
        res.json(savedNote);
    } catch (error) {
        console.error("Error saving note:", error.message);
        res.status(500).send("Internal Server Error");
    }
};

const updateNote = async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

const deleteNote = async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found"); }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { fetchAllNotes ,addNote ,updateNote ,deleteNote }
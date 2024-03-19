import { Router } from 'express';
import verifyToken from '../utils/authToken.js';
import Notes from '../models/notesModel.js';

const router = Router();

// Middleware for token verification
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = await verifyToken(token);
        req.userId = decoded._id; // Attach userId to request object
        next(); // Move to the next middleware
    } catch (error) {
        console.error('Error:', error);
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

// Create a new note
router.post('/', authenticate, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newNote = new Notes({ userId: req.userId, title, content });
        await newNote.save();
        return res.status(201).json({ message: 'Note created successfully.' });
    } catch (error) {
        console.error('Save Error:', error);
        return res.status(500).json({ message: 'Error saving the note.' });
    }
});

// Delete a note
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Notes.findOneAndDelete({ _id: id, userId: req.userId });
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        return res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error deleting the note.' });
    }
});

// Get a note by ID
router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Notes.findOne({ _id: id, userId: req.userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        return res.status(200).json(note);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error retrieving the note.' });
    }
});

// Update a note
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Notes.findOneAndUpdate({ _id: id, userId: req.userId }, { title, content });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }
        return res.status(200).json({ message: 'Note updated successfully.' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error updating the note.' });
    }
});

module.exports = router;

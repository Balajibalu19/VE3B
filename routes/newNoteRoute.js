import { Router } from 'express';
import verifyToken from '../utils/authToken.js';
import Notes from '../models/notesModel.js';

const router = Router();

router.post('/', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const { title, content } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        const decoded = await verifyToken(token);
        const { _id } = decoded;
        const newNote = new Notes({ userId: _id, title, content });
        await newNote.save();
        return res.status(201).json({ message: 'Note created successfully.' });
    } catch (error) {
        console.error('Save Error:', error);
        return res.status(500).json({ message: 'Error saving the note.' });
    }

});

router.delete('/:id', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const { id } = req.params;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = await verifyToken(token);
        const { _id } = decoded;

        if (!_id) {
            return res.status(401).json({ message: 'Access denied. Invalid token provided.' });
        }

        const deletedNote = await Notes.findOneAndDelete({ _id: id });

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        return res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(403).json({ message: 'Invalid token.' });
    }
});

// get router
router.get('/:id', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const { id } = req.params;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = await verifyToken(token);
        const { _id } = decoded;

        if (!_id) {
            return res.status(401).json({ message: 'Access denied. Invalid token provided.' });
        }

        const note = await Notes.findOne({ _id: id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        return res.status(200).json(note);
    } catch (error) {
        console.error('Error:', error);
        return res.status(403).json({ message: 'Invalid token.' });
    }
});

// updating newNote
router.put('/:id', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const { id } = req.params;
    const { title, content } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        const decoded = await verifyToken(token);
        const { _id } = decoded;

        if (!_id) {
            return res.status(401).json({ message: 'Access denied. Invalid token provided.' });
        }

        const updatedNote = await Notes.findOneAndUpdate({ _id: id }, { title, content });

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        return res.status(200).json({ message: 'Note updated successfully.' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(403).json({ message: 'Invalid token.' });
    }
});

export default router;

import Router from 'express';
import verifyToken from '../utils/authToken.js';
import User from '../models/userModel.js';
import Note from '../models/notesModel.js';
const router = Router();

router.get('/', async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = await verifyToken(token);
        const { _id } = decoded;

        // Check if the user exists in the database
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { username } = user;
        const Notes = await Note.find({ userId: _id });
        return res.status(200).json({ notes: Notes, username });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
});

export default router;
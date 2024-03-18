import { Router } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
const router = Router();

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // if user already exists
        const foundUserEmail = await User.findOne({ email });
        if (foundUserEmail) {
            return res.status(400).json({ message: 'User Email already exists' });
        }
        const foundUsername = await User.findOne({ username });
        if (foundUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // else hash the password and save the user
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPwd });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User signed up successfully', user: savedUser });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;
import { Router } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Respond with success message and user details
        res.status(201).json({ message: 'User signed up successfully', user: savedUser });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//export default  router;
module.exports = router;

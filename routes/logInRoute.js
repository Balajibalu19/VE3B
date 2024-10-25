import { Router } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import CreateToken from '../utils/CreateToken.js';

const router = Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    // checking if the user exists or not 
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = CreateToken(user);
    res.json({ message: 'User logged in successfully', token });

});

export default router;

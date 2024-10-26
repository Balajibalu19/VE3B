import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import express from 'express';
import serverless from 'serverless-http'; // Import serverless-http

import signupRoute from '../../routes/signupRoute.js';
import logInRoute from '../../routes/logInRoute.js';
import dashboardRoute from '../../routes/dashboardRoute.js';
import newNoteRoute from '../../routes/newNoteRoute.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(express.json());
const corsOptions = {
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],        // Specify allowed methods
    credentials: true,                                // Allow cookies if necessary
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());

// Define routes
const router = express.Router();

router.get('/', (req, res) => {
  res.send('App is running..');
});

router.get('/api', (req, res) => {
  res.send('Hello World!');
});

router.use('/api/signup', signupRoute);
router.use('/api/login', logInRoute);
router.use('/api/dashboard', dashboardRoute);
router.use('/api/newnote', newNoteRoute);

app.use('/', router);

// Export the wrapped handler for Netlify
module.exports.handler = serverless(app);
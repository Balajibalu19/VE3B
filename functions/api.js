import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import signupRoute from '../routes/signupRoute.js';
import logInRoute from '../routes/logInRoute.js';
import dashboardRoute from '../routes/dashboardRoute.js';
import newNoteRoute from '../routes/newNoteRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const express = require('express');
const serverless = require('serverless-http');
const app = express();
app.use(express.json());
app.use(cors());

app.use(cookieParser());
const router = express.Router();
router.get('/', (req, res) => {
    res.send('App is running..');
});

// Your API routes
router.get('/api', (req, res) => {
    res.send('Hello World!');
});

router.use('/api/signup', signupRoute);
router.use('/api/login', logInRoute);
router.use('/api/dashboard', dashboardRoute);
router.use('/api/newnote', newNoteRoute); // added delete for note route


app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
//const port = 8080;
//app.listen(process.env.PORT || port, () => {
//	console.log(`Listening on port ${port}`);
//});
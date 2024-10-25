// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import express from 'express';
// import serverless from 'serverless-http';
// import signupRoute from '../routes/signupRoute.js';
// import logInRoute from '../routes/logInRoute.js';
// import dashboardRoute from '../routes/dashboardRoute.js';
// import newNoteRoute from '../routes/newNoteRoute.js';

// dotenv.config();

// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB:', err));

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(cookieParser());

// const router = express.Router();

// router.get('/', (req, res, next) => {
//     res.send('App is running..');
// });

// router.get('/api', (req, res, next) => {
//     res.send('Hello World!');
// });

// router.use('/api/signup', signupRoute);
// router.use('/api/login', logInRoute);
// router.use('/api/dashboard', dashboardRoute);
// router.use('/api/newnote', newNoteRoute);

// app.use('/.netlify/functions/api', router);

// export const handler = serverless(app);



import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import express from 'express';
// Remove serverless-http if running locally
// import serverless from 'serverless-http';

import signupRoute from '../routes/signupRoute.js';
import logInRoute from '../routes/logInRoute.js';
import dashboardRoute from '../routes/dashboardRoute.js';
import newNoteRoute from '../routes/newNoteRoute.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('App is running..');
});

router.get('/api', (req, res, next) => {
  res.send('Hello World!');
});

router.use('/api/signup', signupRoute);
router.use('/api/login', logInRoute);
router.use('/api/dashboard', dashboardRoute);
router.use('/api/newnote', newNoteRoute);

app.use('/', router); // Use directly without Netlify functions

// Set the server to listen on a port (e.g., 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

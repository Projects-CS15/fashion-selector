/**
 * Imports
 * @express routing middleware framework for server-side Node.js
 * @cors middleware to allow app to access the resources not hosted on our server -- however
 * we are using webpack proxy for all requests made to /api to this server and all outbound client
 * requests are proceeded by /api
 * 
*/
const session = require('express-session'); //for session cookies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
/**
 * @v4 importing v4 function from uuid library under nickname x
 * uuidd. The v4 methods generaters a random uuid which we then
 * use to generate unique file names so that we can avoid 
 * file name collisions during DB insertions. 
*/
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3003;
const authController = require('./Controllers/authController');
const openaiImageController = require('./Controllers/openaiImageController');
const bingSearchController = require('./Controllers/bingSearchController');
const profileController = require('./Controllers/profileController');
const sessionController = require('./Controllers/sessionController');

dotenv.config();

// console.log('Supabase URL:', process.env.SUPABASE_URL); // Add logging
// console.log('Supabase Key:', process.env.SUPABASE_KEY); // Add logging
// console.log('Session Key:', process.env.SESSION_KEY); // Add logging

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sessions middleware
app.use(session({
  secret: 'Session Key', // in .env
  resave: false, // causes session to be saved back to the session store, even if it wasn't modified during the request
  saveUninitialized: false, // if there is no session, does it save it to the session store?
  cookie: { 
    secure: false, // does it have to use https? in dev it doesnt need to  
    httpOnly: true, // xss prevention starts with you
    maxAge: 24 * 60 * 60 * 1000 // 1 day lifespan
  }
}));

// Track activity and reset session timer
app.use((req, res, next) => {
  if (req.session) {
    req.session.lastActivity = Date.now();
    req.session.save(err => {
      if (err) {
        console.error(`Error saving session: ${err}`);
      } else {
        // console.log(`Session Last Activity: ${req.session.lastActivity}`);
      }
    });
  }
  next();
});

// Prompt user after 50 seconds and show countdown modal
app.use((req, res, next) => {
  const now = Date.now();
  if (req.session && req.session.lastActivity) {
    const timeSinceLastActivity = now - req.session.lastActivity;
    // console.log(`Time since last activity: ${timeSinceLastActivity} ms`);

    if (timeSinceLastActivity > 50 * 1000 && timeSinceLastActivity < 60 * 1000) {
      const secondsLeft = Math.floor((60 * 1000 - timeSinceLastActivity) / 1000);
      req.session.countdownModal = {
        show: true,
        secondsLeft
      };
      console.log(`Session Countdown Modal: ${JSON.stringify(req.session.countdownModal)}`);
      req.session.save(err => {
        if (err) {
          console.error(`Error saving session: ${err}`);
        }
      });
    }
  }
  next();
});

// Destroy session after 60 seconds of inactivity
app.use((req, res, next) => {
  const now = Date.now();
  if (req.session && req.session.lastActivity) {
    const timeSinceLastActivity = now - req.session.lastActivity;
    // console.log(`Time since last activity: ${timeSinceLastActivity} ms`);

    if (timeSinceLastActivity > 60 * 1000) { // Adjusted for quicker testing
      console.log('Session has timed out. Destroying session.');
      req.session.destroy(err => {
        if (err) {
          console.error(`Error destroying session: ${err}`);
        } else {
          return res.status(401).send('Session has timed out. Please log in again.');
        }
      });
    }
  }
  next();
});



// Routes
// SESSION STATUS
app.get('/api/session-status', sessionController.getSessionStatus);

app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

// IMAGE CREATION AND DISCOVERY
app.post('/api/generate-image', openaiImageController.ImgGenService);
app.post('/api/match-service', bingSearchController.matchService);

// ACCOUNT MANAGEMENT
// app.post('/api/upload-avatar', upload.single('avatar'), profileController.uploadAvatar);
app.get('/api/user-profile/:userId', profileController.getUserProfile);
app.post('/api/update-profile', profileController.updateProfile);


/**
 * This file exports the Express app without starting the server. This makes it reusable in tests.
 * Starting up the server with app.listen below breaks supertest - the server will now be started from a separate file, startServer.js
 */

// app.listen(PORT, () => { 
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
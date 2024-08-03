const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Controllers
const authController = require('./Controllers/authController');
const openaiImageController = require('./Controllers/openaiImageController');
const bingSearchController = require('./Controllers/bingSearchController');
const profileController = require('./Controllers/profileController');
const promptTesterController = require('./Controllers/promptTesterController');
const artPromptTesterController = require('./Controllers/artPromptTesterController');
const favoritesController = require('./Controllers/favoritesController');
const feedController = require('./Controllers/feedController');

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

// AI-Image Generation
app.post('/api/generate-image', openaiImageController.ImgGenService);

// Image Search Engine
app.post('/api/match-service', bingSearchController.matchService);

app.post('/api/generate-image/test', promptTesterController.generateImageTest);
app.post('/api/match-service/test', bingSearchController.matchService);

// Account Management
app.post('/api/upload-avatar', upload.single('avatar'), profileController.uploadAvatar);
app.get('/api/user-profile/:userId', profileController.getUserProfile);
app.post('/api/update-profile', profileController.updateProfile);

// Favorites
app.post('/api/favorite', favoritesController.favoriteMatch);
app.post('/api/favorites', favoritesController.getUserFavorites);

// Matches
app.get('/api/matches', feedController.getAllMatches);

// Art Prompt Tester
app.post('/api/generate-art-image', artPromptTesterController.generateArtImage);
app.post('/api/match-art-service', artPromptTesterController.matchArtService);
app.post('/api/favorite-art-image', favoritesController.favoriteMatch);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


/**
 * This file exports the Express app without starting the server. This makes it reusable in tests.
 * Starting up the server with app.listen below breaks supertest - the server will now be started from a separate file, startServer.js
 */

// app.listen(PORT, () => { 
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
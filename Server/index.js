const session = require('express-session');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3003;
const authController = require('./Controllers/authController');
const openaiImageController = require('./Controllers/openaiImageController');
const bingSearchController = require('./Controllers/bingSearchController');

dotenv.config();

console.log('Supabase URL:', process.env.SUPABASE_URL); // Add logging
console.log('Supabase Key:', process.env.SUPABASE_KEY); // Add logging
console.log('Session Key:', process.env.SESSION_KEY); // Add logging

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sessions middleware
app.use(session({
  secret: 'Session Key', // This is a secret key used for signing the session ID cookie. Replace 'your_secret_key' with a real secret string.
  resave: false, // This option forces the session to be saved back to the session store, even if the session was never modified during the request.
  saveUninitialized: false, // This option forces a session that is "uninitialized" to be saved to the store. Setting it to false is useful for implementing login sessions.
  cookie: { secure: false } // does it have to use https? false for dev. should be set to true for production

  // Routes
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);
app.post('/api/generate-image', openaiImageController.ImgGenService);
app.post('/api/match-service', bingSearchController.matchService);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

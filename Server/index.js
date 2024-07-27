<<<<<<< HEAD
const session = require('express-session');
=======

/**
 * Imports
 * @express routing middleware framework for server-side Node.js
 * @cors middleware to allow app to access the resources not hosted on our server -- however
 * we are using webpack proxy for all requests made to /api to this server and all outbound client
 * requests are proceeded by /api
 * 
 */
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca
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

dotenv.config();

<<<<<<< HEAD
console.log('Supabase URL:', process.env.SUPABASE_URL); // Add logging
console.log('Supabase Key:', process.env.SUPABASE_KEY); // Add logging
console.log('Session Key:', process.env.SESSION_KEY); // Add logging
=======
console.log('Supabase URL:', process.env.SUPABASE_URL); 
console.log('Supabase Key:', process.env.SUPABASE_KEY);
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

<<<<<<< HEAD
//sessions middleware
app.use(session({
  secret: 'Session Key', // This is a secret key used for signing the session ID cookie. Replace 'your_secret_key' with a real secret string.
  resave: false, // This option forces the session to be saved back to the session store, even if the session was never modified during the request.
  saveUninitialized: false, // This option forces a session that is "uninitialized" to be saved to the store. Setting it to false is useful for implementing login sessions.
  cookie: { secure: false } // does it have to use https? false for dev. should be set to true for production

  // Routes
=======
const upload = multer({ storage: multer.memoryStorage() });


//ACCOUNT MANAGEMENT
/**
 * upload.single is part of mutter middleware library and
 * is a method is w/ with the name of the file input field in the
 * HTML form it came from as an arg. Then, it processes 
 * the incoming file upload and make the file avail
 * in the req.file object (like express but for binary data with 
 * the content-typoe 'multipart/form-data'
 */
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

// IMAGE CREATION AND DISCOVERY
app.post('/api/generate-image', openaiImageController.ImgGenService);
app.post('/api/match-service', bingSearchController.matchService);

// ACCOUNT MANAGEMENT
app.post('/api/upload-avatar', upload.single('avatar'), profileController.uploadAvatar);
app.get('/api/user-profile/:userId', profileController.getUserProfile);
app.post('/api/update-profile', profileController.updateProfile);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3003;
const authController = require('./Controllers/authController');
const openaiImageController = require('./Controllers/openaiImageController');
const bingSearchController = require('./Controllers/bingSearchController');
const profileController = require('./Controllers/profileController');

dotenv.config();

console.log('Supabase URL:', process.env.SUPABASE_URL); 
console.log('Supabase Key:', process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// AUTHENTICATION
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

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

console.log('Supabase URL:', process.env.SUPABASE_URL); 
console.log('Supabase Key:', process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Account Management
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

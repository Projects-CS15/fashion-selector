const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = 3003;
const authController = require('./Controllers/authController');
const openaiImageController = require('./Controllers/openaiImageController');
const bingSearchController = require('./Controllers/bingSearchController');

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);
app.post('/api/generate-image', openaiImageController.ImgGenService);
app.post('/api/match-service', bingSearchController.matchService);
app.

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

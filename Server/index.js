const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3003;
const authController = require('./Controllers/authController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.post('/api/signup', authController.signup);
app.post('/api/login', authController.login);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

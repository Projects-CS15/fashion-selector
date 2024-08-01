// This file imports the app and starts the server. This can be used in a non-test environment to run the server.

const app = require('./index.js');
const http = require('http');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
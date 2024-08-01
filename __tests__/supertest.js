const request = require('supertest');
const path = require('path');
const PORT = process.env.PORT;
const server1 = `http://localhost:${PORT}`;
const app = require('../Server/index.js');
const http = require('http');

describe('Route integration', () => {
  let server;

  beforeAll((done) => {
    // starts new HTTP server instance before all tests
    server = http.createServer(app);
    server.listen(PORT, done);
  });

  afterAll((done) => {
    // closing the server after all tests, ensuring server properly shuts down to avoid open handle issues
    server.close(done);
  });

  describe('/api', () => {
    describe('/session-status', () => {
      describe('GET', () => {
  
      });
    });
    
    describe('/login', () => {
      describe('POST', () => {
        it('allows user to log in properly', async () => {
          await request(app)
            .post('/api/login')
            .send(
              {email: "austinbfraser@gmail.com", password: "codesmith"}
            )
            .expect(200)
        });
      });
    });
  
    describe('/signup', () => {
      describe('POST', () => {
      
      });
    });
  
    describe('/generate-image', () => {
      describe('POST', () => {
  
      });
    });

    describe('/match-service', () => {
      describe('POST', () => {
  
      });
    });

    describe('/user-profile', () => {
      describe('GET', () => {
  
      });
    });

    describe('/update-profile', () => {
      describe('POST', () => {
  
      });
    });

    describe('/update-profile', () => {
      describe('POST', () => {
  
      });
    });

  })
});
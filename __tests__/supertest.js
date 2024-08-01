const request = require('supertest');
const path = require('path');
const PORT = process.env.PORT;
const server = `http://localhost:${PORT}`;

describe('Route integration', () => {
  describe('/api', () => {
    describe('/session-status', () => {
      describe('GET', () => {
  
      });
    });
    
    describe('/login', () => {
      describe('POST', () => {
        it('allows user to log in properly', async () => {
          await request(server)
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
const request = require('supertest');
const path = require('path');
const PORT = process.env.PORT;
const server1 = `http://localhost:${PORT}`;
const app = require('../Server/index.js');
const http = require('http');
const supabase = require('../supabase');

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

        it('responds with a 200 when passed valid credentials', async () => {
          await request(app)
            .post('/api/login')
            .send(
              {email: "austinbfraser@gmail.com", password: "codesmith"}
            )
            .expect('Content-Type', /application\/json/)
            .expect(200)
        });

        it('responds with a 400 and an error when passed an incorrect password per email', async () => {
          await request(app)
            .post('/api/login')
            .send(
              {email: "austinbfraser@gmail.com", password: "codesmithZZZ"}
            )
            .expect('Content-Type', /application\/json/)
            .expect(400)
            .expect((error) => error)
        });
      
        it('responds with a 400 and an error when passed in blank credentials', async () => {
          await request(app)
            .post('/api/login')
            .send(
              {email: "", password: ""}
            )
            .expect('Content-Type', /application\/json/)
            .expect(400)
            .expect((error) => error)
        });
        
        it('responds with a 400 and an error when missing email', async () => {
          await request(app)
            .post('/api/login')
            .send(
              {password: "codesmith"}
            )
            .expect('Content-Type', /application\/json/)
            .expect(400)
            .expect((error) => error)
        });
        
        it('responds with a 400 and an error when missing password', async () => {
          await request(app)
            .post('/api/login')
            .send(
              {email: "austinbfraser@gmail.com"}
            )
            .expect('Content-Type', /application\/json/)
            .expect(400)
            .expect((error) => error)
        });

      });
    });
  
    describe('/signup', () => {
      describe('POST', () => {
      
        /**
         * after creating a test user, delete it:
         * 
         * const deleteUser = await supabase
            .from('profiles')
            .delete()
            .eq('id', [ **the ID of the created test user** ]);
            console.log(`test user ${theDeletedId} deleted`);
         * 
         */
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
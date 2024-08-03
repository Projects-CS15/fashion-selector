const request = require('supertest');
const path = require('path');
const PORT = process.env.PORT;
const server1 = `http://localhost:${PORT}`;
const app = require('../Server/index.js');
const http = require('http');
const supabase = require('../Server/supabase.js');
const axios = require('axios'); //axios is a popular JavaScript library used to make HTTP requests from both the browser and Node.js. It provides a simple API for making asynchronous requests to interact with RESTful APIs or any other web services.

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
  
    xdescribe('/signup', () => {
      describe('POST', () => {

        let cleanupFlag = false;
        
        it('responds with a 200 when passed valid credentials at signup', async () => {
          cleanupFlag = true;
          
          await request(app)
            .post('/api/signup')
            .send(
              {
                email: "testuser87654@gmail.com", 
                password: "codesmith", 
                firstName: "Test", 
                lastName: "User87654"
              }
            )
            .expect('Content-Type', /application\/json/)
            .expect(200)
        });

        // afterAll(async () => {
        //   if (cleanupFlag) {
        //     const deleteUser = await supabase
        //     .from('profiles')
        //     .delete()
        //     // .eq('id', [ **the ID of the created test user** ]);
        //     // console.log(`test user ${theDeletedId} deleted`);
        //   };
        // });
      });
    });
  
    xdescribe('/generate-image', () => {
      describe('POST', () => {
        it('should respond with an image_url when given valid input', async () => {
          const response = await request(app)
          .post('/generate-image')
          .send({
            item:'chair',
            color: 'red',
            style: 'modern',
            features: 'leather upholstery',
          });
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('image_url');
          expect(response.body.image_url).toMatch(/^https?:\/\//); // basic URL validation
        })
        it('should respond with a 400 status code when a required field is missing', async ()=>{
          const response = await request(app)
          .post('/generate-image')
          .send({
            item:'chair',
            color:'red',
            style: 'modern',
          });
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('error', 'Item, color, style or feature is missing.')
        });
        it('should respond with a 500 status code when ther is an error with the OpenAI API', async () => {
        jest.spyOn(axios, 'post').mockImplementationOnce(()=>
          Promise.reject(new Error('OpenAI API error'))
        );
        const response = await request(app)
        .post('/generate-image')
        .send({
          item: 'chair',
          color: 'red',
          style: 'modern',
          features: 'leather upholstery',
        });
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'An error occured on Dall E Image generator.')

        axios.post.mockRestore(); // Restore original implementation
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

  })
  })
});
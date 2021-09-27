const request = require('supertest');


const app = require('../app');
// describe("getting started with JEST", () => {
//    // we need to use request.agent so that we can create and
//     // use sessions
//     let agent = request.agent(app);

//     // store cookie returned by our app. 
//     // If the API server returns a token instead, we will 
//     // store the token
//     let cookie = null;


//     // These types of functions are called to 'setup' or
//     // 'tear down' functions. In this example, we are
//     // using the beforeAll function to create a request
//     // agent that is authenticated and can be used by all
//     // tests within  this suite. 
//     beforeAll(() => agent
//         // send a POST request to login
//         .post('/user/login') 
//         // IMPORTANT: without the content type setting your request
//         // will be ignored by express
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         // send the username and password
//         .send({
//           email: 'cust1@test.com',
//           password: '123456',
//         })
//         // when we get back the cookie, store it in a variable.
//         // If the API server returns a token store it here instead
//         // of the cookie
//         .then((res) => {
//             cookie = res
//                .headers['set-cookie'][0]
//                .split(',')
//                .map(item => item.split(';')[0])
//                .join(';')
//          }));
//   }); 
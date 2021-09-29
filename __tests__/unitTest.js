const mongoose = require('mongoose')

// we are going to test the getOneFood from the food controller 
const userController = require("../controllers/userControllers")
const UserModel = require("../models/userModels");
const User = UserModel.User

describe("Unit testing getOneFood from foodController.js", () => {

    // mocking the request object. The controller function expects 
    // that at least the request object will have an 'id' params, and
    // isAuthenticated() function.
    // we create a mocking function using jest.fn(), and we can
    // return a mock value for the mock function as well.
    // see: https://jestjs.io/docs/mock-functions
    const req = {
        // searching for Apple in my database
        user: {_id:"61458edafd0bfd2b4098d34f"},
        // assuming that the user is logged in
        // isAuthenticated: jest.fn().mockReturnValue('True')
    };

    // response object should have at least a render method
    // so that the controller can render the view
    const res = {
        render: jest.fn(),
        json: jest.fn()
    };

    // the setup function does a few things before
    // any test is run
    beforeAll(() => {
        // clear the render method (also read about mockReset)
        res.render.mockClear();
        res.json.mockClear();

        // I'm going to mock the findOne Mongoose method
        // to return some of the details of the object
        // that I'm searching, i.e. Apple. Note that 
        // our DB has more details, but I'm just mocking
        // the details to test the controller

        User.find = jest.fn().mockResolvedValue([{
            _id: '61458edafd0bfd2b4098d34f',
            firstName:"Vincent",
            lastName:"Gestio",
            __v: 0
        }]);
        User.find.mockImplementationOnce(()=> ({
            lean: jest.fn().mockReturnValue([{
                _id: '61458edafd0bfd2b4098d34f',
                firstName:"Vincent",
                lastName:"Gestio",
                __v: 0
        }])
    }))
        // We are using the lean() method, so need to 
        // mock that as well. I'm mocking the function
        // to return Plain Old JavaScript Object (POJO)
        // And, we call the getOneFood with the mocked
        // request and response objects!
        userController.getUserProfile(req, res);
      });

    // This demo has only one test with a valid food ID 
    test("Test case 1: testing with existing food id \
        60741060d14008bd0efff9d5, expecting details of Apple", () => {
        // when I run the controller, I expect that the render method will
        // be called exactly once        
        expect(res.json).toHaveBeenCalledTimes(1);
        // and because I'm looking up a food that I expect to be in my
        // database, the controller should render the page and not
        // return an error message!
        expect(res.json).toHaveBeenCalledWith([{"__v": 0, "_id": "61458edafd0bfd2b4098d34f", "firstName": "Vincent", "lastName": "Gestio"}]);
    });
  });
const mongoose = require('mongoose')

// we are going to test the getOneFood from the food controller 
const userController = require("../controllers/userControllers")
const UserModel = require("../models/userModels");
const User = UserModel.User

describe("Unit testing getOneFood from foodController.js", () => {

    const req = {
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
        userController.getUserProfile(req, res);
      });

    // This demo has only one test with a valid food ID 
    test("Test case 1: testing with existing food id \
        60741060d14008bd0efff9d5, expecting details of Apple", () => {    
        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith([{"__v": 0, "_id": "61458edafd0bfd2b4098d34f", "firstName": "Vincent", "lastName": "Gestio"}]);
    });
  });
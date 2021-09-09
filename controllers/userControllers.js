const UserModel = require("../models/userModels");
const User = UserModel.User;

//Controller 1
const testingAddUsers = async (req, res) => {
    var newUser = new User();
    newUser.firstName = "Vincent";
    newUser.lastName = "Gestio";
    newUser.email = "cust1@test.com";
    newUser.password = "123456";
    newUser.phoneNo = "12345678";
    newUser.save();
    console.log(newUser);
}

//Controller 2


module.exports = {
    testingAddUsers,
};
const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  // returns a user {id:4, name:"jim", email:"jim123@gmail.com", password:"jim123"}
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};


const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};



const getUserByEmail = (email) => {
  let user = userModel.findByEmail(email);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};

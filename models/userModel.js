// const database = [
//   {
//     id: 1,
//     name: "Jimmy Smith",
//     email: "jimmy123@gmail.com",
//     password: "jimmy123!",
//   },
//   {
//     id: 2,
//     name: "Johnny Doe",
//     email: "johnny123@gmail.com",
//     password: "johnny123!",
//   },
//   {
//     id: 3,
//     name: "Jonathan Chen",
//     email: "jonathan123@gmail.com",
//     password: "jonathan123!",
//   },
// ];

const database = require("../userAuthDatabase")


const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findByEmail: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
};

module.exports = userModel;
// module.exports = { database, userModel };

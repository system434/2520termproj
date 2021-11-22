const database = require("../database")

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByIdGithub: (id, profile) => {
    let user = database.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      database.push(
        {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          role: "user",
          reminders: []
        }
      )
      let user = database.find((user) => user.id === id);
      return user
    }
  },
};

module.exports = { database, userModel };

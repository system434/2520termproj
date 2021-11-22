let database = require("../database");
const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res);
  },

  registerSubmit: (req, res) => {
    for (let i =0;i<database.length;i++){
      let user = database[i];
      if (user.email == req.body.email) {
        res.send("user already exists");
      }
      else{
        let user = {
          id: 69,
          name: "",
          role: "user",
          email: req.body.email,
          password: req.body.password,
          reminders: []
        }
        database.push(user);
        res.render("auth/login");
        break;
      }
    }

  },
};



module.exports = authController;

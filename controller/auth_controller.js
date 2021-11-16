let database = require("../database");
const passport = require("../middleware/passport");
let UserAuthDatabase = require("../userAuthDatabase");




let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    console.log(req.body);
    passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
    })
  },

  registerSubmit: (req, res) => {
    // implement
    console.log(req.body);
    for (let i =0;i<UserAuthDatabase.length;i++){
      let user = UserAuthDatabase[i];
      if (user.email == req.body.email) {
        res.send("user already exists");
      }
      else{
        let user = {email:req.body.email,password:req.body.password};
        UserAuthDatabase.push(user);
        console.log(UserAuthDatabase);
        res.render("auth/login");
        break;
      }
    }

  },
};

module.exports = authController;

let database = require("../database");
const passport = require("../middleware/passport");
const fetch = require("node-fetch");


// picGen works but register user doesn't that's why I kept the console.log()
const picGen = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_ID}`)
    const jsonData =  await response.json()
    console.log(jsonData.urls.regular)
    return jsonData.urls.regular
  } catch (err) {
    console.log(err)
  }
}

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

  // Doesn't actually work, I remember you said it didn't have to at one point, and I don't know if that was because we later get prisma or because it just didn't need to work for that week. Added async cause it'll be used for randPic later.
  registerSubmit: async (req, res) => {
    try{
    randPic = await picGen()
    console.log(database)
    console.log(randPic)
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
          pic: randPic,
          reminders: []
        }
        console.log(user)
        database.push(user);
        console.log(database)
        res.render("auth/login");
        break;
      }
    }
  } catch (err) {
    console.log("Dummy did a dum thing")
  }
  },
};



module.exports = authController;

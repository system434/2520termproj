const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const userController = require("../controller/userController");
require("dotenv").config()
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const githubLogin = new GitHubStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    let user = userController.getUserByGitHubIdOrCreate(profile)
    return done(null, user)
  }
)

module.exports = passport.use(localLogin);
module.exports = passport.use(githubLogin);

const express = require("express");
const passport = require("../middleware/passport");
const authController = require("../controller/auth_controller");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));
router.get("/register", forwardAuthenticated, (req, res) => res.render("auth/register"));
router.get("/github", passport.authenticate("github"))

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/reminders');
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.post(
  "/register",
  authController.registerSubmit
);


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
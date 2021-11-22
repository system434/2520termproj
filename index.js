const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const passport = require("./middleware/passport");

const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const adminRoute = require("./routes/adminRoute");



app.set("view engine", "ejs");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.json())
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  next();
});

// Routes start here

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use(express.static(path.join(__dirname, "public")));


app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});

const express = require("express");
const cors = require("cors");

const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const router = require("./router");
const { getUserByEmail, getUserById } = require("./models/models");

const { userRegistration } = require("./controllers/controllers");

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    secure: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    return getUserByEmail(username, password, done);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id);
  if (user) done(null, user);
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("login req user");
  console.log(req.user);
  res.send(req.user);
});

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return "";
  });
  return res.send("user logged out");
});

app.post("/register", userRegistration);

app.use(router);

// ready to export
module.exports = app;

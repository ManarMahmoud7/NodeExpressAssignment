const express = require("express");
const debug = require("debug")("app:authRouter");
const passport = require("passport");
const mongoRepo = require("../data/mongoRepository");

const authRouter = express.Router();

authRouter
  .route("/register")
  .get(async (req, res) => {
    res.render("register");
  })
  .post(async (req, res) => {
    const { username, password, email } = req.body;
    const user = await mongoRepo.addUser(username, password, email);
    console.log("Add User response",user)
    if (user) {
      req.login(user, () => {
        res.redirect("/products");
      });
    } else {
      res.send("User can't sign up at this time, please try again later");
    }
  });

authRouter
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/products",
      failureRedirect: "/auth/register",
    })
  );

module.exports = authRouter;

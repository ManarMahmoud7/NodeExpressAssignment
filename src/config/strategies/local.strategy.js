const passport = require("passport");
const { Strategy } = require("passport-local");
const debug = require("debug")("app:localStrategy");
const mongoRepo = require("../../data/mongoRepository");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          var user = await mongoRepo.getUserByUserName(username);
          console.log("validateUser", user);
          if (user && user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (error) {
          console.log("authenticate error ", error);
          done(error, false);
        }
      })
  );
};

var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");


const saltRounds = 10;
const bcrypt = require("bcrypt");

/* GET users listing. */
router.route("/signup")
  .get(isLoggedOut ,(req, res)  => {
    res.render("auth/signup")
  })
  .post((req, res) => {
    const {
      username,
      email,
      password,
      profilePic,
      description,
      memes
    } = req.body

    if (!email || !username) {
      return res
        .status(400)
        .render("auth/signup", {
          errorMessage: "All fileds are mandatory, don't be lazy"
        });
    };

    if (password.length < 4) {
      return res.status(400).render("auth/signup", {
        errorMessage: "Your password needs to be at least 8 characters long.",
      });
    };

    User.findOne({
      email
    }).then((found) => {
      // If the user is found, send the message email is taken
      if (found) {
        return res
          .status(400)
          .render("auth.signup", {
            errorMessage: "Email already taken."
          });
      }
      return bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          // Create a user and save it in the database
          return User.create({
            username,
            email,
            password: hashedPassword,
            profilePic,
            description,
            memes
          });
        })
        .then((user) => {
          // Bind the user to the session object
          req.session.user = user;
          req.session.userId = user._id;
          res.redirect("/");
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            return res
              .status(400)
              .render("auth/signup", {
                errorMessage: error.message
              });
          }
          if (error.code === 11000) {
            return res.status(400).render("auth/signup", {
              errorMessage: "Email need to be unique. The email you chose is already in use.",
            });
          }
          return res
            .status(500)
            .render("auth/signup", {
              errorMessage: error.message
            });
        });
    });
  });

//----LOGIN----\\
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login", {
    loggedout: true
  });
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  if (!username) {
    return res
      .status(400)
      .render("auth/login", {
        errorMessage: "Please provide your username."
      });
  };
    // Search the database for a user with the email submitted in the form
    User.findOne({ username })
    .then((username) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!username) {
        return res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
      }

      // If user is found based on the email, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, username.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res
            .status(400)
            .render("auth/login", { errorMessage: "Wrong credentials." });
        }
        req.session.username = username;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        //console.log(req.session)
        return res.redirect("/");
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});



//----LOGOUT----\\
router.get("/logout", isLoggedIn, (req, res) => {
  console.log("THERE IS SESSION")
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("../logout", { errorMessage: err.message });
    }
    console.log(req.session);
    res.redirect("/");
  });
});

module.exports = router
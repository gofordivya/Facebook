const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  if (req.body.email !== "") {
    next();
  } else {
    console.log("error, email cannot be empty");
  }
};

const isLoggedInUser = (req, res, next) => {
  if (req.cookies.isLoggedIn === "true") {
    jwt.verify(req.cookies.jwt, "jwt user detail", function (err, decoded) {
      if (err) {
        console.log(err);
        res.render("signin");
      } else {
        req.userDetail = JSON.parse(decoded.userDetail);
        next();
      }
    });
  } else {
    res.render("signin");
  }
};

const isLoggedOutUser = (req, res, next) => {
  if (!req.cookies.isLoggedIn) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = {
  isAuth,
  isLoggedInUser,
  isLoggedOutUser,
};

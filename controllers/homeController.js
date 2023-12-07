const { Post } = require("../models/post");
const { UserModel } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getHomepage = (req, res) => {
  const userDetail = req.userDetail;
  console.log(userDetail);
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("home", { result, userDetail, err: null }))
    .catch((err) =>
      res.render("home", { result: [], userDetail, err: err.errors })
    );
};

const submitPost = (req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => res.render("home", { result: [], err: err.errors }));
};

const findPost = (req, res) => {
  Post.findById({ _id: req.params.id })
    .then((result) => res.render("editpost", { result }))
    .catch((err) => console.log("error: ", err));
};

const updatePost = (req, res) => {
  Post.findByIdAndUpdate({ _id: req.params.id })
    .then((result) => {
      result.content = req.body.content;
      result
        .save()
        .then(() => res.redirect("/"))
        .catch((err) =>
          res.render("editPost", { result: [], err: err.errors })
        );
    })
    .catch((err) => console.log(err));
};

const deletePost = (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

const submitComment = (req, res) => {
  Post.findById({ _id: req.params.id })
    .then((result) => {
      result.comment.push(req.body.comment);
      result
        .save()
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const loadSignUpPage = (req, res) => {
  res.render("signup");
};

const loadSignInPage = (req, res) => {
  res.render("signin");
};

const createAccount = (req, res) => {
  if (!req.body.userName || !req.body.password || !req.body.email) {
    console.error("Please fill all fields");
  } else {
    let hashedPass = bcrypt.hashSync(req.body.password, 12);
    let userObj = {
      ...req.body,
      password: hashedPass,
    };
    let newUser = new UserModel(userObj);
    newUser
      .save()
      .then(() => {
        res.render("signin");
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
};

const userLogin = async (req, res) => {
  console.log("userlogin.....");
  let userDetail = await UserModel.findOne({ email: req.body.email });
  if (userDetail) {
    let password = await bcrypt.compareSync(
      req.body.password,
      userDetail.password
    );
    if (password) {
      const jwtToken = jwt.sign(
        { userDetail: JSON.stringify(userDetail) },
        "jwt user detail"
      );
      res.cookie("isLoggedIn", true);
      res.cookie("jwt", jwtToken);
      res.redirect("/");
    } else {
      console.log("error....");
    }
  }
};

const logout = async (req, res) => {
  res.cookie("isLoggedIn", false);
  res.render("signin");
};

module.exports = {
  getHomepage,
  submitPost,
  findPost,
  updatePost,
  deletePost,
  submitComment,
  loadSignUpPage,
  loadSignInPage,
  createAccount,
  userLogin,
  logout,
};

const { Post } = require("../models/post");

const getHomepage = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("home", { result, err: null }))
    .catch((err) => res.render("home", { result: [], err: err.errors }));
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

module.exports = {
  getHomepage,
  submitPost,
  findPost,
  updatePost,
  deletePost,
  submitComment,
  loadSignUpPage,
  loadSignInPage,
};

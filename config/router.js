const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const auth = require("../middleware/auth");

router.post("/submit-post", homeController.submitPost);

router.get("/", auth.isLoggedInUser, homeController.getHomepage);
router.get("/home", auth.isLoggedInUser, homeController.getHomepage);

router.get("/edit-post/:id", auth.isLoggedInUser, homeController.findPost);
router.post("/update-post/:id", homeController.updatePost);
router.get("/delete-post/:id", homeController.deletePost);
router.post("/submit-comment/:id", homeController.submitComment);

router.get("/sign-up", homeController.loadSignUpPage);
router.get("/sign-in", auth.isLoggedOutUser, homeController.loadSignInPage);
router.post("/create-account", homeController.createAccount);
router.post("/user-login", homeController.userLogin);
router.get("/logout", homeController.logout);

module.exports = router;

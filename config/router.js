const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.post("/submit-post", homeController.submitPost);

router.get("/", homeController.getHomepage);

router.get("/edit-post/:id", homeController.findPost);
router.post("/update-post/:id", homeController.updatePost);
router.get("/delete-post/:id", homeController.deletePost);
router.post("/submit-comment/:id", homeController.submitComment);

module.exports = router;

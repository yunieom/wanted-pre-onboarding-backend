const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { loginRequired, checkAuthor } = require("../middlewares/auth");

router.post("/", loginRequired, postController.createPost);

router.get("/all", postController.readAllPosts);

router.get("/:postId", postController.readPost);

router.patch(
  "/:postId/update",
  loginRequired,
  checkAuthor,
  postController.updatePost
);

router.delete(
  "/:postId/delete",
  loginRequired,
  checkAuthor,
  postController.deletePost
);

module.exports = router;

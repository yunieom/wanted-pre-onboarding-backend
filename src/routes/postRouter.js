const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { loginRequired, checkAuthor } = require("../middlewares/auth");

// 게시글생성
router.post("/", loginRequired, postController.createPost);
// 게시글수정
router.patch("/:postId", loginRequired, checkAuthor, postController.updatePost);

module.exports = router;

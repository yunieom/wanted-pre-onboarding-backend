const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { loginRequired, checkAuthor } = require("../middlewares/auth");

// 게시물 생성
router.post("/", loginRequired, postController.createPost);

// 게시물 조회
router.get("/:postId", loginRequired, postController.readPost);

// 게시물 수정
router.patch("/:postId", loginRequired, checkAuthor, postController.updatePost);

// 게시물 삭제
router.delete(
  "/:postId",
  loginRequired,
  checkAuthor,
  postController.deletePost
);

module.exports = router;

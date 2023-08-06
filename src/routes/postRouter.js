const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { loginRequired, checkAuthor } = require("../middlewares/auth");

// 게시물 생성
router.post("/", loginRequired, postController.createPost);

// 전체 게시물 조회
router.get("/all", postController.readAllPosts);

// 게시물 조회
router.get("/:postId", postController.readPost);

// 게시물 수정
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

const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { loginRequired, checkAuthor } = require("../middlewares/auth");

// 게시글생성
router.post("/posts", loginRequired, postController.createPost);

module.exports = router;

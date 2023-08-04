const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입
router.post("/register", userController.register);

// 로그인
router.post("/login", userController.login);

module.exports = router;

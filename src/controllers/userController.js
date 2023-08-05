const userService = require("../services/userService");

const userController = {
  async register(req, res, next) {
    try {
      const userId = await userService.register(req);
      res.status(201).json({ success: true, userId });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      // 로그인 서비스 호출
      const token = await userService.login(req);

      // 로그인 성공시 응답
      res.cookie("wanted_token", token, {
        path: "/",
        domain: process.env.COOKIE_DOMAIN,
        // httpOnly: true,
        // secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000, // 1 hour
      });
      res.status(200).json({ success: true, token });
    } catch (error) {
      // 로그인 실패 등 오류 발생시 에러 처리
      next(error);
    }
  },
};

module.exports = userController;

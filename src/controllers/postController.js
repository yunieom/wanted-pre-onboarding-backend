const postService = require("../services/postService");

const postController = {
  //게시물생성
  async createPost(req, res, next) {
    try {
      const postId = await postService.createPost(req);
      res.status(201).json({ success: "게시물이 등록되었습니다.", postId });
    } catch (error) {
      next(error);
    }
  },

  //게시물수정
  async updatePost(req, res, next) {
    try {
      const postId = await postService.updatePost(req);
      res
        .status(201)
        .json({ success: "게시물 수정이 완료되었습니다.", postId });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;

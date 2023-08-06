const postService = require("../services/postService");

const postController = {
  // 게시물 생성
  async createPost(req, res, next) {
    try {
      const postId = await postService.createPost(req);
      res.status(201).json({ success: "게시물이 등록되었습니다.", postId });
    } catch (error) {
      next(error);
    }
  },

  // 전체 게시물 조회
  async readAllPosts(req, res, next) {
    try {
      const posts = await postService.readAllPosts(req);
      res.status(200).json({ success: "게시물 조회에 성공했습니다.", posts });
    } catch (error) {
      next(error);
    }
  },

  // 게시물 조회
  async readPost(req, res, next) {
    try {
      const post = await postService.readPost(req);
      res.status(200).json({ success: "게시물 조회에 성공했습니다.", post });
    } catch (error) {
      next(error);
    }
  },

  // 게시물 수정
  async updatePost(req, res, next) {
    try {
      res.status(201).json({ success: "게시물 수정이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  },

  // 게시물 삭제
  async deletePost(req, res, next) {
    try {
      res.status(200).json({ success: "게시물 삭제가 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;

const postService = require("../services/postService");

const postController = {
  async createPost(req, res, next) {
    try {
      const postId = await postService.createPost(req);
      res.status(201).json({ success: true, postId });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;

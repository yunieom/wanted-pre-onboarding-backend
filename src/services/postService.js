const connectToDatabase = require("../db/db");
const fs = require("fs-extra");

class PostController {
  // 게시물 생성
  async createPost(req, res) {
    const { title, content, email } = req.body;

    if (!title || !content) {
      throw new Error("제목과 내용은 필수 입력 항목입니다.");
    }

    try {
      // 데이터베이스 연결
      const db = await connectToDatabase();

      // 게시글 생성 쿼리 실행
      const [result] = await db
        .promise()
        .query("INSERT INTO posts (title, content, email) VALUES (?, ?, ?)", [
          title,
          content,
          email,
        ]);

      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // 게시물 수정
  async updatePost(req, res) {
    const { title, content } = req.body;
    const postId = req.param.postId;
    console.log(postId);

    try {
      // 데이터베이스 연결
      const db = await connectToDatabase();

      // 게시물 조회
      const [posts] = await db
        .promise()
        .query("SELECT * FROM posts WHERE post_id = ?", [postId]);
      const post = posts[0];

      // 게시물이 존재하지 않을 경우
      if (!post) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }

      // 게시글 수정 시간
      const updatedAt = new Date().toString();

      // 게시물의 제목과 내용을 업데이트
      await db
        .promise()
        .query("UPDATE posts SET title = ?, content = ? WHERE post_id = ?", [
          title,
          content,
          postId,
        ]);

      return true; // 수정 성공
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostController();

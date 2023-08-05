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

      // 게시글 생성 시간
      const createdAt = new Date().toString();

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
}

module.exports = new PostController();

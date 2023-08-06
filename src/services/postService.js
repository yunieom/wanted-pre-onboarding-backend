const connectToDatabase = require("../db/db");

class PostService {
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

  // 전체 게시물 조회
  async readAllPosts(req, res) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    try {
      // 데이터베이스 연결
      const db = await connectToDatabase();

      // 전체 게시물 목록 조회 쿼리
      const query = "SELECT * FROM posts ORDER BY post_id ASC LIMIT ? OFFSET ?";
      const [rows] = await db
        .promise()
        .query(query, [pageSize, (page - 1) * pageSize]);

      // 시간 변환 처리
      const posts = rows.map((row) => {
        const post = { ...row };

        // 데이터베이스에 저장된 UTC 시간을 아시아 서울시간으로 변환
        const created_at = new Date(row.created_at);
        const updated_at = new Date(row.updated_at);
        post.created_at = new Date(
          created_at.getTime() + 9 * 60 * 60 * 1000
        ).toLocaleString("en-US", {
          timeZone: "Asia/Seoul",
        });
        post.updated_at = new Date(
          updated_at.getTime() + 9 * 60 * 60 * 1000
        ).toLocaleString("en-US", {
          timeZone: "Asia/Seoul",
        });
        return post;
      });

      return posts;
    } catch (error) {
      throw error;
    }
  }

  // 게시물 조회
  async readPost(req, res) {
    const postId = req.params.postId;

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

      return post;
    } catch (error) {
      throw error;
    }
  }

  // 게시물 수정
  async updatePost(req, res) {
    const { title, content } = req.body;
    const postId = req.params.postId;

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

      // 게시물의 제목과 내용을 업데이트
      await db
        .promise()
        .query(
          "UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE post_id = ?",
          [title, content, postId]
        );

      return { title, content }; // 수정 성공
    } catch (error) {
      throw error;
    }
  }

  // 게시물 삭제
  async deletePost(req, res) {
    const postId = req.params.postId;

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

      const [result] = await db
        .promise()
        .query("DELETE FROM posts WHERE post_id = ?", [postId]);

      return result.postId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostService();

const jwt = require("jsonwebtoken");
const connectToDatabase = require("../db/db");

const loginRequired = (req, res, next) => {
  const token = req.cookies.wanted_token;

  if (!token) {
    // 토큰이 없을 경우 로그인하지 않은 상태로 간주
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  try {
    // JWT 토큰 검증
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 유저 정보를 req 객체에 추가하여 요청 핸들러에서 사용할 수 있도록 함
    req.user = payload;

    next(); // 다음 미들웨어 또는 요청 핸들러로 넘어감
  } catch (error) {
    // 토큰 검증에 실패한 경우
    return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
};

const checkAuthor = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    // 데이터베이스 연결
    const db = await connectToDatabase();

    // 게시물의 작성자 정보를 데이터베이스에서 조회
    const [posts] = await db
      .promise()
      .query("SELECT * FROM posts WHERE post_id = ?", [postId]);
    const post = posts[0];

    if (!post) {
      return res.status(404).json({ error: "작성한 게시물이 없습니다." });
    }

    // 작성자와 로그인한 사용자를 비교하여 권한 확인
    if (post.email !== req.user.email) {
      return res.status(403).json({ error: "작성자에게만 권한이 있습니다." });
    }

    // 작성자인 경우 다음 미들웨어로 이동
    next();
  } catch (error) {
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};

module.exports = { loginRequired, checkAuthor };

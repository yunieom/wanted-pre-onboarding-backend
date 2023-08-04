const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwt");
const connectToDatabase = require("../db/db");

class UserService {
  #isValidEmail(email) {
    const emailRegex = /@/;
    return emailRegex.test(email);
  }
  #isValidPassword(password) {
    const minLength = 8;
    return password.length >= minLength;
  }

  //회원가입
  async register(req, res) {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      throw new Error("이메일과 비밀번호는 필수입력 항목입니다.");
    }

    if (!this.#isValidEmail(email)) {
      throw new Error("이메일은 @를 포함해 작성해주세요.");
    }
    if (!this.#isValidPassword(password)) {
      throw new Error("비밀번호는 최소 8자리 이상으로 설정해주세요.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      // 데이터베이스 연결
      const db = await connectToDatabase();

      // 이메일 중복 체크
      const [existingUser] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);
      if (existingUser.length > 0) {
        throw new Error("이미 사용중인 이메일 주소입니다.");
      }

      // 비밀번호 암호화
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 회원가입 처리
      const [result] = await db
        .promise()
        .query("INSERT INTO users (email, password) VALUES (?, ?)", [
          email,
          hashedPassword,
        ]);

      return result.insertId; // 새로 생성된 회원의 user_id 반환
    } catch (error) {
      throw error;
    }
  }

  //로그인
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // 데이터베이스 연결
      const db = await connectToDatabase();

      // 유저 조회
      const [users] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);

      // 유저가 존재하지 않을 경우
      if (users.length === 0) {
        throw new Error("유효하지 않은 이메일 주소입니다.");
      }
      // 비밀번호 확인
      const user = users[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("비밀번호가 올바르지 않습니다.");
      }

      // 커스텀 JWT 생성
      const payload = {
        userId: user.userId,
        isAdmin: user.isAdmin,
      };
      const token = generateToken(payload);

      return token; // JWT 반환
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();
module.exports = userService;

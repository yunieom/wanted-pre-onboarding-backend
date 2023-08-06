const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const env = require("./envconfig");
const connectToDatabase = require("./src/db/db");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/userRouter");
const postRouter = require("./src/routes/postRouter");

const port = Number(env.PORT || 5000);

const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://localhost:3002",
  "http://localhost:8080",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://34.64.105.163",
  "https://34.64.105.163:80",
  "https://34.64.105.163;443",
];
app.use(cookieParser());
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // 쿠키를 허용하기 위한 설정
};

// swagger.yaml 파일을 파싱하여 JSON 객체로 변환
const swaggerDocument = YAML.load("./swagger.yaml");

// Swagger UI를 /api-docs 경로에 연결
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 데이터베이스 연결
const con = connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log(port, "server on!");
});

app.use("/", indexRouter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

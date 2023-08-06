const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const env = require("./envconfig");
const connectToDatabase = require("./src/db/db");
const YAML = require("yamljs"); // yaml 파일을 파싱하기 위한 라이브러리
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

// const options = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My API",
//       description: "My API description",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/",
//       },
//     ],
//     tags: [
//       {
//         name: "Users",
//         description: "유저 API",
//       },
//       {
//         name: "Posts",
//         description: "게시물 API",
//       },
//     ],
//   },
//   apis: ["./src/routes/*.js"], // API 라우트 파일들의 경로를 지정
// };
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

# 원티드 프리온보딩 백엔드 인턴십 - 엄윤주

## 1. 폴더구조

```css
src
├── db
│   └── db.js
├── routes
│   ├── index.js
│   ├── userRouter.js
│   └── postRouter.js
├── controllers
│   ├── userController.js
│   └── postController.js
└── services
    ├── userService.js
    └── postService.js

```

## 2. 데이터베이스 테이블 구조

### users

| Column Name |  Data Type   |         Constraints         |
| :---------: | :----------: | :-------------------------: |
|   user_id   |     INT      | PRIMARY KEY, AUTO_INCREMENT |
|    email    | VARCHAR(100) |      NOT NULL, UNIQUE       |
|  password   | VARCHAR(64)  |      NOT NULL , UNIQUE      |

### posts

| Column Name |  Data Type   |         Constraints         |
| :---------: | :----------: | :-------------------------: |
|   post_id   |     INT      | PRIMARY KEY, AUTO_INCREMENT |
|    email    | VARCHAR(100) |      NOT NULL, UNIQUE       |
|    title    | VARCHAR(255) |          NOT NULL           |
|   content   |     TEXT     |          NOT NULL           |
| created_at  |   DATETIME   |  DEFAULT CURRENT_TIMESTAMP  |

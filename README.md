# 원티드 프리온보딩 백엔드 인턴십 - 엄윤주

<br>

## 1. 폴더구조

```css
src
├── db
│   └── db.js
├── utils
│   └── jwt.js
├── middlewares
│   └── auth.js
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

<br>
<br>

## 2. 데이터베이스 테이블 구조


![wanted drawio (1)](https://github.com/yunieom/wanted-pre-onboarding-backend/assets/67372083/c3468abe-ed43-41ab-844c-f2630933d0bc)


### users

| Column Name |  Data Type   |         Constraints         |
| :---------: | :----------: | :-------------------------: |
|   user_id   |     INT      | PRIMARY KEY, AUTO_INCREMENT |
|    email    | VARCHAR(100) | FOREIGN KEY, NOT NULL, UNIQUE|
|  password   | VARCHAR(64)  |      NOT NULL   |

### posts

| Column Name |  Data Type   |         Constraints         |
| :---------: | :----------: | :-------------------------: |
|   post_id   |     INT      | PRIMARY KEY, AUTO_INCREMENT |
|    email    | VARCHAR(100) | FOREIGN KEY, NOT NULL, UNIQUE|
|    title    | VARCHAR(255) |          NOT NULL           |
|   content   |     TEXT     |          NOT NULL           |
| created_at  |   DATETIME   |  DEFAULT CURRENT_TIMESTAMP  |
| updated_at  |   DATETIME   |  DEFAULT CURRENT_TIMESTAMP  |

<br>
<br>

## 3. 구현한 API의 동작을 촬영한 데모 영상 링크

<br>
<br>

## 4. 구현 방법 및 이유에 대한 간략한 설명
- 상태관리와 추후 배포 시에 보안을 높이는데 용이하도록 jwt를 `Cookie`에 담았습니다. 
- `DB 용량 최적화`를 위해 email, password, title 각 필드의 VARCHAR 길이를 알맞게 조절했습니다. 
- `Route <-> Controller <-> Service` 의 삼계층 구조로 비지니스 로직은 Service에서만 처리하도록 설계했습니다.
- users 테이블과 posts 테이블은 `email`을 통해 관계가 연결되어 있고, 인덱스 조회를 빠르게 할 수 있도록 각 테이블의 _id로 PK를 설정했습니다.
- `auth 미들웨어`에 loginRequired와 checkAuthor 를 사용하여 코드의 중복을 줄였습니다. 

### user
1. 사용자는 email,password 를 기입하여 `회원가입` 할 수 있습니다. (email은 @ 포함,password는 8자 이상의 유효성 검사 진행)
2. 사용자는 `로그인` 할 수 있습니다. (email은 @ 포함,password는 8자 이상의 유효성 검사 진행 및 아이디 비밀번호 확인 진행)
3. 사용자는 `로그아웃` 할 수 있습니다. (로그아웃 시 쿠키를 삭제합니다.)
4. 사용자는 회원가입 여부와 상관없이 `게시판 조회` 할 수 있습니다.(pagination: 1page 당 10개의 개시물)
5. 사용자는 회원가입 여부와 상관없이 `게시물 조회` 할 수 있습니다. 
6. 로그인한 사용자만 `게시물 생성` 할 수 있습니다. (로그인 후 token 유효성 검사 진행)
7. 로그인한 사용자만 `게시물 수정` 할 수 있습니다. (token에 있는 유저 이메일과 게시물 작성자 이메일 확인; 자신의 게시물만 수정 가능)
8. 로그인한 사용자만 `게시물 삭제` 할수 있습니다 (token에 있는 유저 이메일과 게시물 작성자 이메일 확인; 자신의 게시물만 삭제 가능)

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

## 2. 애플리케이션의 실행 방법 (엔드포인트 호출 방법 포함)

1. Repository 클론

```
git clone https://github.com/yunieom/wanted-pre-onboarding-backend.git
```

2. directory 변경

```
cd wanted-pre-onboarding-backend
```

3. npm 설치

```
npm install
```

4. .env 생성 및 설정

```
touch .env

PORT=3000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=test
JWT_SECRET_KEY=
COOKIE_DOMAIN=
```

5. 어플리케이션 시작

```
npm start
```


<br>
<br>

## 3. 데이터베이스 테이블 구조

![wanted drawio (1)](https://github.com/yunieom/wanted-pre-onboarding-backend/assets/67372083/c3468abe-ed43-41ab-844c-f2630933d0bc)

### users

| Column Name |  Data Type   |          Constraints          |
| :---------: | :----------: | :---------------------------: |
|   user_id   |     INT      |  PRIMARY KEY, AUTO_INCREMENT  |
|    email    | VARCHAR(100) | FOREIGN KEY, NOT NULL, UNIQUE |
|  password   | VARCHAR(64)  |           NOT NULL            |

### posts

| Column Name |  Data Type   |          Constraints          |
| :---------: | :----------: | :---------------------------: |
|   post_id   |     INT      |  PRIMARY KEY, AUTO_INCREMENT  |
|    email    | VARCHAR(100) | FOREIGN KEY, NOT NULL, UNIQUE |
|    title    | VARCHAR(255) |           NOT NULL            |
|   content   |     TEXT     |           NOT NULL            |
| created_at  |   DATETIME   |   DEFAULT CURRENT_TIMESTAMP   |
| updated_at  |   DATETIME   |   DEFAULT CURRENT_TIMESTAMP   |

<br>
<br>

## 4. 구현한 API의 동작을 촬영한 데모 영상 링크
🔗 [구현한 API 동작을 촬용한 데모영상 비디오](https://www.youtube.com/watch?v=IYSOkTNdpA4)

<br>
<br>

## 5. 구현 방법 및 이유에 대한 간략한 설명

- 상태관리와 추후 배포 시에 보안을 높이는데 용이하도록 jwt를 `Cookie`에 담았습니다.
- `DB 용량 최적화`를 위해 email, password, title 각 필드의 VARCHAR 길이를 알맞게 조절했습니다.
- `Route <-> Controller <-> Service` 의 삼계층 구조로 비지니스 로직은 Service에서만 처리하도록 설계했습니다.
- users 테이블과 posts 테이블은 `email`을 통해 관계가 연결되어 있고, 인덱스 조회를 빠르게 할 수 있도록 각 테이블의 \_id로 PK를 설정했습니다.
- `auth 미들웨어`에 loginRequired와 checkAuthor 를 사용하여 코드의 중복을 줄였습니다.
- DB 세션시간과, 서비스 시간 타임존을 `"Asia/Seoul"`으로 변경해 서버시간 및 서비스 모두 애플리케이션 실행시간(한국시간)으로 맞췄습니다.
- POST title, content 필드의 캐릭터셋, 콜레이션을 UTF-8로 맞춰 `이모티콘`등록이 가능합니다.

### Users

1. 사용자는 email,password 를 기입하여 `회원가입` 할 수 있습니다. (email은 @ 포함,password는 8자 이상의 유효성 검사 진행)
2. 사용자는 `로그인` 할 수 있습니다. (email은 @ 포함,password는 8자 이상의 유효성 검사 진행 및 아이디 비밀번호 확인 진행)
3. 사용자는 `로그아웃` 할 수 있습니다. (로그아웃 시 쿠키를 삭제합니다.)

### Posts

1. 사용자는 회원가입 여부와 상관없이 `게시판 조회` 할 수 있습니다.(pagination: 1page 당 10개의 개시물)
2. 사용자는 회원가입 여부와 상관없이 `게시물 조회` 할 수 있습니다.
3. 로그인한 사용자만 `게시물 생성` 할 수 있습니다. (로그인 후 token 유효성 검사 진행)
4. 로그인한 사용자만 `게시물 수정` 할 수 있습니다. (token에 있는 유저 이메일과 게시물 작성자 이메일 확인; 자신의 게시물만 수정 가능)
5. 로그인한 사용자만 `게시물 삭제` 할수 있습니다 (token에 있는 유저 이메일과 게시물 작성자 이메일 확인; 자신의 게시물만 삭제 가능)

<br>
<br>

## 6. API 명세(request/response 포함)

### 명세서 및 테스트 코드 실행
http://localhost:3000/api-docs

### Users

#### 회원가입

```JSON
POST /api/users/register
```

> Request

```JSON
{
  "email": "user@example.com",
  "password": "stringst"
}
```

> Response

성공: `Status: 201`

```JSON
{
  "success": true,
  "userId": 1
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

<br>

#### 로그인

```JSON
POST /api/users/login
```

> Request

```JSON
{
  "email": "user@example.com",
  "password": "stringst"
}
```

> Response

성공: `Status: 200`

```JSON
{
  "success": true,
  "token": "your-jwt-token-string"
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

<br>

#### 로그아웃

```JSON
POST /api/users/logout
```

> Request

> Response

성공: `Status: 200`

```JSON
{
  "success": "로그아웃 되었습니다."
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

<br>

### Posts

#### 게시물 생성

```JSON
POST /api/posts
```

> Request

```JSON
{
  "title": "새로운 게시물",
  "content": "게시물 내용입니다."
}
```

> Response

성공: `Status: 201`

```JSON
{
  "success": "게시물이 등록되었습니다.",
  "postId": 1
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

<br>

#### 전체 게시물 조회

```JSON
GET /api/posts/all
```

> Request

```
?page=
```

> Response

성공: `Status: 200`

```JSON
{
  "success": "게시물 조회에 성공했습니다.",
  "posts": [
    {
      "id": 1,
      "title": "게시물 제목",
      "content": "게시물 내용입니다."
    },
    {
      "id": 2,
      "title": "게시물 제목",
      "content": "게시물 내용입니다."
    }
  ]
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

<br>

#### 게시물 조회

```JSON
GET /api/posts/{postId}
```

> Request

> Response

성공: `Status: 200`

```JSON
{
  "success": "게시물 조회에 성공했습니다.",
  "post": {
    "id": 1,
    "title": "게시물 제목",
    "content": "게시물 내용입니다."
  }
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

<br>

#### 게시물 수정

```JSON
PATCH /api/posts/{postId}/update
```

> Request

```JSON
{
  "title": "수정된 게시물",
  "content": "수정된 게시물 내용입니다."
}
```

> Response

성공: `Status: 201`

```JSON
{
  "success": "게시물 수정이 완료되었습니다.",
  "result": {
    "title": "수정된 게시물",
    "content": "수정된 게시물 내용입니다."
  }
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

<br>

#### 게시물 삭제

```JSON
DELETE /api/posts/{postId}/delete
```

> Request

> Response

성공: `Status: 200`

```JSON
{
  "success": "게시물 삭제가 완료되었습니다."
}
```

실패: `Status: 오류 상태 코드`

```JSON
{
  "message": "오류 메시지"
}
```

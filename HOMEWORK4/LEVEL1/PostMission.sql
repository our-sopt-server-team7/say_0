use sopt;
SELECT * FROM post;

/-- post 데이터의 개수 --/
SELECT COUNT(*) FROM post;

/-- post title만 가져오기 --/
SELECT title from post;

/-- 아무 값이나 INSERT 해보기 --/
INSERT INTO post(author, title, content, createdAt) VALUES ('Seyoung Jang', 'Server26th', 'LOVE U', '5/28/2020');

/-- postIdx가 3인 데이터 모두 조회하기 --/
SELECT * from post WHERE postIdx=3;

/-- postIdx가 2인 post 개체들을 모두 출력하기 --/
SELECT * from post WHERE postIdx=2;

/-- 선택 ) post.sql 17 ~ 26을 실행시켰다면 userIdx가 4인 post+user 개체를 JOIN으로 출력해보기 --/
SELECT * from post, user WHERE post.postIdx = user.userIdx and userIdx = 4;

/-- postIdx가 2인 데이터 날짜 현재로 수정하기 --/
UPDATE post SET createdAt = '5/28/2020' WHERE postIdx = 2;

/-- postIdx가 4인 데이터 지우기 --/
DELETE FROM post WHERE postIdx=4;

SELECT * FROM sopt.post;
기본적인 SQL문을 CRUD(Create Read Update Delete)라고 부릅니다.



각각의 의미는 아래와 같습니다.

Create: Insert문

Read: Select문

Update: Update문

Delete: Delete문







CRUD 예제

테이블 AAA의 구성

COLUMN_NAME	COMMENTS
ID	사용자ID
NAME	사용자명
JOB	직업




INSERT
INSERT INTO 테이블명 VALUES(데이터)



AAA테이블의 모든 컬럼에 값을 삽입	AAA테이블의 컬럼중 ID와 JOB 컬럼에만 데이터를 삽입
INSERT INTO AAA VALUES (

    'user_hong',

    '홍길동',

    '도적'

)

INSERT INTO AAA (

    ID,

    JOB

) VALUES (

    'user_hong',

    '도적'

)



SELECT
SELECT  필요한 컬럼 FROM 테이블명 WHERE 조건



SELECT * FROM AAA WHERE ID = 'user_hong' -- id가 user_hong인 데이터 조회

SELECT SYSDATE FROM DUAL -- DUAL은 오라클에서 제공되는 테이블(테스트나 필요한값을 산출할 경우 사용)





UPDATE
UPDATE 테이블명 SET 수정할컬럼=수정할값 WHERE 조건문



UPDATE AAA SET

    JOB = '의적'

WHERE ID = 'user_hong' -- id가 user_hong인 데이터의 JOB컬럼 수정





DELETE
DELETE FROM 테이블명 WHERE 조건문



​DELETE FROM AAA WHERE ID = 'user_hong' -- id가 user_hong인 데이터 삭제


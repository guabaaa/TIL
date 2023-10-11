SQL과 CRUD
SQL - Structured Query Language
CRUD - Create, Read, Update, Delete

SQL은 데이터 베이스(DB)와 사람이 소통을 할 때 사용하는 언어이다. 그리고 이 언어로 전달되는 SQL 명령을 Query라고 하며 그 중에서도 데이터의 생성과 조회, 수정, 삭제와 같은 기본적인 기능들을 CRUD라고 총칭한다.

생성
CREATE (테이블 생성)
CREATE TABLE table_name (column_name column_type, column_name column_type);
CREATE 는 DB에 TABLED을 생성할 때 사용하는 명령어다. CREATE TABLE table명(); 과 같은 형태로 사용하며 CRUD 명령어는 대문자로, table명과 같이 사용자 지정어는 소문자로 사용하는 게 일반적이다.

컬럼 이름
두 개 이상의 단어가 연결되는 이름은 PHONE_NUMBER과 같이 _ 를 사용한다. (); 안에는 컬럼명과 컬럼의 타입을 넣고 컬럼이 두개 이상이라면 ,로 구분하며 마지막 컬럼에는 ,를 넣지 않는다.

컬럼 타입
DB마다 조금씩 차이가 있다. 나는 비용에 대한 라이센스 문제가 전혀 없는 postgreSQL을 쓰는데, 이 코끼리 DB에서 가장 많이 쓰이는 타입은 INTEGER와 VARCHAR, DATE이다. 컬럼의 타입이 숫자라면 INTEGER, 문자열이라면 VARCHAR()이라고 쓰며 () 안에는 최대 길이를 숫자로 입력한다. DATE는 'YYYY-MM-DD'와 같은 형식의 문자열로 날짜를 표현한다.

VARCHAR(n) : 문자열
INTEGER : 정수형
DATE : 시간('YYYY-MM-DD')
외에 더 다양한 postgreSQL 컬럼 타입은 HAMA님의 티스토리 블로그에서 확인할 수 있다.

테이블 생성 예시
그래서 실제 적용 예시는 아래와 같다. member 이라는 테이블에 회원아이디 컬럼인 id, 이름 컬럼인 name, 연락처 컬럼인 phone_number를 생성하는 쿼리다.

CREATE TABLE member (
id INTEGER,
name VARCHAR(10),
phone_number VARCHAR(13)
);
INSERT (데이터 생성)
INSERT INTO table (column_name, column_name) VALUES (DATA, DATA);
INSERT INTO table VALUES (DATA, DATA);
INSERT는 CREATE로 생성한 테이블과 컬럼에 데이터를 삽입하는 것이다. INSERT 명령어를 사용하는 방식은 위와 같이 두가지 방식이 있다. 생성한 컬럼의 일부에만 데이터를 넣을 것이라면 두개의 괄호 중 첫번째 ()에 삽입을 원하는 컬럼의 이름을, 두번째 ()에는 해당 컬럼에 삽입할 데이터를 넣는다.

문자열 타입인 VARCHAR와 DATE 는 ''안에 데이터를 입력해야한다.
정수형 타입인 INTEGER는 '' 없이 숫자만 입력한다.

데이터 생성 예시
INSERT INTO
member (id, name, phone_number)
VALUES
(1, '왕밤방', '010-1234-4321');
혹은

INSERT INTO members VALUES (1, '왕밤방', '010-1234-4321');
와 같이 사용할 수 있다.

조회
SELECT (데이터 조회)
SELECT * FROM table
위 예시는 table 테이블의 모든 데이터를 조회하겠다는 쿼리이다. 예를 들어서, 위에서 생성한 member테이블의 전체 데이터를 조회한다고 하면 조회 쿼리와 결과 데이터는 아래와 같다.

조회 예시 쿼리
SELECT * FROM member
조회 결과


데이터를 활용해 특정 컬럼의 합계나 평균, 월 별 거래액 등도 조회할 수 있다.
조회에 대한 더 자세한 내용은 다른 포스팅에서 정리할 예정이다.

수정
UPDATE (데이터 수정)
UPDATE table SET column = data;
테이블의 특정 컬럼 데이터를 수정할 때에는 위와 같은 형식으로 사용할 수 있다.

위 이미지처럼 member table 데이터의 name을 '왕밤방'에서 '왕밤빵'으로 바꾸는 쿼리는 아래와 같다.

UPDATE member SET name = '왕밤빵';
이후 SELECT문을 사용해 member table을 조회하면 아래와 같이 이름이 바뀐 것을 확인할 수 있다.



그런데 이때, member 테이블의 데이터가 왕밤방 하나가 아니라, 여러개였다면 전체 데이터의 name 컬럼이 모두 '왕밤빵'으로 바뀌었을 것이다. 이때 제약조건으로 사용할 수 있는 것이 바로 WHERE 이다.

* WHERE (제약 조건)


위와 같은 member 테이블에서 '황미미'의 phone_number 연락처 데이터만 수정하고 싶다면 아래 예시처럼 WHERE column = data 형식으로 제약 조건을 두고 사용하면 된다.

UPDATE member SET phone_number='010-8888-9999' WHERE name='황미미';
해당 쿼리 실행 후 SELECT문으로 member 테이블을 조회하면 아래와 같이 전화번호가 변경된 것을 확인할 수 있다.


비교 연산자
외에도 > , >=, =, <=, <, != 등을 사용해서 미만, 이하, 초과, 이상, 같거나 다름을 비교하는 조건을 작성할 수도 있다.

논리 연산자
하나 이상의 조건을 작성하고 싶은 경우에는 AND 혹은 OR 논리 연산자를 사용할 수 있다. 두가지 조건을 모두 충족한 데이터만 가져오고 싶은 경우에는 AND, 두가지 조건 중 하나의 조건이라도 충족하는 데이터를 가져오고 싶다면 OR 를 사용한다.

삭제
DELETE (데이터 삭제)
DELETE FROM table WHERE column = data;
테이블에서 특정 데이터를 삭제하고 싶은 경우 위와 같은 형태로 DELETE문을 사용하면 된다. 어떤 데이터를 지울 것인지는 WHERE 을 사용해 제약조건을 둘 수 있다. 예를 들어 member 테이블에서 '김방봉'을 삭제하고 싶은 경우 DELETE FROM member WHERE id=2' 혹은 WHERE name='김방봉' 등의 쿼리를 사용할 수 있을 것이다.



실제로 DELETE 쿼리로 삭제 후 member 테이블을 조회해보면 위 이미지와 같은 결과가 나온다.

DROP (테이블 삭제)
DROP TABLE table
table의 특정 데이터가 아니라 table 전체를 삭제하고 싶은 경우 DROP TABLE table명 을 사용하면 된다.



DROP 을 사용해 member 테이블 삭제 후 member 테이블 데이터를 조회하려고 하면 member 테이블이 존재하지 않는다는 메시지가 나오는 것을 확인할 수 있다.

🙏 Reference
인프런 홍팍 sql 입문 강의
인프런 홍팍 sql 활용 강의

- 출처 : https://velog.io/@wijoonwu/SQL-CRUD-%EC%A0%95%EB%A6%AC
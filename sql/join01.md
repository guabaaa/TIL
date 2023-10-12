JOIN이란?


개념
JOIN은 2개 이상의 테이블을 엮어서 조회하는 연산이다.



종류
1. Inner JOIN: 서로 매칭되는 것만 조회한다. (교집합)



2. Outer JOIN: 매칭되는 데이터를 기준으로 좌측 또는 우측의 데이터도 같이 조회한다.
- Outer JOIN은 세 종류가 있습니다 -> Left Outer JOIN, Right Outer JOIN, Full Outer JOIN



3. Natural JOIN: 두 테이블을 JOIN할때 컬럼명, 타입이 같은 모든 컬럼을 JOIN 조건으로 사용한다.



4. Self JOIN: 자기 자신의 테이블을 JOIN하는 것이다.
- employees 테이블이 사원번호, 상사번호를 가지고 있다고 가정해보자. 특정 사원의 상사를 구하고 싶다면 Self JOIN을 사용해야한다.





INNER JOIN
개념

inner join


두 테이블 간  JOIN 조건을 만족하는 행을 구하는 것이다.





예제
ORDERS 테이블과 POINT 테이블의 ID를 INNER JOIN한다.

SELECT *
FROM ORDERS A
INNER JOIN POINT B
ON A.ID = B.ID



INNER JOIN


ID 3,4,5가 공통되므로, 교집합인 부분만 묶어 새로운 테이블을 가져온다.





OUTER JOIN
개념
INNER JOIN과 달리, 동일한 조건이 없는 행도 반환할 때 사용한다.



종류
1. LEFT OUTER JOIN

2. RIGHT OUTER JOIN

3. FULL OUTER JOIN





예제
1. LEFT OUTER JOIN

LEFT JOIN


LEFT OUTER JOIN B 할 경우 A, B 테이블간 조인 조건이 맞지 않는 A와B 테이블 중 A 테이블은 무조건 결과값에 포함되어 나오는 것이다. 만약 B의 값이 없는 경우는 그 속성을 NULL로 반환한다.



SELECT *
FROM ORDERS A
LEFT OUTER JOIN POINT B
ON A.ID = B.ID



LEFT OUTER JOIN








2. RIGHT OUTER JOIN

RIGHT OUTER JOIN


A와B 테이블 중 B 테이블은 무조건 결과값에 포함되어 나오는 것이다. 만약 A의 값이 없는 경우는 그 속성을 NULL로 반환한다.



SELECT *
FROM ORDERS A
RIGHT OUTER JOIN POINT B
ON A.ID = B.ID



RIGHT OUTER JOIN




3. FULL OUTER JOIN

FULL OUTER JOIN


좌측과 우측의 모든 데이터를 읽어 JOIN한다.







NATURAL JOIN
개념
inner join의 하위 개념으로 동일한 이름을 갖는 모든 칼럼에 대해 join을 수행한다.

- join 되는 테이블의 데이터 도메인과 칼럼명의 칼럼 값이 동일해야 한다는 제약조건이 있다. ( 따라서 on 절이 없다)

- 칼럼 값이 같지 않으면 결과가 출력되지 않는다,



예제
SELECT *
FROM ORDERS A
NATURAL JOIN POINT B



NATURAL JOIN


앞서 봤던 동일한 이름의 칼럼은 ID이다. 이 ID의 도메인이 INT로 모두 같으므로 NATURAL JOIN의 결과가 나오는 것이다. 만약 달랐다면 결과는 나오지 않았을 것이다.





SELF JOIN
개념
동일 테이블 사이의 조인을 의미한다. 따라서 FROM 절에 동일 테이블이 2번 이상 나타난다. 테이블의 이름이 모두 동일하므로, 반드시 테이블 별칭을 사용해 구분해주어야 한다. 동일 테이블에 테이터가 있는데 왜 self join을 사용하는지는 아래의 예시를 통해 이해해보자.



예제



예를 들어 위와 같은 CUSTOMER 테이블이 있다고 하자. 이 테이블에서 CUSTOMER1의 SPOUSE 이름을 바로 찾을 수 있을지 생각해보자. SPOUSE_ID를 참조해 다시 TABLE을 탐색해야한다. SPOUSE_ID 옆에 이름이 있다면 바로 볼 수 있을텐데 말이다. 이러한 경우 등에서 self join을 사용한다.



SELECT
A.customer_id,
A.firstname,
A.lastname,
A.spouse_id,
B.firstname AS spouse_firstname,
B.lastname AS spouse_lastname
FROM customer AS A
INNER JOIN customer AS B
ON A.spouse_id = B.customer_id



SELF JOIN


위와 같은 용도로 SELF JOIN이 활용된다.

 
- 출처 : https://abcdefgh123123.tistory.com/463
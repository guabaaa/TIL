SQL 기본 문법: JOIN(INNER, OUTER, CROSS, SELF JOIN)
하나의 테이블에 원하는 데이터가 모두 있다면 참 좋겠지만, 두 개의 테이블을 엮어야 원하는 결과가 나오는 경우도 많습니다. 조인을 쓰면 두 개의 테이블을 엮어서 원하는 데이터를 추출할 수 있습니다.

두 테이블의 조인을 위해서는 기본키(PRIMARY KEY, PK)와 외래키(FOREIGN KEY, FK) 관계로 맺어져야 하고, 이를 일대다 관계라고 합니다. INNER JOIN, OUTER JOIN, CROSS JOIN, SELF JOIN에 대해 간단히 알아보겠습니다.



📌JOIN 5줄 요약
조인은 두 개의 테이블을 서로 묶어서 하나의 결과를 만들어 내는 것을 말한다.
INNER JOIN(내부 조인)은 두 테이블을 조인할 때, 두 테이블에 모두 지정한 열의 데이터가 있어야 한다.
OUTER JOIN(외부 조인)은 두 테이블을 조인할 때, 1개의 테이블에만 데이터가 있어도 결과가 나온다.
CROSS JOIN(상호 조인)은 한쪽 테이블의 모든 행과 다른 쪽 테이블의 모든 행을 조인하는 기능이다.
SELF JOIN(자체 조인)은 자신이 자신과 조인한다는 의미로, 1개의 테이블을 사용한다.






👭INNER JOIN(내부 조인)
두 테이블을 연결할 때 가장 많이 사용하는  것이 내부 조인입니다. 그냥 조인이라고 부르면 내부 조인을 의미합니다.


SELECT <열 목록>
FROM <첫 번째 테이블>
INNER JOIN <두 번째 테이블>
ON <조인 조건>
[WHERE 검색 조건]

#INNER JOIN을 JOIN이라고만 써도 INNER JOIN으로 인식합니다.
혼자 공부하는 SQL_INNER JOIN







👩🏼‍🤝‍👩🏻OUTER JOIN(외부 조인)
내부 조인은 두 테이블에 모두 데이터가 있어야만 결과가 나오지만, 외부 조인은 한쪽에만 데이터가 있어도 결과가 나옵니다.


SELECT <열 목록>
FROM <첫 번째 테이블(LEFT 테이블)>
<LEFT | RIGHT | FULL> OUTER JOIN <두 번째 테이블(RIGHT 테이블)>
ON <조인 조건>
[WHERE 검색 조건]
👀참고) OUTER JOIN의 종류
LEFT OUTER JOIN: 왼쪽 테이블의 모든 값이 출력되는 조인
RIGHT OUTER JOIN: 오른쪽 테이블의 모든 값이 출력되는 조인
FULL OUTER JOIN: 왼쪽 또는 오른쪽 테이블의 모든 값이 출력되는 조인
혼자 공부하는 SQL_OUTER JOIN

OUTER JOIN







👭CROSS JOIN(상호 조인)
한쪽 테이블의 모든 행과 다른 쪽 테이블의 모든 행을 조인시키는 기능입니다. 상호 조인 결과의 전체 행 개수는 두 테이블의 각 행의 개수를 곱한 수만큼 됩니다.
카티션 곱(CARTESIAN PRODUCT)라고도 합니다.


SELECT *
FROM <첫 번째 테이블>
CROSS JOIN <두 번째 테이블>
혼자 공부하는 SQL_CROSS JOIN







👭SELF JOIN(자체 조인)
자체 조인은 자기 자신과 조인하므로 1개의 테이블을 사용합니다. 별도의 문법이 있는 것은 아니고 1개로 조인하면 자체 조인이 됩니다.


SELECT <열 목록>
FROM <테이블> 별칭A
INNER JOIN <테이블> 별칭B
[WHERE 검색 조건]
혼자 공부하는 SQL_SELF JOIN







위 내용은 『혼자 공부하는 SQL』의 일부분을 재구성하여 작성하였습니다.

혼자 공부하는 SQL



SQL을 배우지 않고 ORM을 주로 사용하시는 분들도 계실텐데요, ORM을 이용하면 SQL문이 자동으로 생성되기 때문에 프로그래밍에 집중할 수 있다는 장점이 있지만 데이터가 많이 쌓이기 시작하면 어떻게 쿼리를 짜느냐에 따라 퍼포먼스에 차이가 나므로 큰 프로젝트에서는 직접 SQL 쿼리문을 작성하는 것이 좋습니다.

데이터베이스에 대한 이해 없이 프로젝트에 투입되면, SQL을 체계적으로 배워둘걸 이라는 후회가 들 때가 있습니다. SQL 문법 외에도 데이터베이스의 전반적인 개념과 이해가 필요하다면 『혼자 공부하는 SQL』로 시작해보세요.



- 출처 : https://hongong.hanbit.co.kr/sql-%EA%B8%B0%EB%B3%B8-%EB%AC%B8%EB%B2%95-joininner-outer-cross-self-join/
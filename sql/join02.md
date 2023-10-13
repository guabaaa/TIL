✔ 저장은 분산해서. 출력은 합쳐서 !


데이터 중복을 최소화 하기 위해 테이블을 분리했었는데, 분리한 테이블을 사용자가 한번에 확인하려고 할때, 그때 JOIN을 사용한다.



더보기
Join
- 각각의 테이블에 분리되어 있는 연관성 있는 데이터들을 연결하거나 조합하는 일련의 작업들

- 여러 테이블에 흩어져 있는 정보중에서 사용자가 필요한 정보만 가져와서 가상의 테이블간 공통된 열을 기준으로 검색



✔  조인은 연결고리 찾는게 중요하다!


기본 문법
select 조회 할 컬럼
from 테이블 A join 테이블 B  -- 연결 할 테이블
on A.공통컬럼 = B.공통컬럼; -- 연결고리




테이블 분리가 된 emp 테이블과 dept 테이블을 이용해 join 연습을 해볼건데,

emp 테이블과 dept 테이블의 연결관계를 같이 살펴보자.






각 테이블의 컬럼을 잘 보면, deptNo가 공통적으로 들어가 있는것을 확인 할 수 있다.

이를 통해, emp테이블과 dept테이블의 연결고리는 deptNo 라는걸 확인.



이제 이를 이용해서 Join의 종류와, 그 예시들을 살펴보자.



Join의 종류
1) 내부 조인(inner join) - ★★양쪽 테이블에 모두 데이터가 존재해야 결과가 나온다★★
   일반적으로, inner join 풀명칭으로 쓰기보다는 inner 생략해서 join으로만 사용한다.



예제 1)

emp, dept 테이블에서 부서번호,사원명,직업,부서명,지역 조회

단, 직업(job)이 CLERK인 사원 데이터만 조회

SELECT e.deptno, e.ename, e.job, d.dname, d.loc
FROM emp e JOIN dept d
ON e.deptno=d.deptno
where e.job='CLERK';




예제 2)

emp, dept 테이블에서 부서번호,사원명,직업,부서명,지역 조회

단, 직업(job)이 CLERK인 사원이거나 Manager인 사원만 조회

SELECT e.deptno, e.ename, e.job, d.dname, d.loc
FROM emp e JOIN dept d
ON e.deptno=d.deptno
where job in('CLERK', 'MANAGER');




예제 3)

emp, dept 테이블에서 지역(loc)별 급여(sal)의 평균 조회

Join, group by 모두 이용



SELECT d.loc, round(avg(IFNULL(e.sal,0)),1)
FROM emp e JOIN dept d
ON e.deptno=d.deptno
GROUP BY d.loc;







위와 같이 JOIN 의 검색 결과가 3건이 나오는데, 원래 dept테이블의 데이터를 찾아보자.






JOIN 결과에 dept의 지역 BOSTON이 조회되지 않았다.

이는 inner join을 이용했기 때문인데, emp 테이블에서는 loc가 BOSTON인 데이터 ( deptNo=40 )가 없기 때문.




조회 결과가 NULL이 나온 상태이다.




✔  이를 통해, inner join은 양쪽 테이블에 모두데이터 가 존재 해야 결과가 나온다는 것을 알 수 있다.




오라클에서의 NVL함수 와는 다르게, MySQL은 IFNULL 함수를 이용한다.
IFNULL(값1,값2) - 값1이 NULL 이면 값2로 대치하고 그렇지 않으면 값1을 출력한다.


지역별 급여의 평균을 구해야하는데, 평균을 구하는 내장함수는 AVG( 필드명 ) 이며,

sal이 NULL 인 경우도 카운팅을 같이 해주어야 하므로, 평균값을 제대로 내기위해 IFNULL(값1, 값2) 함수를 사용한다.

그리고 평균값이 소수점이 많이 나오므로, 깔끔하게 도출해내오기 위해서는 ROUND(숫자, 자릿수) 함수를 통해 반올림 까지 해준다.



'지역별' 급여 이므로, SELECT 문에 LOC 와 GROUP BY로 묶어주는것 까지 잊지 말자.



💡 ROUND(숫자,자릿수) - 숫자를 소수점 이하 자릿수에서 반올림.(자릿수는 양수,0,음수)






2) 외부 조인 ( outer join )
- inner join과는 반대로 한쪽 테이블에는 데이터가 있고,

한쪽 테이블에 없는 경우에 데이터가 있는 쪽 테이블의 내용을 전부 출력하게 하는 방법



LEFT JOIN : 왼쪽에 있는 테이블을 기준으로 오른쪽에 있는 테이블의 데이터를 가져온다.
RIGHT JOIN : 오른쪽에 있는 테이블을 기준으로 왼쪽에 있는 테이블의 데이터를 가져온다.


bbinya.tistory.com/17?category=919108  실습용 데이터 참고





예제 1) student 테이블과 professor 테이블을 조인하여 학생이름과 지도교수 이름을 출력하시오.

단, 지도교수가 결정되지 않은 학생의 명단도 함께 출력하시오. (학생 데이터는 전부 출력되도록)



✔ inner join 을 이용했을때
select s.*, p.name 지도교수명
from student s join professor p
on s.profno=p.profno; -- 15건 => 지도교수가 없는 학생은 제외


✔ Outer Join을 이용하게 된다면
select s.*, p.name 지도교수명
from student s left outer join professor p -- outer는 생략 가능
on s.profno=p.profno; -- 20건


🔎 CHECK
student 다 나오게 할거야? 왼쪽에 있네? left outer 추가
→ 데이터가 있는 쪽에 표시를 함
학생 데이터는 전부 출력해야 하므로 학생 테이블을 향해 표시
학생 테이블이 왼쪽에 있으므로 left


예제 2) student 테이블과 professor 테이블을 조인하여 학 생이름과 지도교수 이름을 출력 하시오. --단, 지도학생이 결정되지 않은 교수의 명단도 함께 출력하시오. (교수 데이터는 전부 출력되도록)



select s.*, p.name 교수명
from student s right join professor p
on s.profno = p.profno;


예제 3) student 테이블과 professor 테이블을 조인하여 학생이름과 지도교수 이름을 출력하시오.

단, 지도학생이 결정되지 않은 교수의 명단과 지도교수가 결정 안 된 학생 명단을 한꺼번에 출력하시오.



select s.*, p.name 지도교수명
from student s left join professor p
on s.profno=p.profno
union
select s.*, p.name 지도교수명
from student s right join professor p
on s.profno=p.profno;


✔ MySQL 에서는 Oracle과는 달리 full outer join 을 지원 안하므로, left join과 right join을 이용하여 union 을 사용한다.




3) self join
- 원하는 데이터가 하나의 테이블에 다 들어 있을 경우 하나의 테이블을 메모리상에서 별명을 두 개로 사용해서 가상으로 2개의 테이블로 만든 후 조인 작업을 수행

self join 같은 경우에는 outer join 이용하는게 일반적이다.

✔  main 을 잘 정하자


예제 1)  사원정보와 해당 사원의 직속 상관이름 조회

select a.*, b.firstname 직속상관이름
from employees a left join employees b
on a.reportsTo = b.employeeNumber
order by a.employeeNumber;


4) cross join(카티션 곱) - 참고용
- 조인조건이 없는 경우 두 테이블의 데이터를 곱한개수만큼의 데이터가 출력됨



select * from emp; # 14건
select * from dept; # 4건
select e.*, d.*
from emp e, dept d  --join 조건이 없으면 그냥 cross join 한것
order by empno, d.deptno; --14*4=>56건

select e.*, d.*
from emp e cross join dept d
order by empno, d.deptno;




- 출처 : https://bbinya.tistory.com/18
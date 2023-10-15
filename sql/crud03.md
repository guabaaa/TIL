CREATE






DB테이블 생성

Create table 테이블명(

           컬럼명(idx) 타입(int) primary key auto_increment comment ‘인덱스’,

           컬럼명(name) 타입(varchar(50) not null comment ‘이름1’,

           컬럼명(name2) 타입(varchar(50) not null comment ‘이름2’

);







EX

1
2
3
4
5
6
7
8
create table tbl_counsel_case (
case_idx int primary key auto_increment comment '인덱스',
case_title varchar(300) comment '제목',
case_content varchar(50) comment '내용',
case_inquiry int comment '조회수',
case_regdate varchar(100) comment '등록일',
atch_file_id varchar(3000) comment '첨부파일'
);
Colored by Color Scripter
cs














INSERT




디비 데이터 삽입 – parametertype : 해당 vo

Insert into 테이블명 (컬럼1, 컬럼2) values (컬럼1값, 컬럼2값);





EX

1
2
3
4
5
6
7
8
9
10
11
12
<insert id="bioCounselAnswerInsert" parameterType="tbl_bio_counsel_answerVO">
insert into tbl_bio_counsel_answer (
biocs_idx,
bioasw_content,
bioasw_file
)
values(
#{biocs_idx},
#{bioasw_content},
#{bioasw_file}
)
</insert>
Colored by Color Scripter
cs
















READ






데이터 조회(리스트화면) – parametertype : 해당 vo  / resulttype : 해당 vo

Select * from 테이블명





EX

1
2
3
4
5
6
7
8
9
10
11
12
<select id="getAnswerList" parameterType="tbl_bio_counsel_answerVO"  resultType="tbl_bio_counsel_answerVO">
SELECT
*
FROM
tbl_bio_counsel_answer
where
1=1
and
biocs_idx = #{biocs_idx}
Order by
bioasw_idx desc
</select>
Colored by Color Scripter
cs






상세페이지 조회(상세화면) – parametertype : java.lang.integer / resulttype : 해당 vo

Select * from 테이블명 where idx값 = #{ idx값}





EX

1
2
3
4
5
6
7
8
<select id="getBioCounselContent" parameterType="java.lang.Integer"  resultType="tbl_bio_counselVO">
select
*
from
tbl_bio_counsel
where
biocs_idx =#{biocs_idx}
</select>
Colored by Color Scripter
cs














DREATE




테이블 데이터 삭제 parametertype : int

Delete from 테이블명 where 조건;





EX

<delete id="getBoardDelete" parameterType="java.lang.Integer" >
<![CDATA[
    delete 
    	from 
    tbl_board
    where
    board_idx =#{board_idx}            
]]>    
</delete>​












UPDATE


데이터 수정 – parametertype : 해당 vo

Update 테이블명 set

컬럼명=’변경할값’ where 조건;



EX



1
2
3
4
5
6
7
<update id="getBioCounselinquiryUpdate" parameterType="java.lang.Integer">
update tbl_bio_counsel set
biocs_inquiry = biocs_inquiry+1
where
1=1
and biocs_idx = #{biocs_idx}
</update>
Colored by Color Scripter
cs
 

- 출처 : https://chobopark.tistory.com/56
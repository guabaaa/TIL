JAVA SCRIPT 자료형(Dynamic Typing(동적 타이핑))
==================

### Number type(숫자를 다루기 위한 자료형)
    - 정수나 소수를 저장할 수 있다.
    - let n1 = 1224;
    - let n2 = 5.678;

### String type(문자열을 다루기 위한 자료형)
    - 문자를 다룰 때는 큰 따옴표나 작은 따옴표를 사용한다. (섞어서 사용은 할 수 없다.)
    - let s1 = "hello";
    - let s2 = 'world';

### Boolean type(true와 false로만 되어있는 자료형)
    - let b1 = true;
    - let b2 = false;

### Null type(값이 null 인 자료형)
    - let n = null;

### Undefined type(정의가 되지 않은 자료형)
    - define이 되지 않았다.
    - let u1;
    - let u2 = undefined;

### Array type(배열을 나타내는 자료형)
    - java script에서는 배열의 다양한 자료형의 변수가 함께 들어갈 수 있다.)
    - 순서대로 정리된다.
    - let arr = [1,2,3,4];

### java script에서 사용되는 배열
#### Number 타입으로만 이루어진 배열
    - let arr1 = [1,2,3,4,5];
#### String 타입으로만 이루어진 배열
    - let arr2 = ["h","e","l","l","o"];
#### Number 타입과 String 타입을 함께 사용한 배열
    - let arr3 = [1,"h",2,"i"];
#### 다양한 자료형들을 함께 사용한 배열
    - let arr4 = [true,1,undefined,false,"h",2,null,"i"];

### Object type
#### 값으로 String 타입만을 사용한 객체
    - let obj = { a: "apple" , b: "banana" , c: "carrot" };
#### 값으로 Number 타입만을 사용한 객체
    - let obj2 = { a: 1 , b : 2 , c : 2};
#### 값으로 다양한 자료형들을 함께 사용한 객체
    - let obj3 = { a : "hello" , b : 100 , c : [1,2,3,4]};
#### 값으로 객체를 사용한 객체
    - let obj4 = {
        a : {a1: 1, a2: 2},
        b : {b1: 3, b2: 4},
        c : {c1: 5, c2: 6},
    };
    

    
-출처:인프런 강의[처음 만난 리액트(React)]
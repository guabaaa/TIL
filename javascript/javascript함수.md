JavaScript의 함수
==

### 프로그래밍에서의 함수 : 입력을 받아서 정해진 출력을 하는 것

    -파라미터(parameters)
    -인자(arguments)

    // function statement를 사용
    function sum(a,b){
        return a+b;
    }
    console.log(sum(10,20));
    // 출력결과 : 30

    // arrow function expression을 사용
    const multiply = (a,b) =>{
        return a*b;
    }
    console.log(multiply(10,20));
    // 출력결과 : 200



-출처:인프런 강의[처음 만난 리액트(React)]
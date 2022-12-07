JAVA SCRIPT의 연산자(Operator)
==

### 대입 연산자(Assignment operator)
    :변수의 값을 대입하기 위해 사용한다.
    -대입 연산자는 항상 오른쪽에서 왼쪽 방향으로 흐름이 흘러간다.
    -let a=10;
     let b=20;

     console.log(a);
     // 출력결과 : 10
     console.log(b);
     // 출력결과 : 20


### 사칙 연산자
    :덧셈(+),뺄셈(-),곱셈(*),나눗셈(/),나저미를 구하는 연산자(%),지수연산자(**) => 산술연산자(Arithmetic operators)
    -let a=2;
     let b=4;

     console.log(a+b);
     // 출력결과 : 6
     console.log(a-b);
     // 출력결과 : -2
     console.log(a*b);
     // 출력결과 : 8
     console.log(a/b);
     // 출력결과 : 0.5
     console.log(a%b);
     // 출력결과 : 2
     console.log(a**b);
     // 출력결과 : 16 (2를 4번 곱함)

     -let a=2;
      let b=4;

      a += b;   // a = a+b
      console.log(a);
      // 출력결과 : 6
      a -= b;   // a = a-b
      console.log(a);
      // 출력결과 : 2
      a *= b;   // a = a*b
      console.log(a);
      // 출력결과 : 8
      a /= b;   // a = a/b
      console.log(a);
      // 출력결과 : 2


### 증가연산자(++) 감소연산자(--)
    :증감연산자를 변수의 뒤에 붙이는 경우
    -postfix 방식 : a++     // post:뒤
    :증감연산자를 변수의 앞에 부이는 경우
    -prefix 방식 : ++a      // pre:앞

    -let a=1;
     let b=a++;

     console.log(a,b);
     // 출력결과 : 2,1

    -let c=1;
     let d=++c;

     console.log(c,d);
     // 출력결과 : 2,2


### 관계 연산자(Relational operators)
    :변수들 사이의 관계를 비교하기 위해 사용하기 때문에,
     비교 연산자(Comparison operators)라고도 불린다.
    :<,>,<=,>=
    (항상 왼쪽에 있는 변수를 기준으로 한다.)

    ex) a<b : a가 b보다 작다.
        a>b : a가 b보다 크다.
        a<=b : a가 b보다 작거나 같다.
        a>=b : a가 b보다 크거나 같다.

    -let a=1;
     let b=2;

     console.log(a<b);
     // 출력결과 : true
     console.log(a>b);
     // 출력결과 : false
     console.log(a<=b);
     // 출력결과 : true
     console.log(a>=b);
     // 출력결과 : false


### 동등 연산자(Equality operators)
    :변수의 값이 다른지 같은지 판단하기 위해 사용한다.

    ex) a==b : a가 b와 같다.
        a!=b : a가 b와 같지 않다.

    -let a=1;
     let b='1';

     console.log(a==b);
     // 출력결과 : true
     console.log(a!=b);
     // 출력결과 : false


### 일치 연산자(Strict equality operators)
    :엄격하게 동일한지 체크하기 위해 사용한다.

    ex) a===b : a가 b와 값과 자료형이 모두 같다.
        a!==b : a가 b와 값이나 자료형이 같지 않다.

    -let a=1;
     let b='1';

     console.log(a===b);
     // 출력결과 : false
     console.log(a!==b);
     // 출력결과 : true


### 이진 논리 연산자(Binary logical operators)
    :true와 false 값만을 사용하는 boolean 을 쓸 때 사용한다.

    ex) a&&b : a와 b가 모두 true일 경우에만 true
        a||b : a 또는 b가 true일 경우에는 true('or연산')

    -let a=true;
     let b=false;

     console.log(a&&b);
     // 출력결과 : false
     console.log(a||b);
     // 출력결과 : true


### 조건부 연산자(Conditional operator)
    :조건에 따라서 결과가 두 개로 나눠지게 되는데,
     삼항 연산자(Ternary operator)라고도 부른다.
    -조건식?true일 경우:false일 경우

    -let a=true;
     let b=false;

     console.log(a ? 1 : 2);
     // 출력결과 : 1    // a의 값이 true 이기 때문에 첫번째 항 출력
     console.log(b ? 1 : 2);
     // 출력결과 : 2    // b의 값이 false 이기 때문에 두번째 항 출력


-출처:인프런 강의[처음 만난 리액트(React)]
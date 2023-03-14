# styled-components

### styled-components 설치

<aside>
👉 #npm을 사용하는 경우
npm install —save styled-components

#yarn을 사용하는 경우
yarn add styled-components

</aside>

```jsx
import React from "react";
import styled from "styled=-components";

const Wrapper = styled.div`
  padding: 1em;
  background: grey;
`;

const Title = styled.h1j`
  font-size: 1.5em;
  color: white;
  text-align: center;
`;

function MainPage(props) {
  return (
    <Wrapper>
      <Title>안녕, 리액트!</Title>
    </Wrapper>
  );
}

export default MainPage;
```

### styled-components 기본사용법

<aside>
👉 tageed template literal을 사용하여 구성요소를 지정한다.

</aside>

### literal

<aside>
👉 소스코드에 고정 된 값을 의미한다.(상수와는 다른 개념)

</aside>

```jsx
// 정수 리터럴 (Integer literal)
const myNumber = 10;

// 문자열 리터럴 (String literal)
const myStr = "Hello";

// 배열 리터럴 (Array literal)
const myArray = [];

// 객체 리터럴 (Object literal)
const myObject = {};
```

### template literal

<aside>
👉 리터럴을 템플릿 형태로 사용하는 자바스크립트 문법

</aside>

```jsx
// Untagged template literal
// 단순한 문자열
"string text"// 여러줄(Multi-line)에 걸친 문자열
`string text line 1
 string test line 2`// 대체 가능한 expression이 들어있는 문자열
`string text ${expreesion} string text`;

// Tagged template literal
// myFunction의 파라미터로 expression으로 구분된 문자열 배열과 expression이 순서대로
// 들어간 형태로 호출 됨
myFunction`string textg ${expression} string text`;
```

```jsx
const name = "은진";
const region = "인천";

function myTagFunction(strings, nameExp, regionExp) {
  let str0 = strings[0]; // "제 이름은 "
  let str1 = strings[1]; // "이고, 사는 곳은 "
  let str2 = strings[2]; // "입니다."

  // 여기에서도 template literal을 사용하여 리턴할 수 있음
  return `${str0}${nameExp}${str1}${regionExp}${str2}`;
}

const output = myTagFunction`제 이름은 ${name}이고, 사는 곳은 ${region}입니다.`;

// 출력결과
// 제 이름은 은진이고, 사는 곳은 인천입니다.
console.log(output);
```

### styled-components 사용 예시

```jsx
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1em;
  background: grey;
`;
```

### styled-components의 props 사용하기

```jsx
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: ${(props) => (props.dark ? "white" : "dark")};
  background: ${(props) => (props.dark ? "black" : "white")};
  border: 1px solid black;
`;

function Sample(props) {
  return (
    <div>
      <Button>Normal</Button>
      <Button dark>Dark</Button>
    </div>
  );
}

export default Sample;
```

### styled-components의 스타일 확장하기

```jsx
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: ${(props) => (props.dark ? "white" : "dark")};
  background: ${(props) => (props.dark ? "black" : "white")};
  border: 1px solid black;
`;

// Button에 style이 추가 된 RoundedButton 컴포넌트
const RoundedButton = styled(Button)`
  border-radius: 16px;
`;

function Sample(props) {
  return (
    <div>
      <Button>Normal</Button>
      <RoundedButton>Rounded</RoundedButton>
    </div>
  );
}

export default Sample;
```

### styled-components 더 다양하게 공부하기

<aside>
👉 http://styled-components.com/docs

</aside>

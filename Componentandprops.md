# Components and Props

### Component-Based

<aside>
👉 React는 Component 기반의 구조이다.
모든 페이지가 Component로 구성되어 있고,
하나의 Component는 또 다른 여러개의 Component의 조합으로 구성 될 수 있다.

</aside>

<aside>
👉 레고 블록 조립하듯 컴포넌트들을 모아서 개발함

</aside>

### Props

<aside>
👉 :Property의 줄임말(리액트에서는 속성이라는 뜻으로 사용됨)
:Component 의 속성

</aside>

<aside>
👉 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 객체

</aside>

# Props의 특징 및 사용법

### Props의 특징

<aside>
👉 Read-Only : 읽기전용
→ 값을 변경 할 수 없다.
(붕어빵이 다 구워졌는데 속재료를 바꿀 수 없다.)

</aside>

### 다른 Props의 값으로 Element를 생성하려면?

<aside>
👉 새로운 값을 컴포넌트에 전달하여 새로 Element를 생성

</aside>

### JavaScript 함수의 속성

```jsx
function sum(a, b) {
  return a + b;
}
```

- a와 b라는 parameter 값을 변경하지 않고 있다.
- ‘Pure’한 함수 : 입력값(input)을 변경하지 않으며,
  같은 입력값에 대해서는 항상 같은 출력값(output)을 리턴한다.

```jsx
function withdraw(accout, amount) {
  account.total -= amount;
}
```

- 계좌에서 출금을 하는 함수
- accout와 amount라는 parameter 값을 받아서
  account의 total 값에서 amount를 빼는 함수.
- 은행 계좌와 총액을 parameter로 받아서
  계좌의 총 잔액을 나타내는 total에서 출금할 금액인 amount를 빼는 것.
- ‘Impure’한 함수 : 입력으로 받은 parameter account 의 값을 변경
  입력값(input)을 변경

### All React components must act like pure functions with respect to their props.

<aside>
👉 모든 리액트 컴포넌트는 그들의 Props에 관해서는 Pure 함수 같은 역할을 해야한다.

</aside>

<aside>
👉 모든 리액트 컴포넌트는 Props를 직접 바꿀 수 없고, 같은 Props에 대해서는 항상 같은 결과를 보여줄 것

</aside>

### Props 사용법

```jsx
// jsx를 사용한 형태

function App(props) {
  return (
    <Profile
      name="소플"
      introduction="안녕하세요, 소플입니다."
      viewCount={1500}
    />
  );
}

// jsx를 사용하지 않은 코드

React.createElement(
  profile,
  {
    name: "소플",
    introduction: "안녕하세요, 소플입니다.",
    viewCount: 1500,
  },
  null
);
```

```jsx
function App(props) {
  return (
    <Layout
      width={2560}
      height={1400}
      header={<Header title="소플의 블로그입니다." />}
      footer={<Foother />}
    />
  );
}
```

# Component 만들기 및 렌더링

### Function Component

```jsx
ex) 함수 컴포넌트

function Welcome(props) {
		return <h1>안녕, {props.name}</h1>;
}
```

### Class Component

```jsx
ex) 클래스 컴포넌트

class Welcome extends React.Component {
		render() {
				return <h1>안녕, {this.props.name}</h1>;
		}
}
```

### Component의 이름

<aside>
👉 Component 이름은 항상 대문자로 시작해야 한다.
(React는 소문자로 시작하는 Component를 DOM 태그로 인식한다)

</aside>

```jsx
// HTML div 태그로 인식

const element = <div />;
```

```jsx
// Welcome이라는 리액트 Component로 인식

const element = <Welcome name="인제" />;
```

### Component 렌더링

```jsx
// DOM 태그를 사용한 element

const element = <div />;
```

```jsx
// 사용자가 정의한 Component를 사용한 element

const element = <Welcome name="인제" />;

// 렌더링하기

function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
}
const element = <Welcome name="인제" />;
ReactDOM.render(element, document.getElementById("root"));
```

# Component 합성과 추출

### Component 합성

<aside>
👉 Component 안에 또 다른 Component를 쓸 수 있다.
복잡한 화면을 여러 개의 Component로 나눠서 구현 가능

</aside>

```jsx
// Welcome Component를 사용해서 Component 합성하기

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App(props) {
  return (
    <div>
      <Welcome name="Mike" />
      <Welcome name="Steve" />
      <Welcome name="Jane" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### Component 추출

<aside>
👉 큰 컴포넌트를 산산조각내기
- 재사용성이 올라간다
- 개발 속도가 향상된다

</aside>

```jsx
// 예제 : 댓글을 표시하기 위한 컴포넌트

function Comment(props) {
  return (
    <div className="comment">
      <div className="user-info">
        <img
          className="avatar"
          src={props.author.avatarUrl}
          alt={props.autor.name}
        />
        <div className="user-info-name">{props.author.name}</div>
      </div>

      <div className="comment-text">{props.text}</div>

      <div className="comment-data">{formatDate(props.date)}</div>
    </div>
  );
}

props = {
  author: {
    name: "소플",
    avatarUrl: "http://...",
  },
  text: "댓글입니다.",
  date: Date.now(),
};
```

```jsx
// 컴포넌트 추출하기
// 1. Avatar 추출하기

function Avatar(props) {
  return (
    <img className="avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

// 추출된 Avatar 컴포넌트를 Comment 컴포넌트에 반영하기

function Comment(props) {
  return (
    <div className="comment">
      <div className="user-info">
        <Avatar user={props.author} />
        <div className="user-info-name">{props.author.name}</div>
      </div>

      <div className="comment-text">{props.text}</div>

      <div className="comment-data">{formatDate(props.date)}</div>
    </div>
  );
}
```

```jsx
// 2. UserInfo 추출하기

function UserInfo(props) {
  return (
    <div className="user-info">
      <Avatar user={props.user} />
      <div className="user-info-name">{props.user.name}</div>
    </div>
  );
}

// 추출된 UserInfo 컴포넌트를 Comment 컴포넌트에 반영하기

function Comment(props) {
  return (
    <div className="comment">
      <UserInfo user={props.author} />
      <div className="comment-text">{props.text}</div>

      <div className="comment-data">{formatDate(props.date)}</div>
    </div>
  );
}
```

<aside>
👉 재사용 가능한 Component를 많이 갖고 있을 수록 개발 속도가 빨라진다!

</aside>

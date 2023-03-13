# Event의 정의 및 Event 다루기

### React에서의 Event란?

<aside>
👉 사건. 특정 사건을 의미 함.

</aside>

### DOM의 Event

```jsx
<button onclick="activate()">Activate</button>
```

### React의 Event

```jsx
<button onClick={activate}>Activate</button>
```

### camel Case 란?

<aside>
👉 한글로 카멜 표기법 이라고도 함.
낙타의 등을 보고 만든 이름.

</aside>

### Event Handler

<aside>
👉 어떤 사건이 발생하면, 사건을 처리하는 역할

</aside>

### Event Listener

```jsx
// bind를 사용한 예제
class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isToggleOn: true };

    // callback에서 'this'를 사용하기 위해서는 바인딩을 필수적으로 해줘야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "켜짐" : "꺼짐"}
      </button>
    );
  }
}
```

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
  : bind 에 관련 된 설명

```jsx
// Class fields syntax을 사용한 예제
class MyButton extends React.Component {
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>클릭</button>;
  }
}
```

```jsx
// Arrow function 을 사용한 예제
class MyButton extends React.Component {
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={() => this.handleClick()}>클릭</button>;
  }
}
```

```jsx
function Toggle(props) {
  const [isToggleOn, setIsToggleOn] = useState(true);

  // 방법 1. 함수 안에 함수로 정의
  function handleClick() {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  // 방법 2. arrow function 을 사용하여 정의
  const handleClick = () => {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  };

  return <button onClick={handleClick}>{isToggleOn ? "켜짐" : "꺼짐"}</button>;
}
```

### Arguments 전달하기

<aside>
👉 함수에 주장할 내용
함수에 전달할 데이터
Event Handler에 전달할 데이터

</aside>

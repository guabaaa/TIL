# State and Lifecycle

### State

<aside>
👉 리액트 Component의 상태
(리액트 Component의 데이터)
리액트 Component의 변경 가능한 데이터. state는 개발자가 정의한다

</aside>

- 렌더링이나 데이터 흐름에 사용되는 값만 state에 포함시켜야 함
- state는 JavaScript 객체이다.

```jsx
ex)

class LikeButton extends React.Component {
		constructor(props) {
				super(props);

				this.state = {
						liked: false
				};
		}

		...
}

// constructor : 생성자
```

### state는 직접 수정 할 수 없다(하면 안된다)

```jsx
// state를 직접 수정 (잘못된 사용법)
this.state = {
  name: "Eunjin",
};

// setState 함수를 통한 수정 (정상적인 사용법)
this.setState({
  name: "Eunjin",
});
```

### Lifecycle

<aside>
👉 영단어 뜻 : 생명주기
리액트에서는 : 리액트 Component의 생명주기

</aside>

### Component 생명주기

<aside>
👉 Component가 계속 존재하는 것이 아니라, 시간의 흐름에 따라 생성되고 업데이트 되다가 사라진다.

</aside>

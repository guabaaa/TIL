# Elements의 정의와 생김새

### Elements란?

<aside>
👉 어떤 물체를 구성하는 성분
리액트 앱을 구성하는 가장 작은 블록들

</aside>

<aside>
👉 Elements는 화면에서 보이는 것들을 기술

</aside>

```jsx
//jsx

const element = <h1>Hello, world</h1>;
```

### Elements의 생김새

<aside>
👉 리액트 Elements는 자바스크립트 객체 형태로 존재

</aside>

```jsx

{
		type: 'button',
		props: {
				className: 'bg-green',
				children: {
						type: 'b',
						props: {
							children: 'Hello, element!'
						}
				}
		}
}

{
		type: Button,
		props: {
				colors: 'green',
				children: 'Hello, element!'
		}
}

React.createElement(
		type,
		[props],
		[...children]
)
```

### createElement 함수가 동작하는 과정

```jsx
function Button(props){
		return(
				<button className={`bg-${props.color}`}>
						<b>
								{props.children}
						</b>
				</button>
		)
}

function ConfirmDialog(props){
		return(
				<div>
						<p>내용을 확인하셨으면 확인 버튼을 눌러주세요.</p>
						<Button color='green'>확인</Button>
				</div>
		)
}

{
		type: 'div',
		props: {
				children: [
						{
								type: 'p',
								props: {
										children: '내용을 확인하셨으면 확인 버튼을 눌러주세요.'
								}
						},
						{
								type: Button,
								props: {
										color: 'green',
										children: '확인'
								}
						}
				]
		}
}

{
		type: 'div',
		props: {
				children: [
						{
								type: 'p',
								props: {
										children: '내용을 확인하셨으면 확인 버튼을 눌러주세요.'
								}
						},
						{
								type: 'button',
								props: {
										className: 'bg-green',
										children: {
												type: 'b',
												props: {
														children: '확인'
												}
										}
								}
						}
				]
		}
}
```

# Elements의 특징 및 렌더링하기

### Elements의 특징

<aside>
👉 React elements are immutable

</aside>

### immutable

<aside>
👉 im(부정의의미) + mutable(변할 수 있는)
= immutable(변경할 수 없는, 불변의)

</aside>

### 불변성

<aside>
👉 Elements 생성 후에는 children이나 attributes를 바꿀 수 없다.
(’생성 후’ 중요! Elements 는 다양한 모습으로 생성할 수 있지만 생성 후에는 바꿀 수 없다는 뜻)

</aside>

### Root DOM Node

```jsx
<div id="root"></div>
```

```jsx
const element = <h1>안녕, 리액트!</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

### 렌더링 된 Elements를 업데이트 하기

```jsx
function tick() {
		const element = (
				<div>
						<h1>안녕, 리액트!<h1>
						<h2>현재 시간 : {new Date().toLocaleTimeString()}</h2>
				</div>
		);

		ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

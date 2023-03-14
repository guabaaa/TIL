# 여러개의 Component 렌더링 하기

### map()

<aside>
👉 한쪽에 있는 아이템과 다른 한쪽에 있는 아이템을 짝지어준다는 의미(mapping)
배열에 들어있는 각 변수에 어떤 처리를 한 뒤 return하는 것.

</aside>

```jsx
const doubled = numbers.map((number) => number * 2);
```

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);

ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("root"));
```

```jsx
//최종적으로 렌더링 되는 코드
ReactDOM.render(
  <ul>
    <li>{1}</li>
    <li>{2}</li>
    <li>{3}</li>
    <li>{4}</li>
    <li>{5}</li>
  </ul>,
  document.getElementById("root")
);
```

### 기본적인 List Component

```jsx
// 숫자목록을 출력하는 numberlist component
function NumberList(props) {
  const { numbers } = props;

  const listItems = numbers.map((number) => <li>{number}</li>);

  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

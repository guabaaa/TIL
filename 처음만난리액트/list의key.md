# List의 Key

### 리액트에서의 Key값

<aside>
👉 Key의 값은 같은 List에 있는 Elements사이에서만 ‘고유한 값’이면 된다.

</aside>

```jsx
/** key로 값을 사용하는 경우 */
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

```jsx
/** key로 id를 사용하는 경우 */
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

```jsx
/** key로 index를 사용하는 경우 */
const todoItems = todos.map((todo) => (
  // 아이템들의 고유한 ID가 없을 경우에만 사용해야 함
  <li key={index}>{todo.text}</li>
));
```

<aside>
👉 map() 함수 안에 있는 Elements는 꼭 key가 필요하다!

</aside>

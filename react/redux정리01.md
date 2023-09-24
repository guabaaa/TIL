1. React-Redux 란?
   Redux 는 예측 가능한 상태 컨테이너로 자바스크립트 기반의 프레임 워크에서 모두 쓸 수 있지만, (Angular, Vue, React 등) 리액트에서는 React-Redux 라이브러리를 사용해야 state 와 props 가 연동됩니다. React-Redux 는 React 용 동식 Redux UI 바인딩 라이브러리로 사용하려면 React-Redux 와 Redux 모두 설치해야 합니다.

2. React-Redux 를 사용하는 이유
   2-1. 전역 상태 관리
   기존 리액트에서는 여러 컴포넌트에 걸쳐 있는 상태를 변화시키거나 기준이 되는 컴포넌트와 멀리 떨어진 컴포넌트 간의 데이터를 주고 받기 어려웠습니다. React-Redux 는 이런 문제를 해결하기 위해 중앙에서 Store 를 통해 전역으로 상태를 관리해 여러 컴포넌트를 거치지 않고 바로 상태 값을 받을 수 있습니다.

2-2. props drilling(프로퍼티 내리꽂기)
하위 컴포넌트가 깊어지고 전달하는 컴포넌트가 많아질 수록 props 를 추적하거나 유지보수하기 어려워집니다. React-Redux 는 이런 props drilling 을 막고 멀리 떨어진 컴포넌트도 중앙 데이터 저장소, Store 에서 직접 전달할 수 있습니다.

2-3. Redux 의 여러 기능들을 React 의 API 에 맞도록 감싸 놓은 UI Binding 라이브러리
createStore combineReducer API 는 리덕스에서 제공하며 리액트 리덕스는 리덕스의 기능을 리액트에서 같이 사용할 수 있도록 Provider 컴포넌트, useSelector, useDispatch 같은 리액트 전용 훅을 제공합니다.

2-4. Redux 와 React-Redux API 예시
2-4-1. Redux API
createStore - store 를 생성합니다.

// store.js

import { createStore } from 'redux';
import { rootReducer } from 'app.js';

const store = createStore(rootReducer);

export default store;
combineReducer - 여러 개의 slice를 결합하여 하나의 root reducer 를 만듭니다.

// reducer.js

import { createStore, combineReducers } from 'redux';

const counterInitialState = { counter: 0 };

export const counter = (state = counterInitialState, action) => {
switch (action.type) {
case 'INCREMENT':
return { ...state, counter: state.counter + 1 };
case 'DECREMENT':
return { ...state, counter: state.counter - 1 };
default:
return state;
}
};

const cartInitialState = [];

export const cart = (state = cartInitialState, action) => {
switch (action.type) {
case 'ADD_ITEM':
return [...state, action.payload];
case 'DELETE_ITEM':
return state.filter((product) => product.id !== action.payload.id);
default:
return state;
}
};

const rootReducer = combineReducers({ counter, cart });
const store = createStore(rootReducer);

export default store;
2-4-2. React-Redux API
Provider - react app 전체에 제공할 store를 주입하는 컴포넌트 입니다.

// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './App';

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
document.getElementById('root')
);
useSelector - store의 state에 접근하는 hook 입니다. useState의 state 처럼 활용합니다.

// Counter.js

import React from 'react';
import { useSelector } from 'react-redux';

const Counter = () => {
const count = useSelector((state) => state.counter);
return <div>{count}</div>;
};

export default Counter;
useDispatch - action을 reducer로 보내는 역할입니다. useState의 setState 처럼 씁니다.

// Count.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Count = () => {
const dispatch = useDispatch();
const count = useSelector((state) => state.counter);

const increase = () => {
dispatch({ type: 'INCREASE' });
};

const decrease = () => {
dispatch({ type: 'DECREASE' });
};
return (
<div>
<h1>{count}</h1>
<button onClick={increase}>increment</button>
<button onClick={decrease}>decrement</button>
</div>
);
};

export default Count;
3. Ducks 패턴
   3-1. Ducks 패턴이란?
   Ducks 패턴은 redux 구성 요소인 Action Type, Action, Reducer 셋을 하나의 파일 안에서 관리하는 패턴입니다. Ducks 패턴은 구조 중심으로 파일을 나누는 것이 아니라 기능별로 나누는 방식으로 하나의 파일안에서 관리하는 방법입니다. 수정사항을 하나의 파일에서만 수정하면 되므로 직관적으로 코드를 작성할 수 있습니다.



3-2. Ducks 패턴 규칙
Reducer 파일안에 Action type 과 Action Creator 함수를 함께 넣어서 관리하고, 이를 Module(모듈)이라고 합니다. 이 패턴(모듈)의 규칙은 아래와 같습니다.

MUST export default a function called reducer()
반드시 reducer 함수를 export default 해야 합니다.

MUST export its action creators as functions
반드시 action creator 함수를 export 해야 합니다.

MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
반드시 action types 의 네이밍 규칙을 npm-module-or-app/reducer/ACTION_TYPE 이런식으로 해야 합니다. 만약 NPM 모듈을 만드는 게 아니라면 reducer/ACTION_TYPE 형식으로 만들어도 됩니다. 리듀서에서 액션 이름이 중첩되지 않도록 접두사를 답니다.

MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
필수는 아니지만 외부 리듀서가 모듈 내 액션 타입을 바라보거나 모듈 재사용이 가능한 라이브러리로 쓰인다면 액션 타입을 UPPER_SNAKE_CASE 형태로 export 하면 됩니다.

// Ducks 패턴 규칙 예시
// module/counter.js

// Actions
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// Action Creators
export function increase() {
return { type: INCREASE };
}

export function decrease() {
return { type: DECREASE };
}

// Reducer
export default function counterReducer(state = {}, action = {}) {
switch (action.type) {
case INCREASE:
return {...state, state.counter + 1}
case DECREASE:
return {...state, state.counter - 1}
default:
return state;
}
}
4. React-Redux 예제
   4-1. store 생성과 Provider 컴포넌트로 전역에 store 주입 예시
   // src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux';

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Provider store={store}>
<Router />
</Provider>
);
4-2. reducer 와 actionCreator, action type (duck 패턴 적용된 Module 파일)
// src/module/counter.js

// Action Type
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// Action Creator & Action
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const counterInitialState = { count: 0 };

// Reducer
const counter = (state = counterInitialState, action) => {
switch (action.type) {
case INCREASE:
return { count: state.count + 1 };
case DECREASE:
return { count: state.count - 1 };
default:
return state;
}
};

export default counter;
// src/module/cart.js

// Action Type
const ADD_ITEM = 'cart/ADD_ITEM';
const DELETE_ITEM = 'cart/DELETE_ITEM';

// Action Creator & Action
export const addItem = (item) => ({ type: ADD_ITEM, payload: item });
export const deleteItem = (id) => ({ type: DELETE_ITEM, payload: id });

const cartInitialState = [{ id: 1, productName: 'nacho', price: 2000 }];

// Reducer
const cart = (state = cartInitialState, action) => {
switch (action.type) {
case ADD_ITEM:
return [...state, action.payload];
case DELETE_ITEM:
return state.filter((product) => product.id !== action.payload);
default:
return state;
}
};

export default cart;
4-3. 각각의 reducer 를 합치는 rootReducer 예시
// src/redux/index.js

import { combineReducers } from 'redux';
import counter from '../module/counterReducer';
import cart from '../module/cartReducer';

const rootReducer = combineReducers({ counter, cart });

export default rootReducer;
4-4. 렌더링 할 view 예시
// src/View/Product.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
increase,
decrease,
addItem,
deleteItem,
} from '../module/counterReducer';

const Product = () => {
const counter = useSelector((state) => state.counter.count);
const cart = useSelector((state) => state.cart);
const dispatch = useDispatch();

const onIncrease = () => {
dispatch(increase());
};

const onDecrease = () => {
dispatch(decrease());
};

const cartAddItems = () => {
dispatch(addItem({ id: 2, productName: 'chilly', price: 3000 }));
};

const cartDeleteItems = () => {
dispatch(deleteItem(2));
};

return (
<div className="App">
<h1>Hello Redux</h1>
<p>{counter}</p>
<button onClick={onIncrease}>+</button>
<button onClick={onDecrease}>-</button>
{cart.map((item) => {
return <p key={item.id}>{item.productName}</p>;
})}

      <button onClick={cartAddItems}>아이템 추가</button>
      <button onClick={cartDeleteItems}>아이템 삭제</button>
    </div>
);
};

export default Product;

- 출처 : https://velog.io/@rayong/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%8D%95%EC%8A%A4-React-Redux
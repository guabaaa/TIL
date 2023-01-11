import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

function App() {
  let counter = 0;
  const [counter2, setCounter2] = useState(0);
  const increase = () => {
    counter = counter + 1;
    setCounter2(counter2 + 1);
    console.log("counter는:", counter, "counter2 state는:", counter2);
  };

  // 1. 유저가 버튼을 클릭한다.
  // 2. counter+1  해서 1이 됨
  // 3. setState함수 호출
  // 4. console.log 실행됨
  // 변수값은 1로 보이고 state 값은 아직 안변했기 때문에 그 전의 값이보인다.
  // 함수 끝
  // app이 다시 re render 됨
  // let counter =0 을 거치면서 counter 값은 다시 0으로 초기화가 된다.
  // state 값은 update 된 state 값이 보인다.
  return (
    <div>
      <div>{counter}</div>
      <div>state:{counter2}</div>
      <button onClick={increase}>클릭!</button>
    </div>
  );
}

export default App;

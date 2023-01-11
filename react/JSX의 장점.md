# JSX의 장점

### 간결한 코드

    - JSX 사용함
    : <div> Hello, {name}</div>

    - JSX 사용안함
    : React.createElement('div',null,'Hello, ${name}');

</br>

### 가독성이 올라가 버그를 발견하기 쉬움

</br>
</br>

### Injection Attacks 방어

    - (예제) title 이라는 변수에 잠재적으로 보안위험 가능성이 있는 코드가 삽입되었다.
    : const title = response.potentiallyMaliciousInput;

    // 이 코드는 안전합니다.
    const element = <h1>{title}</h1>;

-출처:인프런 강의[처음 만난 리액트(React)]

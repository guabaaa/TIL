# JSX란 무엇인가

### jSX(Java Script XML)

    : JavaScript에 XML/HTML 을 추가하여 화장한 문법이다.
    - JSX는 React로 Project를 개발할 때 사용 된다. -> 공식적인 JavaScript 문법은 아니다.
    - 브라우저에서 실행하기 전에 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환된다.
    - JSX는 하나의 파일에 자바스크립트와 HTML을 동시에 작성하여 편리하다.

### JSX 문법

    -  JSX를 사용한 코드

        class Hello extends React.Component {
        render(){
        return <div>Hello {this.props.toWhat}</div>
        }
    }
        ReactDOM.render(
            <Hello toWhat="World" />,
            document.getElementById('root')
        );


    -  위 코드랑 같으나 jsx를 사용하지 않은 코드

        class Hello extends React.Component {
            render(){
            return React.createElement('div',null, 'Hello ${this.props.toWhat}');
            }
        }

        ReactDOM.render(
            React.cloneElement(Hello, {toWhat: 'World'}, null),
            document.getElementById('root')
        );


    - JSX에 쓰이는 문법들

        const element ={
            type : 'h1',
            props: {
                className: 'greeting',
                children: 'Hello, world!'
            }
        }

        React.createElement(
            type,
            [props],
            [...children]
        )

-출처:인프런 강의[처음 만난 리액트(React)]

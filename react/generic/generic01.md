## 제네릭(generic)이란?

자바에서 제네릭(generic)이란 데이터의 타입(data type)을 일반화한다(generalize)는 것을 의미한다.

제네릭은 클래스나 메소드에서 사용할 내부 데이터 타입을 컴파일 시에 미리 지정하는 방법.

이렇게 컴파일 시에 미리 타입 검사(type check)를 수행하면 아래와 같은 장점을 가진다.

<aside>
💡 1. 클래스나 메소드 내부에서 사용되는 객체의 타입 안정성을 높일 수 있다
2. 반환값에 대한 타입 변환 및 타입 검사에 들어가는 노력을 줄일 수 있다.

</aside>

JS는 원래 타입 선언이 필요하지 않고, 그렇기에 특정 타입을 위해 만들어진 클래스나 함수도 타입 에러를 런타임에서 일으킬 뿐이다.

코드를 실행시키기 전까지는 함수와 클래스가 모든 타입에 대응한다.

## 제네릭을 사용하는 이유

제네릭을 유용하게 사용할 수 있는 경우는 자료구조가 있다.

```tsx
class Stack {
	private data: any[] = [];

	constructor() {}

	push(item:any): void {
		this.data.push(item);
	}

	pop(): any {
		return this.data.pop();
	}
}
```

- any를 이용하여 구현하면 저장하고 있는 자료의 타입이 모두 같지 않다는 문제점이 생긴다.

따라서 위의 스택에서 자료를 추출하는 경우 런타임에서 항상 타입 검사를 해줘야 한다는 것.

```tsx
const stack = new Stack();
stack.push(1);
stack.push('a');
stack.pop().substring(0)  // 'a'
stack.pop().substring(0)  // Throw TypeError
```

- 그렇다고 자료형을 보장하기 위해 항상 number 타입의 변수만 받을 수 있도록 하면, 범용성이 떨어진다.

```tsx
class NumberStack extends Stack {
	constructor() {
		spuer();
	}

	push(item: number): void {
		super.push(item);
	}

	pop(): number {
		return super.pop();
	}
}
```

- 하지만 상속을 사용하는 경우에는 자료형을 하나 추가할 때마다 구태여 클래스를 추가하고 중복되는 코드를 양산해야하기 때문에 번거롭기는 마찬가지.

## 제네릭의 문법

### 클래스

스택 자료구조를 제네릭으로 다시 구현하면 다음과 같은 형태를 띈다.

```tsx
class Stack<T> {
	private data: T[] = [];

	constructor() {}

	push(item: T): void {
		this.data.push(item);
	}

	pop(): T {
		return this.data.pop();
	}
}
```

- 클래스 식별자 선언부에 <T>라는 못보던 문법이 추가된 것을 확인할 수 있다. 제네릭을 사용하겠다는 의미로 꺽쇠(Angle brackets)를 넣고 그 안에 타입으로 사용되는 식별자를 집어넣는다.
- T는 Type의 약자로 다른 언어세어도 제네릭을 선언할 때 관용적으로 많이 사용된다. 이 부분에는 식별자로 사용할 수 있는 것이라면 무엇이든 들어갈 수 있다. 이를테면 $나 _도 가능하다는 의미. 하지만 대개의 경우 T를 사용한다. 여기에서 T를 타입변수(Type variables)라고 한다.
- 이렇게 클래스에서 제네릭을 사용하겠다고 선언한 경우 T는 해당 클래스에서 사용할 수 있는 특정한 타입이 된다.

```tsx
const numberStack = new Stack<number>();
const stringStack = new Stack<string>();
numberStack.push(1);
stringStack.push('a');
```

- 이제 각 스택은 항상 생성할 때 선언한 타입만을 저장하고 리턴한다. 이렇게하면 컴파일러가 리턴하는 타입을 알 수 있게 되므로 에디터에서 자동 완성을 사용할 수 있게 되므로 생산성 향상에도 기여한다는 장점이 있다.
  다만 타입은 컴파일 단계에서 검사하는 것이므로 런타임에서는 막을 수 없다. 예를 들면,

```tsx
numberStack.push('' as any);
```

- 이런 코드는 컴파일 단계의 타입 체크를 우회하므로 막을 수 없다.

### 함수

배열을 입력받아 그 배열의 첫번째 요소를 출력하는(lodash.head() 같은)함수를 구현해야 한다고 가정했을 때, 제네릭을 사용하지 않는 경우 이렇게 짜게 된다.

```tsx
function first(arr: any[]): any {
	return arr[0];
}
```

- 위 코드는 마찬가지로 어떤 타입의 배열이라도 받을 수 있기 때문에 리턴하게 되는 타입이 무엇인지 알 수 없다. 제네릭을 이용하면 다음과 같이 간단하게 구현할 수 있다.

```tsx
function first<T>(arr: T[]): T {
		return arr[0];
}
```

- 추가된 것은 클래스와 동일하게 함수 식별자 옆에 들어가는 <T>이다. 마찬가지로 이 함수 내에서는 T는 특정한 타입으로 취급된다.
  마찬가지로 사용할 때는 함수를 호출할 때 제네릭 문법으로 타입을 정해주기만 하면 된다.

```tsx
first<number>([1,2,3]);  //1
```

## 두 개 이상의 타입 변수

제네릭 함수나 클래스에서는 두 개 이상의 타입 변수도 사용할 수 있다. 다음과 같이 두 가지 변수를 받아 쌍으로 만들어 반환하는 함수를 구현해야 한다고 가정하자.

```tsx
function toPair(a: any, b: any): [any,any] {
	return [a,b];
}
```

- 입력되는 두 가지의 변수의 타입이 다르다고 가정할 경우 두 가지의 타입 변수가 필요하게 된다.

```tsx
function toPair<T,U>(a: T, b: U): [T,U] {
	return [a,b];
}
```

- 제네릭을 사용하면 위와 같은 형태로 구현할 수 있다.
  꺽쇠 안에 T와 U 두 가지의 타입 변수가 보일 것이다. 아까 관용적으로 T를 사용한다고 말했는데, 그 뒤로는 알파벳 순서대로 사용하면 된다. 반복문에서 관용적으로 인덱스 변수로 i,j를 사용하는 것과 비슷하다.

```tsx
toPair<string, number>('1',1);  // ['1',1]
toPair<number, number>(1,1);    // [1,1]
```

### 상속된 타입 변수

타입 변수는 기존에 사용하고 있는 타입을 상속할 수도 있다. 이 점을 이용하면 입력 받을 변수의 타입을 제한할 수 있다.
또한 에디터가 해당 타입의 메소드나 프로퍼티를 예측할 수 있으므로 자동 완성이 된다.

이것과 여러 개의 타입 변수를 사용해 응용하면 아래와 같은 코드를 짤 수 있다.

```tsx
function getFirst<T extends Stack<U>, U>(container: T): U {
	const item = container.pop();
	container.push(item);
	return item;
}
```

- getFirst는 입력받은 스택의 첫번째 요소를 반환하는 함수이다. 사용시에는 아래처럼 사용하면 됨.
  만약 첫 번째 타입으로 스택, 혹은 스택을 상속한 타입이 아닌 다른 타입을 사용하면 에러가 발생한다.

```tsx
getFirst<Stack<number>, number>(numberStack);
getFirst<number,number>(1);   // Type 'number' does not satisfy the constraint 'Stack<number>'.
```
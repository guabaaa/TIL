# React Query를 사용하여 서버 상태를 관리하는 방법

## 🪄 React Query란?

<aside>
💡 React 어플리케이션에서 데이터 패칭과 캐싱 프로세스를 간소화하는 라이브러리.
API와 기타 데이터 소스로부터 데이터를 페칭하고 업데이트하는데 필요한 도구와 유틸리티를 제공.
데이터 페칭의 상태와 캐싱을 자동으로 관리한다.

</aside>

## 🪄 클라이언트 상태 vs 서버 상태

|  |                      클라이언트 상태 |                            서버 상태 |
| --- | --- | --- |
| 위치 | 클라이언트(브라우저 또는 기기)에 저장된 데이터 | 서버나 외부 데이터 소스에 저장된 데이터 |
| 접근성 | 저장한 클라이언트만 접근 가능 | 접근 권한이 있는 모든 클라이언트
접근 가능 |
| 데이터 관리 | 클라이언트에서 관리(예: Redux와 같은 상태 관리 라이브러리 사용) | 서버에서 관리(예 : 데이터베이스 사용) |
| 지속성 | 세션 간에 지속성이 유지되거나
유지되지 않을 수 있음 | 일반적으로 세션 간에 지속성 유지 |
| 네트워크 요청 | 데이터를 가져오거나 업데이트하려면
네트워크 요청이 필요할 수 있음 | 데이터 접근 또는 업데이트를 위해
네트워크 요청이 필요할 수 있음 |
| 보안 | 클라이언트가 액세스할 수 있고 변조
또는 가로채기의 대상이 될 수 있으므로
보안 수준이 낮을 수 있음 | 인증 및 암호화로 보호할 수 있으므로
더 안전할 수 있음 |
| 성능 | 네트워크 요청이 필요하지 않기 때문에
서버 상태에 비해 접근하고
업데이트하는 속도가 빠를 수 있음 | 네트워크 요청이 필요할 수 있으므로
클라이언트 상태에 비해 접근하고
업데이트하는 속도가 느릴 수 있음 |
| 확장성 | 클라이언트 기기의 용량에 제한을 받을 수 있기 때문에 서버 상태보다 확장성이
떨어질 수 있음 | 전용 서버나 고용량의 데이터 소스로
관리되기 때문에 클라이언트 상태보다
확장성이 더 높을 수 있음 |
| 예시 | 컴포넌트 상태, Redux 상태, 브라우저 쿠키 | 데이터베이스 레코드, API 응답, 서버 세션 데이터 |

## 🪄 React Query에서의 네 가지 기본 개념

1. 쿼리(Queries):
- API 엔드포인트나 데이터베이스와 같은 원격 데이터 소스로부터 데이터를 요청
- useQuery 훅을 사용하여 관리됨
2. 뮤테이션(Mutations):
- 서버에 새로운 데이터를 추가하거나 기존 데이터를 수정하는 요청
- useMutation 훅을 사용하여 관리됨
3. 쿼리 캐싱(Query Caching):
- 쿼리 캐싱은 React Query의 내장 기능으로, 쿼리 결과를 메모리에 저장
4. 쿼리 무효화(Query Invalidation):
- 쿼리를 무효화하거나 오래된 상태로 표시하는 과정

## 🪄 useQuery 훅으로 데이터 페칭

<aside>
💡 공식 문서 : “쿼리는 고유 키에 연결된 데이터의 비동기 소스에 대한 선언적 종속성(declarative dependency)”

위 내용에서 선언적 종속서은 코드(useQuery훅 사용)에서 선언한 쿼리를 나타낸다.
이 쿼리는 API 데이터 포인트 or 데이터베이스에서 비동기적으로 데이터를 가져오도록 서버에 요청하는 것.

</aside>

useQuery 훅은 두 가지 필수 옵션(프로퍼티)을 사용한다.

1. 고유한 키
2. promise를 반환하는 함수

```tsx
// 코드 구문
const query = useQuery( { queryKey: [ 'key' ], queryFn: callback }) 
```

- querykey는 고유한 키. React Query의 최신 안정 버전에서는 이 키를 지정하기 위해 배열 표기법을 사용해야 한다.
- queryFn은 useQuery 훅이 호출될 때 React Query에 의해 실행되는 콜백 함수이다. 이 함수는 useQuery 훅의 실행 중에
  특정 시점에서 명세한 작업(데이터 페칭)을 수행한다.
- 두가지 옵션 외에 선택적 프로퍼티를 가질 수도 있다.

```tsx
// 예시
const getProducts = () => fetch('https://jsonplaceholder.typicode.com/users")
													.then( res => res.json() )

const query = useQuery( { queryKey: ['users'], queryFn: getTodos })
```

### 🔎 무엇을 반환하는가?

useQuery 훅은 객체를 반환한다.

이 객체는 쿼리의 상태에 대한 정보가 포함되어 있다.

**프로퍼티**

1. data : 성공적으로 페칭된 경우 쿼리로부터 반환된 데이터
2. error : (에러가 발생했다면) 쿼리 도중 발생한 모든 에러
3. isLoading : 쿼리가 현재 로딩 중인지 여부를 나타내는 불리언 값
4. isError : 쿼리 결과가 오류인지 여부를 나타내는 불리언 값

**메서드**

- refetch : 쿼리 데이터를 수동으로 리패치 하도록 트리거하는 함수
- remove : 캐시에서 특정 쿼리를 제거할 수 있는 함수

따라서, 이러한 프로퍼티들의 값에 접근하기 위해 자바스크립트 구조 분해 할당을 사용할 수 있다.

```tsx
const { isLoading, isError, data, error } = useQuery( { queryKey: ['todos'], queryFn: getTodos });
```

## 🪄 useQuery와 데이터 리페칭 API

기본적으로, useQuery는 컴포넌트가 처음으로 마운트될 때 API에서 데이터를 자동으로 페칭한다.

그러나 데이터의 이후 업데이트는 자동으로 가져오지 않는다.

다시 말해, API엔드포인트나 서버에서 업데이트가 발생한 후에도 useQuery 는 데이터를 다시 가져오지 않는다.

기본적으로, useQuery의 옵션인 refetchOnMount, refetchOnReconnect, refetchOnWindowFocus 와 같은 값들은
true로 설정된다.

|             useQuery 옵션 |                                                       역할 |  기본값 |
| --- | --- | --- |
| refetchOnWindowFocus | 데이터가 오래된(stale) 경우 브라우저 창이 포커스 되면 리패칭 | true |
| refetchOnMount | 데이터가 오래된 경우 마운트 시 리패치 | true |
| refetchOnReconnect | 데이터가 오래된 경우 재연결 시 리패치 | true |

브라우저를 백그라운드에서 유휴(idle) 상태로 유지하는 상황을 가정해 보았을 때,

누군가는 API 데이터/서버를 업데이트하기 위해 요청을 보내고 데이터가 업데이트 된다.

그러나 브라우저는 백그라운드에 있기 때문에 UI가 업데이트되지 않습니다.

useQuery에는 API 엔드포인트/서버에서 업데이트된 데이터를 다시 가져올 트리거가 없다.

이러한 상황에서는 refetchInterval 옵션을 사용할 수 있다.

이 옵션을 사용하면 지정된 밀리초 단위의 주기로 useQuery를 실행하여 데이터를 다시 가져올 수 있다.

이렇게 하면 브라우저 창이 유휴(idle) 상태일 때에도 데이터를 다시 가져올 수 있다.

## 🪄 useMutation 훅을 사용하여 데이터를 생성, 업데이트 및 삭제

이 훅을 사용하여 API  엔드포인트나 서버에서 데이터를 생성, 업데이트 또는 삭제할 수 있다.

useMutation 훅은 적어도 하나의 옵션을 필요로 하며, 다른 옵션은 모두 선택적이다.

```tsx
// 코드 구문
const mutation = useMutation({ mutationFn: mutationFunction })
```

```tsx
// 예시
const AddUser = useMutation({
			mutationFn: ( user ) => {

				return fetch('https://jsonplaceholder.typicode.com/users',
				{
						method: 'post',
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify( user )
					}).then( res => res.json() )
				})
```

## 🪄 무엇을 반환하는가

useMutation 훅은 객체를 반환한다. 이 객체에는 뮤테이션과 상호작용하고 결과를 처리하는 데 사용할 수 있는 여러 프로퍼티와 메서드가 포함되어 있다.

프로퍼티

- isLoading : 현재 뮤테이션이 진행 중인지 여부를 나타내는 불리언 값
- isSuccess : 뮤테이션이 성공적으로 완료되었는지 여부를 나타내는 불리언 값
- isError : 뮤테이션 중에 오류가 발생했는지 여부를 나타내는 불리언 값
- data : (데이터가 있다면) 뮤테이션에 의해 반환된 데이터

메서드

- mutate : 이 뮤테이션을 실행하기 위해 호출할 수 있는 함수. 첫 번째 인자로 필요한 변수를 가진 객체를 전달 가능
- reset : 뮤테이션을 초기 상태로 리셋하는 함수
- onSuccess : 뮤테이션이 성공적으로 완료되었을 때 호출된 콜백을 정의할 수 있는 함수
- onError : 뮤테이션 중 오류가 발생했을 때 호출된 콜백을 정의할 수 있는 함수

## 🪄 React Query에서의 쿼리 캐싱

useQuery 훅을 사용하여 원격 서버에서 일부 사용자 데이터를 가져오는 경우가 있다고 가정할 때,

데이터를 받는 동안 시간이 걸릴 수 있다. React Query는 이 사용자 데이터를 캐시에 저장하여 이후 동일한 요청 시 더 빠르게 찾을 수 있도록 한다.

이를 통해 데이터 로드하는 데 걸리는 시간을 줄일 수 있다.

useQuery 훅은 고유한 키를 사용한다. 서버에서 반환된 데이터는 이 키 아래에 캐시된다.

예를들어, [’users’]를 키로 사용한다면, 이 키는 캐시에서 동일한 API 엔드포인트에 대한 후속 요청 데이터를 추출하는 데 사용 된다.

기본적으로 useQuery는 이 캐시 데이터를 오래된(stale) 상태로 표시한다. React Query 캐싱과 관련된 두 가지 옵션을 알아야 한다.

**staleTime** : 쿼리 결과가 오래된 것으로 간주되는 데 걸리는 시간을 결정한다. 시간은 밀리초로 지정된다.

ex) staleTime: 5000 // 데이터는 최대 5초 동안 stale 상태로 유지됨

**이는 데이터가 5초가 지난 후에 stale 상태가 됨을 의미한다.**

**cacheTime** : 쿼리 결과가 캐시에 유지되는 시간을 지정한다.

ex) cacheTime: 60000 // 데이터가 1분 동안 캐시에 유지됨

**이는 쿼리 결과가 1분 동안 캐시에 유지되며 그 이후에는 데이터가 가비지 컬렉션됨을 의미한다.**

```tsx
const query = useQuery({
			queryKey: ['users'],
			queryFn: getusers,
			staleTime: 5000,
			cacheTime: 60000
		})
```

## 🪄 React Query에서의 쿼리 무효화(Invalidation)

캐시에 저장된 데이터는 staleTime 옵션에 따라 오래된 데이터로 처리될 수 있다.

그러나 특정 상황에서는 staleTime을 무시하고 데이터를 무효화시키거나 오래되었다고 표시해야하는 상황이 발생할 수 있다.

예를들어, API에 POST 요청을 보낼 때는 API 엔드포인트의 데이터가 최신 데이터이므로 수동으로 캐시에 있는 데이터를 유효하지 않은 것으로 표시해야한다.

결과적으로 POST 요청 후에는 즉시 캐시의 데이터가 오래되었다고 간주된다.

이를 해결하기위해, React Query의 QueryClient 객체는 invalidateQueries 메서드를 제공한다.

이 메서드는 모든 쿼리 또는 특정 쿼리를 오래된(stale) 상태로 표시할 수 있다.

또한 고유한 키를 사용하여 특정 쿼리를 오래된 상태로 표시할 수도 있다.

```tsx
import { useQueryClient } from '@tanstack/react-query'

// useQueryClient 훅을 사용하여 queryClient 객체 생성
const queryClient = useQueryClient()

// 캐시의 모든 쿼리 무효화
queryClient.invalidateQueries()

// 'users'로 시작하는 키가 있는 모든 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['users'] })
```

-참고 : **https://www.tecforfun.com/frameworks/how-to-manage-server-state-with-react-query/**

https://soobing.github.io/react/How-to-manage-server-state-with-React-Query/
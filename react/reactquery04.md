Article
7 Tips for Using React Query in Large Projects
side effects에 대한 callback, 수동으로 캐시 데이터를 무효화 등

이 기사에서는 프로젝트를 유지 관리하는 데 도움이 되는 실제 코드 기반의 React Query를 사용하는 몇 가지 팁과 요령을 살펴봅니다.

동기
상용 중인 어플리케이션에서 정기적으로 react-query를 사용하여 1년 이상 작업한 후 배운 몇 가지 팁을 제공하는 것을 목표로 합니다.

새로운 툴을 시작할 때 콘텐츠가 적은 것은 react-query도 예외가 아니며 일반적으로 작은 어플리케이션(to-do list 또는 counter)을 예시로 사용합니다. 정교한 도메인 논리로 보는 이의 주의를 분산시키지 않는 것이 좋습니다. 하지만, 상용 중인 어플리케이션이나 대규모 코드 베이스와 같은 실제 사례를 생각할 때는 조금 더 많은 지침이 필요합니다.

1. React Query Hooks를 당신의 Custom Hooks로 감싸라
   React 구성 요소에서 useQuery 및 useMutation을 직접 호출하는 대신 고유한 custom hooks로 감싸십시오. 이렇게 하면 데이터 계층과 프레젠테이션 계층이 분리되어 관심사를 명확히 구분할 수 있습니다. 또한 API fetch function을 React 구성 요소로 가져올 필요가 없습니다.

또한 이 문서의 뒷 부분에서 다룰 것처럼 좀 더 복잡한 Hook을 재사용할 수 있습니다.

예시

// hooks/items.hooks.ts
import { useQuery } from "react-query";

export enum ServerStateKeysEnum {
Items = 'items'
}

export const useGetItems = () =>
useQuery(
ServerStateKeysEnum.Items,
() => fetch('https://example.com/feedbacks'),  //Simple fetch function
);

// components/SomeComponent.tsx

import React from "react";
import { useGetItems } from "hooks/items.hooks.ts";

export const SomeComponent: React.FC = () => {
const { data: items } = useGetItems();
return <>{ items }</>
}
저는 도메인별로 그룹화하여 단일 파일에 이러한 custom hooks를 여러개 포함하는 것을 선호합니다. 예제에서는 동일한 파일에서 items도메인과 상호작용하는 여러 hooks를 가질 수 있습니다.

API fetch function을 useGetItems hook으로 감싸서 다른 컴포넌트에 import 하여 사용한다.

2. Prop 드릴링을 피하려면, 필요한 곳에 상태를 가까이 배치하라
   상태를 함께 배치하는 것은 어플리케이션을 유지 관리하는데 사용할 수 있는 최고의 전략 중 하나입니다.

초창기 React Query를 사용하면서 저지른 오류는 상위 구성 요소 중 하나에서 내 React Query Hooks를 가져오고 props를 통해 하위 구성 요소에 데이터를 전달하는 것이었습니다. 이것은 몇가지 수준에서는 잘 작동했지만, 어플리케이션이 커지면서 prop-drilling이 문제가 되었습니다. 사실은 캐싱된 동일한 데이터 조각에 액세스하기 위해 여러 구성 요소에서 React Query Hook을 호출하는 것을 막는 것이 거의 없다는 것입니다. 이 문서 아래에서는 API 요청을 최소화하는 방법을 살펴보겠습니다.

// components/SomeComponent.tsx

import React from "react";
import { useGetItems } from "hooks/items.hooks.ts";

export const SomeComponent: React.FC = () => {
const { data: items } = useGetItems();
return (<>
<h1>You have {items.length} items</h1>
{/* 이것은 item에 관심이 없는 일부 중간 구성 요소이며
item에 관심이 있는 손자 구성 요소에 도달하기 위해 데이터를 전달할 필요가 없습니다.
*/}
<SomeRandomChildComponent />
</>);
}

// components/SomeGreatGrandChildrenComponen.tsx

import React from "react";
import { useGetItems } from "hooks/items.hooks.ts";

export const SomeGreatGrandChildrenComponen: React.FC = () => {
const { data: items } = useGetItems();
return (<>{items}</>);
}
item에 관심이 있는 손자 요소에 도달하기 위해 자식 요소에 props로 데이터를 전달할 필요가 없다.

3. Stale Time Config Prop을 설정하여 불필요한 API 요청을 방지하라
   React Query에는 방심할 수 있는 몇가지 기본값이 있습니다.
   Document에 따르면:

useQuery 또는 useInfiniteQuery를 통한 쿼리 인스턴스는 기본적으로 캐시된 데이터를 오래된 것으로 간주합니다.
이 동작을 변경하려면 staleTime 옵션을 사용하여 쿼리를 전체적으로 구성하고 쿼리별로 구성할 수 있습니다. 더 긴 staleTime을 지정하는 것은 쿼리가 데이터를 자주 다시 가져오지 않음을 의미합니다.

오래된 쿼리는 다음과 같은 경우 백그라운드에서 자동으로 다시 가져옵니다.

쿼리 마운트의 인스턴스가 생성될 때
window가 다시 focus 될 때
네트워크가 다시 연결될 때
쿼리는 re-fetch 간격과 함께 선택적으로 구성됩니다.
기본 구성을 사용하여 query function을 두번 이상 호출하면 호출한 만큼 API 요청을 받게 됩니다.

필요에 따라 staleTime config prop을 사용하여 일부 요청을 저장할 수 있습니다. 현재 프로젝트에 30초의 stale time을 설정하였습니다. 즉, 캐시 데이터는 30초 동안 유효하므로 명시적으로 캐시를 무효화하지 않는 한 30초 안에 새로운 요청이 수행되지 않습니다.

필요한 것 보다 더 많은 요청을 방지하려면 React Query를 초기화 할 때 QueryClient 객체에 staleTime config prop을 설정하세요. 그러면 캐시가 여전히 최신 상태인 한 둘 이상의 API 요청을 트리거하지 않고 동일한 hook을 어러번 호출할 수 있습니다

// app.tsx
import { QueryClient, QueryClientProvider } from 'react-query';

const queryCache = new QueryClient({
defaultOptions: {
queries: {
refetchOnWindowFocus: false,
retry: false,
staleTime: 30000,
},
},
});

const App = () => (
<QueryClientProvider client={queryCache}>
<FirstSiblingComponent />
<SecondSiblingComponent />
</QueryClientProvider>
);

// components/FirstSiblingComponent.tsx
import { useGetItems } from "hooks/items.hooks.ts";

export const FirstSiblingComponent: React.FC = () => {
const { data: items } = useGetItems();
return (<>{items}</>);
}

// components/SecondSiblingComponent.tsx
import React from "react";
import { useGetItems } from "hooks/items.hooks.ts";

export const SecondSiblingComponent: React.FC = () => {
const { data: items } = useGetItems();
return (<>some other fancy component using {items}</>);
}
참고: 이 시점에 제시된 제안은 당신과 일치하거나 일치하지 않을 수 있는 현재 프로젝트의 요구 사항을 기반으로 합니다. 데이터의 특수성에 따라 stale time을 다소 허용할 수 있습니다.

QueryClient 객체를 생성할 때 prop으로 defaultOption 객체를 전달할 수 있고 queries 객체의 refetchOnWindowFocus, retry, staleTime 등 불필요한 API 요청을 방지할 수 있는 옵션을 설정할 수 있다.

4. Side Effect에 대해 onSuccess 및 onError Callback을 사용하라
   특히 onSuccess 및 onError에 국한되지는 않지만 side effect를 제어하기 위해 제공된 callback을 사용하세요. item이 변경될 때 마다 토스트 메세지를 렌더링해야 하지만 변경 또는 query 전후에 side effect로 원하는 코드 조각을 넣을 수 있는 예시입니다.

// hooks/items.hooks.ts
import { useMutation } from "react-query";
import {patchItem} from './items.api';
import { useRenderToastMessage } from '../some-helper-hooks/useRenderToastMessage';

export const useMutateItem = () => {
const toast = useRenderToastMessage();
return useMutation(patchItem, {
onSuccess: () => {
toast.render({
theme: 'success',
message: 'Item successfully modified'
});
},
onError: () => {
toast.notify({
theme: 'error',
children: 'Could not modify item'
});
},
});
};
onSuccess 및 onError callback을 포함하는 객체를 useMutation hook의 두번째 인자로 전달하는 방법에 주목하십시오.

이 접근 방식은 hooks를 활용하여 반복적이거나 도메인 로직 관련 side effect를 제어함으로써 구성 요소에서 많은 복잡성을 제거합니다.

onSuccess 및 onError 외에 다른 유용한 callback이 있지만 제가 가장 많이 사용한 callback 입니다. 공식 문서에서 모두 확인하세요.

side effect를 제어하기 위해 데이터를 생성/업데이트/삭제 할 때 사용하는 useMutation hook의 두번째 인수로 onSuccess, onError 등 callback을 활용하여 복잡성을 제거하자.

5. 오래된 데이터에 대해 수동으로 캐시 무효화
   캐시가 오래되면 invalidateQueries 함수를 사용하여 캐시를 무효화하고 자동으로 다시 가져옵니다.

다른 예를 생각해봅시다. 서버에서 item 목록을 가져왔고 React Query를 사용하여 캐시했습니다. 그런 다음 새 항목을 추가합니다. 이로 인해 item 목록이 변경되었기 때문에 처음에 서버에서 가져온 데이터는 유요하지 않게 되었습니다.

이전 팁에서 제시한 예시와 유사하게 React Query의 callback을 활용하여 변경의 side effect로 오래된 캐시를 무효화합니다.

// hooks/items.hooks.ts
import { useMutation, useQueryClient } from "react-query";
import {postCreateNewItem} from './items.api';
import { useQuery } from "react-query";

export enum ServerStateKeysEnum {
Items = 'items'
}

export const useGetItems = () =>
useQuery(
ServerStateKeysEnum.Items,
() => fetch('https://example.com/feedbacks'),  //Simple fetch function
);

export const useCreateItem = () => {
const cache = useQueryClient();
return useMutation(postCreateNewItem, {
onSuccess: () => {
cache.invalidateQueries(ServerStateKeysEnum.Items);
}
});
};
캐시에 접근하기 위해 useQueryClient hook을 호출하고 ServerStateKeysEnum.Items 쿼리 키에 해당하는 캐시를 무효화하기 위해 invalidateQueries 함수를 호출하고 있습니다. 이렇게 하면 useGetItems hook을 사용하여 해당 키에 해당하는 캐시가 필요할 때마다 API가 다시 가져옵니다.

변경 사항이 있을 때마다 API 데이터를 수동으로 다시 가져오는 것에 대해 걱정하지 않아도 되므로 많은 작업이 절약됩니다. React Query가 처리하도록 할 수 있습니다.

useMutaion의 두번재 인자에 들어갈 callback으로 useQueryClient의 invalidateQueries 함수를 사용하여 해당 키에 해당하는 캐시가 필요할 때마다 API를 다시 호출 한다.

6. 쿼리를 활성화/비활성화하여 데이터에 대한 액세스 제어
   useQuery hook이 포함된 구성 요소를 렌더링하고 싶지만 데이터를 가져오는 것은 원하지 않는 경우가 있습니다.

예를 생각해 봅시다. 우리는 사용자가 시스템에 대한 유효한 구독이 있는 경우에만 items를 가져오길 원합니다. 물론 이는 서버 측에서도 검증이 필요하지만 클라이언트에서 빠른 확인을 수행하면 불필요한 요청을 방지할 수 있습니다.

React Query는 boolean 값을 받는 enabled 옵션을 제공합니다. boolean 값이 false라면 쿼리 함수가 실행되지 않습니다.

// hooks/items.hooks.ts
import { useQuery, UseQueryOptions } from "react-query";

export enum ServerStateKeysEnum {
Items = 'items'
}

export const useGetItems = (options?: UseQueryOptions) =>
useQuery(
ServerStateKeysEnum.Items,
() => fetch('https://example.com/feedbacks'),  //Simple fetch function
{
...options
}
);

// components/SomeComponent.tsx
export const SomeComponent: React.FC<{ hasValidSubscription: boolean }> = ({
hasValidSubscription
}) => {
const { data: items } = useGetItems({
enabled: hasValidSubscription //If hasValidSubscription === false, query won't be executed
});
return (<>{items}</>);
}
옵션 객체를 인자로 받도록 useGetItems를 수정한 방법에 유의하십시오. 이렇게 하면 구성 요소에서 직접 옵션을 제공하여 쿼리를 활성화 또는 비활성화 할 수 있습니다. 자체 onSuccess 또는 onError 콜백을 제공할 수도 있습니다.

useQuery의 옵션 중 enabled: boolean을 이용하여 데이터를 가져오지 않도록 할 수 있다.

7. UI와 서버 캐시의 혼용 방지
   Kent C. Dodds는 UI와 서버 상태에 대한 훌륭한 정의를 가지고 있습니다.

서버 캐시를 UI 상태와 혼합하지 마십시오. 어플리케이션이 커지면 UI 상태도 커집니다. 적절한 상황이 주어지면 React Context 또는 타사 라이브러리에 의존하는 자체 상태 관리 솔루션을 구현할 수 있습니다. 어떤 접근 방식을 따르든 이 문서의 범위에 속하지 않습니다. 그러나 중요한 권장 사항은 React Query에서 관리하는 서버 캐시와 선택한 상태 관리 툴에서 처리하는 UI 상태를 혼동하지 않도록 하는 것입니다.

서버 캐시는 본질적으로 동작이 다르며 다른 문제가 있습니다. UI 상태에는 일반적으로 동기식(synchronous)이지만 상태 캐시는 비동기식(asynchronous)입니다.

서버 캐시와 UI 상태를 혼합하면 응용 프로그램이 커짐에 따라 더욱 분명해지는 유지 관리 문제가 발생할 수 있습니다. 제 권장 사항은 UI 상태를 처리하는 데 필요한 접근 방식을 선택하는 것이지만 React Query가 서버에서 오는 데이터에 대해 자체적으로 마법을 수행하도록 하는 것입니다.


출처 : https://velog.io/@moonshadow/%ED%81%B0-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-React-Query%EC%9D%98-7%EA%B0%80%EC%A7%80-%ED%8C%81
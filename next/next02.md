# **next.js에서 material-ui 사용하기**

nextjs에서 mui(material-ui)를 적용하는 방법에 대해 알아보겠습니다. 이 이후에는 다음은 **[styled-components와 mui를 동시에 사용하는 방법 (opens new window)](https://kyounghwan01.github.io/blog/React/next/mui-styled)**, 마지막에는 글로벌 style를 이용하여 다크모드 만드는 방법까지 알아보도록 하겠습니다.

타입스크립트 기반 예제로 이루어져있습니다.

## **[#](https://kyounghwan01.github.io/blog/React/next/mui/#%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3-%E1%84%89%E1%85%A6%E1%84%90%E1%85%B5%E1%86%BC)프로젝트 세팅**

- next 프로젝트를 설치하고 이후 필요한 디펜던시를 설치합니다.

```jsx
npx create-next-app my-app

cd my-app
yarn add @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/styles
```

## **[#](https://kyounghwan01.github.io/blog/React/next/mui/#%E1%84%89%E1%85%A6%E1%84%90%E1%85%B5%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)세팅하기**

- nextjs는 서버사이드랜더링을 하기 때문에 react에서 mui를 사용하는 것 처럼 손쉽게 반영 되지 않습니다. 그래서 몇가지 사전작업을 해야합니다.

이 문서는 **[mui 공식 깃허브 (opens new window)](https://github.com/mui-org/material-ui/tree/master/examples/nextjs)**에서 코드를 참고하였습니다.

## **[#](https://kyounghwan01.github.io/blog/React/next/mui/#document-tsx)`_document.tsx`**

- `_document`는 서버사이드에 관여하는 로직 또는 static한 로직을 추가하는데 사용합니다. `_document`가 하는 일을 잘 모르겠다면 **[nextjs 기본 (opens new window)](https://kyounghwan01.github.io/blog/React/next/basic/#document-tsx)**이 포스팅을 참조해주세요.
- ssr 지원을 위해 `_dococument.tsx`에 mui에 대한 사전 작업을 합니다.
- 간단히 말씀드리면 서버에서 받아온 html, css와 클라이언트가 렌더링한 html, css가 다르면 next에서 warning을 띄우게 됩니다. 그래서 서버단에서 mui를 지원함으로 서버와 클라이언트간 간극을 맞추기 위해 아래와 같이 구현합니다.

```jsx
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          <Head></Head>
          <Main />
          <NextScript />
        </body>
      </Html>);
  }
}

MyDocument.getInitialProps = async ctx => {
  const materialSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => materialSheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>};
};

```

## **[#](https://kyounghwan01.github.io/blog/React/next/mui/#app-tsx)`_app.tsx`**

- nextjs에서 mui를 사용하는데 필수적으로 사용하는 것은 아니지만 웹을 정상적으로 구현하기 위해서 꼭 필요한 `CssBaseline`를 이곳에서 추가합니다.

### **[#](https://kyounghwan01.github.io/blog/React/next/mui/#cssbaseline)CssBaseline**

- 프로젝트를 처음 구상하고 실행하면 브라우저마다 각기 다른 기본 css가 default로 설정 되어 있다는 것을 알 수 있습니다. 이때 우리는 정상적인 구현을 위해 모든 브라우저가 일관적으로 보이도록 해야합니다. 그래서 우리는 css를 전역에서 normalize 하기 위해 `<CssBaseline />`를 사용합니다. `<CssBaseline />`는 앱의 최상단에 넣어주면 알아서 normalize 해줍니다.

```jsx
// _app.tsx
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>);
};

export default App;
```

## **[#](https://kyounghwan01.github.io/blog/React/next/mui/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)사용하기**

여기 까지 오셨다면 기본적인 세팅이 모두 완료되었습니다. 이제 컴포넌트 내부에서 mui를 사용할 수 있습니다.

```jsx
import type { NextPage } from "next";
import Button from "@mui/material/Button";

const Home: NextPage = () => {
  return (
    <div>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </div>);
};

export default Home;
```
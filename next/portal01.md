# **Portal 사용법 (nextjs, cra)**

nextjs와 react (cra)에서 portal을 어떻게 사용 하는지 알아보겠습니다.

## **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#cra%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-portal-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)cra에서 portal 사용하기**

- 먼저 react에서 portal을 어떻게 사용하는지 알아보겠습니다.

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3-%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC)프로젝트 생성**

- 아래 커멘드로 프로젝트를 생성합니다.

`npx create-react-app react-portal

        Copied!`

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#portal-%E1%84%8C%E1%85%AE%E1%84%8B%E1%85%B5%E1%86%B8)portal 주입**

- `src/index.jsx`에 portal을 넣습니다. (`public/index.html`에 넣으셔도 됩니다.)

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#src-index-jsx)src/index.jsx**

`import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
<React.StrictMode>
<div id="portal" />
<App />
</React.StrictMode>,
document.getElementById("root")
);

        Copied!`

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#public-index-html)public/index.html**

`<!DOCTYPE html><html lang="en"><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><--- 여기가 포탈 ---><div id="myportal"></div></body></html>
Copied!`

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#createportal%E1%84%85%E1%85%A9-%E1%84%91%E1%85%A9%E1%84%90%E1%85%A1%E1%86%AF-%E1%84%8B%E1%85%A7%E1%86%AF%E1%84%80%E1%85%B5)createPortal로 포탈 열기**

- `Portal.tsx`

`import ReactDOM from "react-dom";

const Portal = ({ children, selector }) => {
const element =
typeof window !== "undefined" && document.querySelector(selector);
return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;

        Copied!`

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#portal-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)portal 사용하기**

`<Portal selector="#portal">
<Component {...props} />
</Portal>
Copied!`

## **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#next%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-portal-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)next에서 portal 사용하기**

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3-%E1%84%89%E1%85%A2%E1%86%BC%E1%84%89%E1%85%A5%E1%86%BC-2)프로젝트 생성**

`npx create-next-app react-portal

        Copied!`

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#portal-%E1%84%8C%E1%85%AE%E1%84%8B%E1%85%B5%E1%86%B8-2)portal 주입**

- next는 html 파일이 없으므로 react 처럼 index.html에 div를 주입할 수 없습니다.
- next에서는 `_document.js`파일에 div를 주입합니다.

`import React from "react";
import Document, { Html, Head, Main } from "next/document";

export default class MyDocument extends Document {
render() {
return (
<Html>
<body>
<div id="portal" />
<Main />
</body>
</Html>
);
}
}

        Copied!`

### **[#](https://kyounghwan01.github.io/blog/React/next/use-portal/#portal-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5-2)portal 사용하기**

- 이후 createPortal이나 portal을 사용하는 방법은 react와 동일합니다
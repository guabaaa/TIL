# **Network 09**

## 🪄 웹을 만들기 위해 사용되는 다양한 기술들

!https://velog.velcdn.com/images/lijahong/post/26d2599e-554e-4ecb-b0bf-6a1be6c6b674/image.png

> 7계층에서는 사용자의 다양한 인터페이스를 담당한다.
>

## 🪄 HTTP 프로토콜

- HTTP : HyperText Transfer Protocal로 웹 어플리케이션에서 HTML, JS, CSS 같은 파일을 웹서버에게 요청하고 받아오는 핵심 프로토콜
- REQUEST와 RESPONSE 동작에 기반하여 서비스를 제공
- 중요한건 백엔드에서, 백엔드는 서버 컴퓨터에서 실행

### 🔎 HTTP 1.0

> 특징 : 연결 수립, 동작, 연결 해제의 단순함이 특징, 문서를 전송받으면 연결을 끊고 다시 연결하여 Data 전송
단점 : 단순 동작이 반복되어 통신 부하 문제 발생
>

!https://velog.velcdn.com/images/lijahong/post/a65b0a55-0395-4914-852a-4fdb27d15c28/image.png

### 🔎 HTTP 1.1

> MULTIPLE REQUEST 처리가 가능해서 REQUEST가 많을 경우 연속적인 응답 제공 → PIPELINE 방식
하나의 IP주소가 다수의 WEB SITE와 연결 가능
인터넷 프로토콜 설계에 최적화 및 빠른 속도를 위해 캐시 사용
DATA를 압축해서 전달하기에 전달하는 DATA 양 감소
>

## 🪄 HTTP 요청 프로토콜

- 요청하는 방식을 정의하고 클라이언트의 정보를 담고 있는 요청 프로토콜 구조

!https://velog.velcdn.com/images/lijahong/post/c2793ca9-d4d9-4750-88dd-43b9e8c9d417/image.png

> Request Line : 가장 중요한 정보로, 아래 5개의 정보를 담고 있다.
요청하는 타입/공백/ uri or url /공백/HTTP 버전으로 구성
>

!https://velog.velcdn.com/images/lijahong/post/b2389ab4-69a5-4114-beb9-6ad3405dfe17/image.png

- 요청 타입

1. GET : 클라이언트가 중요하지 않은 DATA를 서버로 보내서 페이지를 요청할 때 사용.
   GET을 사용할 경우 BODY가 없다. 따라서 요청 DATA를 URL에 포함시켜 보낸다.

!https://velog.velcdn.com/images/lijahong/post/21e8d985-08b1-4b04-86ea-9289c7ff2f64/image.png

> 아래 첫번 째 줄에 방식 DATA가 포함된 REQUEST 라인, 밑에는 전부 헤더이고, BODY는 없다.
? 뒤에 부분이 요청하는 DATA
>

1. POST : 클라이언트가 서버에게 중요한 DATA를 보내서 페이지를 요청할 때 사용.
   BODY에 DATA를 포함시켜 보낸다.

!https://velog.velcdn.com/images/lijahong/post/413e1c42-aeba-47d7-8e7b-85844268ca53/image.png

## 🪄 URI 구조

- URI : UNIFORM RESOURCE IDENTIFIER, 인터넷 상에서 특정 자원을 나타내는 유일한 주소

!https://velog.velcdn.com/images/lijahong/post/f5ee54ba-9e65-4655-bead-5a6a5e4f42ba/image.png

- scheme : 사용하고 싶은 프로토콜. 입력안하면 자동으로 들어감
- IP주소:port : 도메인 주소를 쓰면 DNS서버가 컴퓨터 내부적으로 IP주소:port로 변환하여 입력, port 번호는 웹브라우저에서 사용하면
  자동으로 80번이나 443번이 입력되며 생략 된다.

!https://velog.velcdn.com/images/lijahong/post/d32f8292-8909-4d56-9c83-f326e8ef3d8a/image.png

> https 프로토콜을 사용하며, 도메인 주소는 comic.naver.com인데 이는 ip주소로 변환되면 https프로토콜이기에 port는 443번이지만 생략된다.
이는 이 ip주소에 해당하는 서버에 webtoon 폴더에 detail.nhr이라는 파일에 titleld라는 값에 641253의 값을 전달하는 것
>

- 컴퓨터의 파일 가져오기

> APACHE를 실행시키고 안에 htdocs 폴더 안에 파일을 생성하면 가져올 수 있다.
>

!https://velog.velcdn.com/images/lijahong/post/d14dad0a-61db-4b3c-80c0-e83659a7aab1/image.png

!https://velog.velcdn.com/images/lijahong/post/d30dc185-7510-48eb-a0a6-c4b5af9d2141/image.png

## 🪄 DNS 서버

- 호스트의 도메인 이름을 네트워크 ip로 바꾸거나 그 반대의 변환을 수행하는 시스템
- 계층 구조로 이루어져 있으며, 루트 DNS 서버, 최상위 레벨 서버, 책임 DNS 서버로 나위어지고 추가로 로컬 DNS 서버가 있다.

!https://velog.velcdn.com/images/lijahong/post/c944a3b7-8d65-44d4-8645-1587b792b12f/image.png

- **4.1 도메인 : 인터넷 상에서의 주소인 URL의 일부로 IP 주소를 기억하기 쉽게 만들어주는 네트워크 호스트 이름.
  보통 루트 네임 서버에 등록된 최상위 호스트 네임 및 도메인 레지스트리에서 관리하는 하위 호스트 네임을 말한다.**
- **4.2 과정**
    - 맨 뒤에 .은 생략되며 도메인 주소의 뒤에 부터 처리한다.

    ****

  !https://velog.velcdn.com/images/lijahong/post/c97f70ba-2b34-4d59-a4ca-a0f2b089ad91/image.png

  !https://velog.velcdn.com/images/lijahong/post/5e1fc604-c12b-4350-9a2c-0926a901fefc/image.png

  !https://velog.velcdn.com/images/lijahong/post/018e419a-f175-4211-91a5-92c5ec1977be/image.png

  !https://velog.velcdn.com/images/lijahong/post/f8305389-848e-47d6-b7c3-911fd4a8fb50/image.png

  !https://velog.velcdn.com/images/lijahong/post/144b2c45-5336-44bd-8f57-b898eb4dac43/image.png

    - 도메인 주소는 DNS 서버를 통해 IP주소로 바꾸고, IP주소를 도메인 주소로 바꿈
    - 재귀 쿼리 : 로컬 DNS 서버와 주고받는 질의와 응답
    - 반복 쿼리 : 로컬 DNS 서버가 다른 DNS 서버와 주고받는 반복 쿼리
    - 반복 쿼리를 통해 알아온 주소 : 권한 없는 응답
    - 로컬 DNS가 알고 있는 주소 : 권한 있는 응답


## 🪄 HTTP 응답 프로토콜

- 사용자가 볼  웹 페이지를 담고 있는 응답 프로토콜 구조

!https://velog.velcdn.com/images/lijahong/post/73efdf8e-84b8-4efe-ab25-4e6d35224af1/image.png

> Status line이 가장 중요하다
>

!https://velog.velcdn.com/images/lijahong/post/a481f227-e124-4c19-aef4-01b82b5ab6c2/image.png

!https://velog.velcdn.com/images/lijahong/post/9600f006-01af-40f7-acfb-b77234def2cf/image.png

> 상태 코드를 파악해야한다.
>
- 1. 200번 : 성공적인 통신, 클라이언트의 요청이 성공 했다는 것.
- 2. 403번 : 클라이언트의 오류, forbidden, 클라이언트가 권한이 없는 페이지를 요청
- 3. 404번 : 클라이언트의 오류, not found, 클라이언트가 서버에 없는 페이지를 요청
- 4. 500번 : 서버의 오류, internal server error, 서버의 일부가 멈췄거나 설정 오류가 발생. 보통 사용자 코드에서 에러가 발생
- 5. 503번 : 서버의 오류, service unavailable, 최대 session 수를 초과했을 때

## 🪄 HTTP 헤더 포맷

!https://velog.velcdn.com/images/lijahong/post/6124a2f2-7c89-4d74-8bef-96484c7a8179/image.png

- 헤더에는 수많은 정보를 담고 있음
- **6.1 일반 헤더 : 일반적인 정보**

!https://velog.velcdn.com/images/lijahong/post/27ccd433-790b-4b91-b17e-dfc4060df6e9/image.png

- **6.2 요청 헤더 : 클라이언트 정보**

!https://velog.velcdn.com/images/lijahong/post/8ba6db54-e5da-4731-8b62-ceef6901fff3/image.png

- **6.3 응답 헤더 : 서버 정보**

!https://velog.velcdn.com/images/lijahong/post/ef3e220a-b818-4222-82f3-22d24b029856/image.png

## 🪄 URL 과 URI

- URL은 주소, URI는 ID로 자원의 위치 뿐만 아니라 식별자를 포함하며 URL 의미를 포함한다.
- URI는 ID와 ID와 매칭된 자원을 요청
- URL은 서버의 특정 위치에 있는 자원을 요청, 차후에 배울 Django에서는 [urls.py](http://urls.py) 파일에 맵핑
- 식별자가 있으면 URI이며 URL이 될 수 없다.
- 자원의 실제 위치는 URL 겸 URL이며 경로는 URL이다.

-참고 : [https://velog.io/@lijahong/0부터-시작하는-네트워크-공부-HTTP](https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80-HTTP)
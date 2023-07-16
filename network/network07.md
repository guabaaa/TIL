# **Network 07**

## 🪄 TCP 프로토콜

- TCP란? Transmission Control Protocal로 프로그램 간에 통신을 안정적으로, 순서대로, 에러없이 교환할 수 있게 하는 프로토콜이다.

!https://velog.velcdn.com/images/lijahong/post/e7e06853-6c8e-4536-bd6b-eed83008d945/image.png

> 출발지, 도착지 포트
TCP Flags : Data 통신 상태 응답
>

## 🪄 TCP 전송 과정

### 🔎 연결 수립 과정

- TCP를 이용한 데이터 통신을 할 때 프로세스와 프로세스를 연결하기 위해 가장 먼저 수행되는 과정

> 1. 클라이언트가 서버에게 요청 패킷을 보냄
2. 서버가 클라이언트의 요청을 받아들이는 패킷을 보냄
3. 클라이언트는 이를 최종적으로 수락하는 패킷을 보냄
>

- 보내는 ACK는 받은 SEQ + 1, SEQ는 받은 ACK, SEQ를 처음 보낼 때는 랜덤한 값으로 보냄
- 자세한 3way handshake와 4way handshake 내용은 링크 참조
  • https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EB%AA%A8%EB%8D%B8

### 🔎 데이터 송수신 과정

- TCP를 이용해 Data 송수신 할 때 단순히 TCP 패킷만을 캡슐화해서 통신 하는 것이 아닌 PAYLOAD를 포함한 패킷을 주고 받을 때의 규칙

!https://velog.velcdn.com/images/lijahong/post/35961c1d-2e45-4784-afdd-56f66ab2414c/image.png

> 1. 송신 쪽에서 또 보낼 때 SEQ, ACK 번호는 동일
2. 수신 쪽에서 받은 ACK 번호는 보내는 SEQ 번호가 된다
3. 보내는 Data가 있을 시 보내는 ACK 번호는 받은 SEQ 번호 + Data의 크기
>

## 🪄 TCP 상태전이도

!https://velog.velcdn.com/images/lijahong/post/7e876c6b-22f6-498b-9464-7f6844b5b805/image.png

> 서버는 수동, 클라이언트는 능동

점선이 서버, 실선이 클라이언트

ESTABLISHED : 연결이 된 상태, 이 상태가 되야 Data 전송이 가능하다

LISTENING : 서버가 요청을 기다리는 상태

즉, LISTENING → SYN_SENT, SYN_RECEIVED → ESTABLISHED

실선과 점선 각각 따라가며 파악해보기
>

## 🪄 실습

- APACHE : APACHE24를 통해 자신의 IP를 웹에서 접속할 수 있게 배포
- 0.0.0.0 : 모든 IP, 이 IP에 포함 된 주소로 찾아와야지만 내 컴퓨터에 접속 가능
- 127.0.0.1 : 나 자신을 나타내는 IP

!https://velog.velcdn.com/images/lijahong/post/1d9c4566-2f06-4cae-9197-4e6861a6d79f/image.png

> 해당 파일로 서버 IP 변경 가능
>

!https://velog.velcdn.com/images/lijahong/post/d7f40d0b-c76a-4350-a027-3dcfdff7e1d5/image.png

> PID ; 실행중인 프로세스 ID
HTTPd 포트와 해당 PID 확인 가능, HTTP의 포트 번호는 80이고 APACHE HTTPd의 ㅔㅑㅇsms 5080
상태가 LISTENING이여야 통신 가능
>

!https://velog.velcdn.com/images/lijahong/post/b490b75b-ca78-4df5-996e-3a74ea0c33f7/image.png

> 본 컴퓨터에서 가상 IP로 접속시 19.1과 연결되는 이유는 19.1은 가상 머신에서 게이트웨이 주소를 통해 가상 공유기와 연결하면,
그 가상 공유기가 VM net 8과 연결 시키는데 이 장치의 IP 주소가 1이다.

APACHE를 이용해 HTTPd를 실행했기에 PID가 5080이다.

외부에서 내부 사설 IP가 APACHE를 통해 HTTP 프로토콜로 배포한 곳에 접속했기에 80번 포트에 접속한 것이다.
외부 CMD상에서는 19.3:80에 접속했다고 나온다.
>

!https://velog.velcdn.com/images/lijahong/post/490cd73a-a6eb-43fc-b24a-46bed0581eb9/image.png

> 가상 IP에 접속 가능하다.
>

## 🪄 VM net 8

!https://velog.velcdn.com/images/lijahong/post/2e9ee70c-15c0-41b6-85ca-dd967dcd00a2/image.png

- VM net 8을 연결하면 가상 환경에 게이트웨이가 생겨 인터넷과 접속이 가능하다.
- 즉, 본 컴퓨터에서 가상 환경의 사설 IP에 접속하면 VM net 8과 연결되기에 NAT를 통해 외부 IP가 1로 출력된다.
- VM net 8 이 NAT 라면 가상의 Gateway에서 NAT를 해준다.

-참고 : [https://velog.io/@lijahong/0부터-시작하는-네트워크-공부-TCP-프로토콜](https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80-TCP-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
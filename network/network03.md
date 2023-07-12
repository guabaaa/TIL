# **Network 03**

## 🪄 프로토콜 통신 방식과 구조

### 🔎 통신 방식

- 캡슐화 : 통신간 상위 layer에서 하위 layer로 프로토콜을 생성하는 것
- 디캡슐화 : 통신간 하위 layer에서 상위 layer로 프로토콜을 분석하는 것

### 🔎 구조

- packet : 네트워크 상에서 전달되는 Data의 통칭으로 전달하는 Data의 형식화된 블록이다.
  이는 제어 정보인 Header와 풋터, 사용자 데이터인 payload로 이루어진다.

!https://velog.velcdn.com/images/lijahong/post/2aff1623-4195-4f61-bf0d-d0690a9d335f/image.png

- payload : 상위 layer에서 내려온 Data
- 풋터(tail) : 추가적인 정보를 가진 Data로 제어 정보를 담고 있다.
- Header: 제어 정보와 관련 된 Byte 단위의 Data로, layer 마다 담는 정보가 다르며, 해당 정보는 하위 layer로 보낼시 payload로 캡슐화 된다.

!https://velog.velcdn.com/images/lijahong/post/233316f5-ad9a-4792-87bf-e737a8dd9e0d/image.png

## 🪄 TCP/IP 모델

- 1980년대 초 프로토콜 모델로 공개되어 현재 통신간 Data를 주고 받는데 쓰이는 프로토콜의 모음
- 패킷 통신 방식의 인터넷 프로토콜 IP와 전송 조절 프로토콜 TCP로 이루어져 있으며 IP는 패킷 전달 여부와 순서를 보증하지 않기에 TCP가 IP 위에서 전달과 순서를 보증해준다.
  IP Routing 을 이용하며 TCP의 특성을 활용하는 모델

### 🔎 TCP

<aside>
💡 OSI & Layer 중 4Layer이며, Transmission Control Protocaol로 양쪽 노드가 통신할 준비가 되었는지, Data가 제대로 전송됐는지, 전송된 Data가 정상인지,
Data의 순서가 올바른지를 Tcp Header에 담아 segment에 붙여 점검한다.
TCP는 IP의 정보 뿐만 아니라 Port를 이용하여 연결한다.

</aside>

### 🔎 3-way Handshake

<aside>
💡 TCP/IP 프로토콜을 통한 통신을 하는 응용프로그램이 Data 전송 전 TCP의 연결을 초기화하여 상대방과 세션을 수립하는 과정

</aside>

!https://velog.velcdn.com/images/lijahong/post/8aade4ea-cc76-4d7e-9eca-6ebb9abd12a9/image.png

1. A가 B에게 접속을 요청하는 SYN 패킷 전송 후, SYN/ACK를 기다린다. (SYN_SENT)
2. B가 SYN을 받고 A에게 SYN+ACK 패킷을 전송 후, ACK를 기다린다. (SYN_RECEIVED)
3. A가 SYN+ACK 패킷을 받고, B에게 ACK를 전송 한다. B가 확인하면 B는 ESTABLISHED가 되며 Data 전송이 시작된다.

### 🔎 4-way Handshack

<aside>
💡 TCP/IP 프로토콜을 통해 수립한 세션을 종료하는 과정이다.
세션 종료 전 전송된 패킷이 지연이나 유실을 통해 종료 후 도착하여 유실되는 상황을 대비해 A는 FIN을 받고 나서도, 일정시간동안 세션을 남겨놓고 대기한다. (TIME_WAIT)

</aside>

!https://velog.velcdn.com/images/lijahong/post/26acfa84-9447-42d5-8d8d-eb3e06533c35/image.png

1. A가 B에게 FIN FLAG 전송
2. B가 ACK를 보내고, 통신종료를 기다림 (TIME_WAIT)
3. B가 통신이 끝나면, A에게 FIN FLAG 전송
4. A가 FIN FLAG에 대한 ACK 전송 (TIME_WAIT)

## 🪄 OSI 7 Layer 모델

- 1984년 네트워크 통신을 체계적으로 다루는 ISO에서 표준으로 지정한 모델로 데이터를 주고 받을 때 데이터 자체의 흐름을 구간별로 나눠 놓은 것이다.
- socket 통신은 2~4 layer를 사용한다.

### 🔎 layer

<aside>
💡 **7layer Application** : 여러가지 서비스를 제공하는 실질적인 프로그램, 사용자 인터페이스 (HTTP, TELNET)
**6layer Presentation** : Data를 어떤 형식으로 전달할지 정하는 계층
**5layer Session** : 논리적인 연결을 정의하는 계층, 단위는 DATA OR Message이며,
                          네트워크 장치들간의 연결 설정의 유지 동기화 등을 어떻게 수행할지를 정의
**4layer Transport** : 포트 주소를 이용해서 SEGMENT 단위를 사용하며 사용자간의 연결을 생성하고,
                             Data 전송량과 전송여부를 확인한다. (TCP, UDP) - 게이트웨이
**3layer Network** : IP 프롵토콜을 사용해 PACKET 단위를 사용하며 Routing을 통해 경로와 목적지를 찾는다. (ARP, ICMP) - 라우터
**2layer DataLink** : MAC주소를 이용해서 FRAME 단위를 사용하며, 특정 네트워크에서 특정 PC를 찾아가는 역할 (이더넷) - 브릿지, 스위치
**1layer Physical** : 상위 계층에서 캡슐화 된 데이터를 bit 단위로 변경,
                           전기신호로 전송하고 받은 전기신호를 bit단위로 해석하는 역할 - 케이블, 리피터, 허브

</aside>

## 🪄 두 모델 비교

1. 공통점 : 계층적이며 계층간 역할을 정의한다.
2. 차이점 : 계층의 수가 차이나며, OSI 는 역할 기반, TCP/IP는 프로토콜 기반이다.
   OSI 는 전반에 대한 표준이며, TCP/IP는 데이터 전송기술 특화이다.

-참고 : [https://velog.io/@lijahong/0부터-시작하는-네트워크-공부-네트워크-모델](https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EB%AA%A8%EB%8D%B8)
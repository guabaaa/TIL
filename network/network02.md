# **Network 02**

## 🪄 네트워크 구성 방법

!https://velog.velcdn.com/images/lijahong/post/a6d465ce-7427-4ec3-bd51-9a180c91aeb3/image.png

1. STAR형 : 중앙에 있는 네트워크 장비를 통해 모두 연결된 형태로 중앙의 스위치와 같은 장비가 오류가 나면 연결된 모든 사용자가 통신 불가.
   주로 스위치를 통해 LAN 대역을 구성한다.

!https://velog.velcdn.com/images/lijahong/post/9bda88ff-47e9-45e1-87aa-8e20526235c6/image.png

1. MESH형 : 모든 시스템이 개별적으로 연결된 형태로 하나의 장비가 고장나도 연결에 문제가 없다.
   주로 라우터를 통해 WAN 대역을 구성한다.

!https://velog.velcdn.com/images/lijahong/post/09cdfe15-5582-4538-8d43-ab4ea36f4555/image.png

1. 혼합형 : STAR형과 MESH형을 혼합한 형태로, 실제 인터넷의 형태이다.

## 🪄 네트워크 프로토콜

프로토콜은 일종의 양식으로 노드간의 통신 속에서 송수신을 담당하는 노드와 보낼 Data의 내용, 송수신 방식을 작성한 것이다.

1. 2layer : Ethernet
2. 3layer : ARP, IPv4, ICMP
3. 4layer : TCP, UDP

-참고 : [https://velog.io/@lijahong/0부터-시작하는-네트워크-공부-네트워크란](https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EB%9E%80)
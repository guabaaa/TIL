# **Network 05**

## 🪄 통신의 과정

- 서로 다른 대역폭이 통신 가능한지 확인할 경우 (icmp)

> 1. 호스트 pc가 자신의 라우팅 테이블 확인
2. ARP 프로토콜을 통해 게이트웨이 mac주소 확인
3. 게이트웨이의 mac 주소로 icmp 패킷 전송
4. 통신 환경 확인 후 게이트 웨이로 전송
5. packet을 받은 게이트웨이는 목적지가 자신의 ip주소가 아니기에 이더넷 프로토콜을 없애고,
   상대 네트워크 대역 게이트웨이에 arp 프로토콜을 보내기 전, 일단 라우팅 테이블 확인
6. 상대 게이트웨이의 mac 주소가 없다면 ARP 프로토콜 요청
7. mac 주소를 파악하여 새 이더넷 프로토콜 작성해서 전송
8. 상대 게이트웨이에 icmp 패킷 전송
9. 통신 환경 확인 후 Packer 전송하여 상대 대역폭 게이트웨이 도달
10. …
11. 다른 대역폭의 호스트 pc에서 icmp를 받고 reply 전송, 이때 ARP 캐시 테이블에 mac 주소들이 저장되어있으므로
    reply 전송시 ARP 프로토콜은 필요없다.
12. 호스트 pc가 reply를 받아서 통신 환경 확인
>

## 🪄 ARP 프로토콜

- 같은 네트워크 대역에서 통신을 위해 필요한 mac 주소를 IP주소를 이용해 알아오는 프로토콜

!https://velog.velcdn.com/images/lijahong/post/774e77a0-12b9-4143-896c-cbb5af63a91f/image.png

> opcode : 송수신 구분
>

### 🔎 과정

> 1. ARP 프로토콜을 작성하여 mac 주소를 1로 채워 브로드캐스트 주소로 보낸다
2. 네트워크 장비는 해당 프로토콜을 통해 브로드캐스트인걸 확인하고 대역폭내의 모두에게 보냄
3. 받은 호스트들은 프로토콜을 확인하여 ip주소를 비교하여 자신의 것이 맞으면
   출발지 주소에 호스트의 mac 주소를 프로토콜의 출발지 mac란에 작성해 유니캐스트로 전송
4. 요청자는 받은 프로토콜을 통해 상대방의 mac주소 파악
5. 받은 mac 주소를 ARP 캐시 테이블에 저장
6. mac 주소로 패킷 전송
>

## 🪄 IPv4 프로토콜

- 다른 네트워크 상에서 특정 대상과 Data를 교환하기 위한 프로토콜로 Data 전달과 순서를 보증 안한다.

!https://velog.velcdn.com/images/lijahong/post/180359e8-b804-4d96-a8a8-91235365c09b/image.png

> ip 프로토콜은 20바이트

identification : data를 fragment를 하여 분할하는데 이때 분할한 data를 구분하기 위해 사용

ttl : 전송과정에서 만약 오류로 인해 전송되지 못하고, 네트워크 상에서 맴돌 경우,
data들이 쌓여 메모리가 down될 것을 방지해 장비를 거칠때마다 1씩 감소하게 하여 ttl이 지나면 data가 사라지게 한다.
>

## 🪄 ICMP 프로토콜

- Internet Control Message Protocol, 인터넷 제어 메세지 프로토콜로 네트워크 컴퓨터 위에서 돌아가는 운영체제에서
  프로토콜 Type과 Code를 통해 오류 메세지를 전송 받는데 쓰이는 프로토콜
- 특정 대상과 내가 통신이 잘 되는지 확인하는 프로토콜
- cmd에서 사용하는 ping 프로그램도 일종임
- Data를 주고받을 때는 TCP/IP, 통신을 확인할 때는 ICMP 둘이 다른 것.
  ICMP는 오직 통신이 잘 되는지 확인하는 것

!https://velog.velcdn.com/images/lijahong/post/7e7ad5ff-269c-4f89-8193-80248dceffe3/image.png

> time exced : 갔는 데 시간 만료

destination unreachable : 도착지를 도달 못함
>

-참고 : [https://velog.io/@lijahong/0부터-시작하는-네트워크-공부-다양한-통신-프로토콜](https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80-%EB%8B%A4%EC%96%91%ED%95%9C-%ED%86%B5%EC%8B%A0-%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
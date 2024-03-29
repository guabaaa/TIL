# Network 01

## 🪄 네트워크의 정의

<aside>
💡 네트워크는 Net과 Work의 합성어로 컴퓨터와 같은 노드들이 통신 기술을 통해 그물망처럼 연결되어 통신을 하는 형태를 뜻한다.
데이터 및 리소스를 송신, 교환 또는 공유하기 위한 목적으로 케이블(유선) 또는 Wifi(무선)로 연결된 2개 이상의 컴퓨터로 구성된다.

***”몇 개의 독립적인 장치가 적절한 영역 내에서 적당히 빠른 속도로 물리적 통신 채널을 통하여 서로가 직접 통신할 수 있도록 지원해주는 데이터 통신 체계”***

</aside>

## 🪄 중요 용어

- ip 주소 : 통신을 통해 인터넷 프로토콜을 사용하는 네트워크에 연결된 모든 디바이스에 할당 된 고유 번호.
- 노드 : 데이터를 송신, 수신, 작성 또는 저장할 수 있는 네트워크 내의 연결 지점. 예시로 컴퓨터, 프린터, 모뎀, 브릿지 및 스위치가 있다.
- 라우터 : 네트워크 간에 데이터 패킷에 포함된 정보를 전송하는 물리적 또는 가상 디바이스. 패킷교환기라고도 한다.
- 라우팅 : 라우터가 패킷을 네트워크에서 목적지까지 보내는 최적의 경로를 선택하는 과정.
- 스위치 : 다른 디바이스를 연결하고 네트워크 내의 노드 간 통신을 관리함으로써 데이터 패킷이 최종 목적지에 도달하도록 보장하는 디바이스.
- 포트 : 네트워크 디바이스 간의 특정 연결 식별.
- 프로토콜 : 컴퓨터가 다른 컴퓨터와 통신하는 데 필요한 장비(네트워크 장비 등)가 서로 통신을 위해 정해놓은 통신규약.
- 패킷 교환 : 데이터를 일괄적으로 한 번에 보내지 않고 여럿으로 분할해서 송신하는 것.

## 🪄 네트워크의 장단점

### 장점

- 네트워크 데이터 통신을 통해 방대한 자료를 공유할 수 있다.
- 사진, 음악, 영상 등의 디지털 미디어를 볼 수 있다.
- 프로세스 분배를 통한 성능 향상

### 단점

- 바이러스나, 악성코드로인한 해킹으로 개인정보 유출 피해, 보안상의 문제
- 데이터 변조가 가능하다.

## 🪄 네트워크의 종

!https://feel5ny.github.io/images/post_img/66/network.jpg

- WAN(Wide Area Network) : 광대역 네트워크
  지역간 또는 대륙간의 넓은 지역의 컴퓨터를 연결. 인터넷은 전 세계 수십억 대의 컴퓨터를 연결하는 가장 큰 WAN.

- MAN(Metropolitan Area Network) : 대도시 영역 네트워크
  일반적으로 도시 및 정부기관이 소유, 관리한다.

- LAN(Local Area Network) : 근거리 영역 네트워크
  상대적으로 짧은 거리에 있는 컴퓨터를 연결. 예를 들어 사무실, 학원, 병원의 모든 컴퓨터 연결 가능

- PAN(Personal Area Network) : 가장 작은 규모의 네트워크, 개인 네트워크
  약 5m 전후의 인접 통신. 예를 들어 아이폰과 맥에서 정보를 공유하는 형태.

- 추가적인 네트워크 종류로는 WLAN, CAN, SAN, GAN, VPN, ISDN, Intranet, Extranet 등으로 분류된다.

## 🪄 네트워크의 회선구성 방식

- 포인트 투 포인트(Point-To-Point) 방식 : 중앙 컴퓨터와 단말기를 일대일로 연결하여 언제든지 데이터 전송이 가능하다.
- 멀티 드롭(Multi-Drop) 방식 : 멀티 포인트(Multi-Point) 방식이라고도 하며 다수의 단말기들을 한 개의 통신 회선에 연결한다.
- 회선 다중 방식 : 여러 대의 단말기들을 다중화 장치를 통해 중앙 컴퓨터와 연결하는 방식

## 🪄 네트워크의 데이터 교환 방식

- 회선 교환 방식 : 통신을 원하는 두 지점을 교환기를 이용하여 물리적으로 접속시키는 방법 (ex:음성 전화망)
- 공간 분할 교환 방식 : 기계식 접점과 전자교환기의 전자식 접점 등을 이용하여 교환을 수행하는 방식. (ex:음성 전화용 교환기)
- 시분할 교환 방식 : 전자부품이 갖는 고속성과 디지털 교환 기술을 사용하여 다수의 디지털 신호를 시분할적으로 동작시켜 다중화하는 방식.

## 🪄 네트워크 통신 방식

- 유니 캐스트 : 네트워크 다수의 대상이 있을 때, 그 중 특정 대상이랑만 1:1 통신하는 방법
- 멀티 캐스트 : 네트워크에 다수의 대상이 있을 때, 그 중 특정 대상들이랑만 1:N 통신하는 방법
- 브로드 캐스트 : 네트워크에 다수의 대상이 있을 때, 그 모든 대상과 통신하는 방법

-참고: https://www.ibm.com/kr-ko/cloud/learn/networking-a-complete-guide

     https://cocoon1787.tistory.com/704
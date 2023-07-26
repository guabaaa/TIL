# Docker의 작동 구조

### 🔎 Namespace

Docker는 리눅스 커널의 namespace 기능을 사용하여 컨테이너라는 독립된 환경을 만든다.

Namespace는 한 덩어리의 데이터에 이름을 붙여 분할함으로써 충돌 가능성을 줄이고 쉽게 참조할 수 있는 개념으로 같은 이름의 객체라도 속해있는 namespace가 다를 경우 다른 실체로 처리된다.

리눅스 커널의 namespace는 다음 6가지 독립된 namespace를 지원한다.

| Namesapce |  |
| --- | --- |
| PID namespace | PIDfks Process ID의 약자로 리눅스에서 각 프로세스에 할당된 고유 ID를 말하며, 
namespace가 다른 프로세스끼리는 서로 엑세스 할 수 없다. |
| Network namespace | 네트워크 디바이스, IP 주소, 포트 번호, 라우팅 테이블과 같은 네트워크 리소스를 namespace마다 독립적으로 가질 수 있다.
또한, 중복 포트 바인딩으로 호스트 OS 상에서 사용 중인 포트도 컨테이너 안에서 동일하게 사용할 수 있다. |
| UID namespace | UID namespace를 통해 사용자, 그룹을 namespace 별로 독립적으로 가질 수 있다.
또한, namespace 상에서 root, 호스트 OS 상에서 일반 사용자로 취급이 가능하도록 namespace 안팎에서 서로 다른 UID/GID를 가질 수 있다. |
| MNT namespace | 리눅스는 파일 시스템을 사용하기 위해서 OS에 장치를 인식시키는 마운트가 필요하다.
MNT namespace를 이용해서 호스트 파일 시스템과 별도로 독립적으로 파일 시스템을 mount/unmount 가능하다. |
| UTS namespace | Namespace 별로 호스트 명이나 도메인 명을 독자적으로 가질 수 있다. |
| IPC namespace | IPC는 Inter-Process Communication의 약자로 IPC namespace를 통해 namespace 별로 프로세스 간의 독립적인 통신 통로를 할당 받을 수 있다. |

### 🔎 Control groups

Namespace와 더불어 도커는 물리 머신 상의 자원을 여러 컨테이너가 공유하여 작동하므로 리눅스 커널의 control groups(cgroups) 기능을 사용하여 자원의 할당 등을 관리한다.

cgroups는 프로세스를 그룹화하여 그 그룹 안에 존재하는 프로세스와 스레드에 대한 물리 머신 리소스 (cpu 사용량, 메모리 사용량, devices 접근 권한 등) 할당을 관리한다.

예를 들어 컨테이너 안의 자원을 제한함으로써 하나의 컨테이너가 머신 리소스 전체를 모두 사용해버리는 일을 방지할 수 있다.

### 🔎 네트워크 구성

리눅스에 도커를 설치하면 서버의 물리 NIC (Network Interface Controller)에 연결된 `docker()`라는 가상 브리지 네트워크가 생성된다.

이 `docker()`브리지는 컨테이너가 통신하기 위해 사용되며, 컨테이너를 생성하면 자동으로 이 브리지를 활용하도록 설정되어 있다.

또한, `docker()`는 172.17.0.0/16 서브넷 마스크를 가지므로 컨테이너가 생성되면 이 대역 안에서 IP를 할당받게 된다.(컨테이너가 재시작할 때마다 변경된다)

컨테이너가 외부와 통신하기 위해 도커는 2개의 네트워크 인터페이스를 생성한다. 하나는 컨테이너 내부 namespace에 할당되는 `eth()`이며 나머지 하나는 호스트 네트워크 브리지 `docker()`에 연결되는 veth (virtual eth) 인터페이스이다.

**할당받은 172.17.0.0/16 대역대의 IP는 `eth()`에 자동으로 할당된다.**

!https://blog.kakaocdn.net/dn/pkIbZ/btq09zvcuHn/55UQHIMfUhk2pijzfJd0kk/img.png

도커 컨테이너와 외부 네트워크가 통신을 할 때는 `docker()`과 호스트 OS의 물리 NIC에서 패킷을 전송하는 장치가 필요한데 도커에서는 NAPT (Network Address Port Translation)을 이용한다.

### 🔎 NAT

NAT는 하나의 공인 IP를 여러개의 사설 IP로 변환하여 사설망과 외부망 사이에서 중개자 역할을 하는 것으로, 보통 공유기가 그 역할을 한다.

NAT를 사용하면 하나의 공인 IP주소에 대해 여러개의 사설 IP를 사용할 수 있으므로 IP주소를 효율적으로 사용할 수 있고, 외부망에서 접근시 공유기를 거쳐야 하므로 보안이 강해진다.

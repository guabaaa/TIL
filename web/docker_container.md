# Container - Docker

<aside>
💡 컨테이너란?

호스트 OS 상에 논리적인 구획을 만들고 애플리케이션을 작동시키기 위해 필요한 라이브러리나 애플리케이션 등을 하나로 모아 마치 별도의 서버인 것 처럼 사용할 수 있게 만든 것이다.

</aside>

### 🔎 컨테이너

컨테이너는 호스트 OS의 리소스를 논리적으로 분리시키고 여러 개의 컨테이너가 공유하여 사용한다.

일반적으로 물리 서버 상에 설치한 호스트 OS의 경우, 하나의 OS 상에서 움직이는 여러 애플리케이션은 똑같은 시스템 리소스를 사용하므로 데이터 디렉토리를 공유하고 동일한 IP주소로 통신을 한다. 따라서 여러 애플리케이션에서 사용하고 있는 미들웨어나 라이브러리의 버전이 다를 경우 충돌을 방지하도록 따로 주의해야한다.

하지만 컨테이너는 OS나 디렉토리, IP 주소와 같은 시스템 자원을 마치 각 애플리케이션이 독립적으로 점유하고 있는 것처럼 보이게 할 수 있다.

!https://blog.codefactory.ai/static/7cf653aa30a295409eb8e3887e72ad38/c1b63/inline-1.png

> Docker 공식 문서 : 컨테이너는 코드 및 종속성을 함께 패키징하는 애플리케이션 계층의 추상화

즉, 하나의 Host OS 위에서 자원만 (커널) 공유할 뿐 각 컨테이너는 서로 독립적으로 분리된 공간에서의 프로세스로 실행된다.
컨테이너는 프로세스 단위의 서로 분리 독립된 가상환경이라 생각할 수 있고 컨테이너의 정보를 담고 있는 Docker 이미지를 통해 Docker만 설치되어 있다면 어떤 인프라에서든 사용 가능하다.
>

### 🔎 Docker 개요

Docker는 애플리케이션의 실행에 필요한 환경을 하나의 이미지로 모아두고, 그 이미지를 사용하여 다양한 환경에서 애플리케이션 실행 환경을 구축 및 운용하기 위한 오픈소스 플랫폼이다.

> 기존의 일반적인 시스템 개발 흐름 상에서는 각 환경마다 미들웨어, 라이브러리의 버전이 다르거나 인프라 환경이 다르기 때문에 개발 환경이나 테스트 환경에서 올바르게 작동해도 제품 실제 환경에서는 정상적으로 작동하지 않는 경우가 있다.
>

!https://post-phinf.pstatic.net/MjAxODA5MTFfMjgy/MDAxNTM2NjI0ODgyNDk0.GrqKtZNrlllb5cpnVYQn0kylEVxn537NGfHw-Wd4OSIg.fyL9t6ksiYLza_3NffFBlgHnxOaOhL886fwehDj6BTEg.JPEG/mug_obj_201809110914426736.jpg?type=w1080

> Docker는 이러한 인프라 환경을 컨테이너로 관리한다.
애플리케이션의 실행에 필요한 모든 파일 및 디렉토리들을 Docker 이미지로 빌드하여 이를 이용해 각 환경에서 컨테이너를 가동시킨다.
Docker만 설치되어 있다면 매우 쉽게 컨테이너를 가동시킬 수 있고 각 환경에 따라 애플리케이션을 동일한 환경에서 가동시킬 수 있으므로 환경 간의 이식성 (portability)를 도모할 수 있다.
>

!https://post-phinf.pstatic.net/MjAxODA5MTFfMjE4/MDAxNTM2NjI0ODgyNTc3.2jRfdU4Nr76OalfcL3PkNAqoGQK-TcnthOZtmXfKX-Ug.XtQCxpl1tC1F5Z7sZQqCao9aOXyi5o-NoW7FW0J9AX8g.JPEG/mug_obj_201809110914424837.jpg?type=w1080

> Docker로 인한 높은 이식성은 시스템 유지/보수 입장에서 굉장히 중요하다.
애플리케이션의 실행 환경에 제약이 많게 되면 개발 속도가 떨어지는 경우도 많고 온프레미스 환경에서의 경우 복잡한 인프라 구성으로 쉽게 다룰 수 없는 복잡한 환경이 되어버리기 때문이다.
즉, 실행 환경의 구축, 버전 관리 등이 아닌 온연한 솔루션 개발에 집중할 수 있게 된다.
>

### 🔎 Virtual machine

Virtual machine은 호스트형 서버 가상화로 하드웨어 상에 베이스가 되는 호스트 OS를 설치하고 호스트 OS에 가상화 소프트웨어를 설치한 후 가상화 소프트웨어 상에서 Guest OS를 작동시키는 기술이다.

가상화 소프트웨어로는 대표적으로 VMWare나 Virtual Box가 있다. 하지만 이 방식은 호스트OS 상에서 다른 Guest OS를 움직여야 하기 때문에 오버헤드가 커지고 부팅속도가 느리다.

!https://pyrasis.com/assets/images/jHLsAlwaysUpToDateDocker/Unit01/5.webp

> 하나의 Host OS 상에서 OS자원을 공유한 채 프로세스 단위에서 독립적인 가상환경을 지원하는 컨테이너와 달리 가상환경은 하나의 서버를 여러 서버로 전환하는 물리적인 하드웨어의 추상화로서 하나가 독립된 OS 커널을 가진 완전한 컴퓨터를 설치하는 방법이다. 즉, OS를 별도로 포함해야 되기 때문에 매우 무겁다.

컨테이너는 호스트 OS를 공유하므로 컨테이너 하나가 공격당하면 다른 컨테이너까지 위험해질 수 있는 확률이 높아진다. 하지만 VM의 경우는 물리적인 하드웨어 단에서 격리되다 보니 보안에 굉장히 강력하다. VM이 공격당한다 하더라도 다른 VM이나 호스트에는 상관이 없게 되기 때문이다.
또한, 컨테이너는 호스트 OS를 공유하게 되니 호스트 OS와 다른 OS를 올릴 수 없다. 하지만 VM은 윈도우 호스트에 리눅스, 리눅스 호스트에 윈도우 등으로 multi-OS 설치가 가능하다.
>

-참고 : https://hongl.tistory.com/91
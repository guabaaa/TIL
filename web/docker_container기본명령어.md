1. docker container 명령어
   docker container run : 컨테이너 생성 + 실행

docker run 만 써도 무방하다. container 를 쓰는 이유는 단순 명시하기 위해 쓴다
실행시
이미지를 local registry 에서 찾는다
찾는 이미지가 local registry 에 없다면, docker hub 에 접속하여 검색한다
이미지를 local registry 로 pull 하고, pull 한 이미지를 이용하여 컨테이너 생성하고, 실행한다
실행시 문제가 있다면 exit 상태가 된다
docker container attach : i나 t 옵션을 가지고 생성된 컨테이너에 직접 접속

docker container exec : 컨테이너로 직접 들어가지 않고, 외부에서 컨테이너로 명령을 전달하고, 결과 값을 Host 에서 전달 받는다

docker container start : 중지된 컨테이너를 실행

2. docker container run 옵션
   -it 옵션 : 대화식 단말 디바이스를 할당하여 Host 가 생성된 컨테이너에 직접 통신이 가능하게 한다. 일반적으로 i 와 t 는 같이 쓰인다

-i 옵션 : 대화식 모드
-t 옵션 : 단말 디바이스 할당
-it 옵션이 사용되면, 명령어 마지막에 컨테이너에게 전달할 명령을 써준다. 주로, /bin/bash or /bin/sh 명령어를 사용하여 컨테이너 실행시 shell 을 동작시키게 한다
-d 옵션 : 컨테이너를 백그라운드에서 실행

--name 옵션 : 관리를 위한 목적으로 사용한다. 컨테이너가 생성되면 각 컨테이너 별로 id, name 이 할당된다. 하지만 별도로 관리의 편의를 위해 이름을 직접 지정할 수 있다

다수의 컨테이너를 관리할 때에는 별도의 이름을 입력하는 것이 불필요한 작업이 될 것이다. 이때에는 작성하지 않는다
--restart 옵션 : 처음 생성시, 호스트 재부팅시 컨테이너를 어떻게 실행할지 지정하는 옵션이다. 웹서버나 DB 와 같이 상시적으로 동작 해야 하는 컨테이너의 경우에는 초기 생성시 --restart=always 로 하여 실행에 문제가 있더라도 계속해서 실행을 시도하도록 설정해주는 것이 좋다

--env ( -e ) : 시스템 환경 변수를 컨테이너에 작성한다

-v ( --volume ) : 볼륨 지정

testvolume1:/var/lib/mysql : testvolume1 을 볼륨을 iscsi 로 연결. 컨테이너에서는 이 볼륨을 /dev/sda5 와 같은 자신의 디스크로 인식한다
/testvolume1:/var/lib/mysql : /testvolume1 이라는 디렉터리를 nfs 로 연결
testvolume1:/var/lib/mysql:ro : 마지막에 권한을 부여하는 것도 가능하다. 이를 작성하지 않으면 기본적으로 rwx 모든 권한을 부여하는 것이다. 만약, 부여하고 싶은 권한을 지정하고 싶으면 마지막 : 뒤에 부여할 권한을 작성하면 된다
-p 옵션 : Host의 Port 와 매핑하는 옵션

보통 동일한 웹 서버 컨테이너 다수를 서비스할 때, 하나의 서버에 다수의 웹 서버 컨테이너를 놓을려면 서버의 각 Port 에 컨테이너 하나씩 지정 해야 하는데, 이는 웹 서비스를 할 때 웹에 접속할 시 Port 를 작성 해서 접속 해야 하므로, 접속에 불편함이 있으므로 이러한 방식은 말이 안된다. 따라서, 하나의 서버에 하나의 웹 서버 컨테이너를 놓고 서비스를 해야 한다. 이러한 다수의 서버들을 Cluster 로 만들어 관리해야 한다. 이때, 다수의 컨테이너들을 Docker Swarm 과 같은 도구로 관리할 수 있다
이러한 서버들의 앞에 로드 밸런서를 두고 트래픽을 관리하게 한다
3. link


link 옵션이 없더라도, 컨테이너는 docker0 네트워크에 연결되있으므로, Ip 를 이용해 서로 통신이 가능하다

허나, 기존에 통신하던 컨테이너가 종료되고, 다른 컨테이너가 생성됬을때, docker0 네트워크는 DHCP 이므로, 원래 통신하던 컨테이너의 Ip 가 다른 컨테이너에 할당되어 통신에 문제가 생긴다
link 를 하면, 컨테이너는 자신의 Ip 를 link 된 컨테이너에 알려준다. 이를 통해 컨테이너 이름으로 서로 통신할 수 있다

실습
docker container run -d --name wpdb1 -e MYSQL_ROOT_PASSWORD=test123 -e MYSQL_DATABASE=wordpress -v wpdb1:/var/lib/mysql mysql:5.7


link 를 위한 DB 컨테이너 생성
docker container run -d --name wp1 -e WORDPRESS_DB_PASSWORD=test123 -e WORDPRESS_DB_USER=root -e WORDPRESS_DB_NAME=wordpress -p 8001:80 --link wpdb1:db1 wordpress


wp 컨테이너를 생성한다. link 시 db1 은 단순한 별칭이다


생성한 컨테이너의 hosts 파일을 확인해보자. 마지막 줄에 스스로의 Ip 와 link 된 컨테이너의 Ip 가 적혀있다. 지정한 별칭 / 컨테이너 ID / 컨테이너 이름 순으로 적혀있다. 이를 통해 이름으로 통신하면, 이름에 해당하는 Ip 를 찾아 해당 Ip 로 통신하므로, link 를 하면 이름으로 통신할 수 있게 된다


- 출처 : https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-Docker-%EA%B3%B5%EB%B6%80-docker-container-%EA%B8%B0%EB%B3%B8-%EB%AA%85%EB%A0%B9%EC%96%B4
1. Docker Image 를 만드는 법
   p. 155

도커 이미지 만들기
동작중인 컨테이너를 commit 을 통해 이미지로 변환
tar 파일을 이용하여 내용을 이미지로 전송하는 방식으로 새로운 이미지 만들기 -> image save
Docker File 을 이용하여 이미지 생성하기 ( 일종의 명세서를 작성하여 생성 )
Docker File 에 적힌 명령은 순차적으로 인식되며, 이를 통해 이미지를 build 한다. 이렇게 생성한 이미지는 로컬에 위치하며, 이를 다른 registry 에 Push 할 수 있다. 단, Push 할 때는 형식에 맞게 이름을 변경 해야 한다

도커는 개발 환경의 컨테이너화를 위한 표준

Docker File 은 도커 이미지, 즉 필요로 하는 개발 환경을 제공하기 위한 여러 가지 명령어들의 집합체

2. 간단한 Docker Image 만들기


디렉터리를 만들고 Dockerfile 을 생성하자. 이 파일 이름은 다르게 할 수도 있지만, 이름을 다르게 하면, build 할 때 다른 옵션이 필요하다. 이름을 Dockerfile 로 하면 다른 옵션 없이 바로 build 가 가능하다

맨 윗 줄 에 ' FROM 사용할 이미지 ' 를 통해 Base Image 를 지정한다

Dockerfile 로 이미지를 build 하고 확인하자. centos 와 test 는 같은 이미지 이므로 layer 층만 다르다. 따라서 이는 같은 용량의 이미지가 두 개 있는 것이 아닌, 하나의 이미지에 layer 만 다른 것 이다
docker build -t test:1.0 .
사용할 Dockerfile 의 위치가 같은 폴더이므로 . 을 쓰면 된다. -t 옵션은 이미지명과 태그명을 붙이는 것으로 실제 사용에서 거의 필수인 옵션이다
Docker Image 살펴보기


cmd 는 생성된 이미지가 컨테이너로 실행할 때 실행되는 명령어이며, 여러개의 cmd 를 작성하여도 마지막 하나만 처리된다. Entrypoint 도 생성된 이미지가 컨테이너로 실행될 때 사용되며, 이 역시 여러개 작성하여도 마지막 하나만 처리된다

label : 이미지 작성 목적으로 버전, 타이틀, 설명, 라이선스 정보 등을 작성한다

volume : 볼륨을 이미지 빌드에 미리 설정하는 것으로, volume 으로 지정된 컨테이너의 경로는 볼륨의 기본 경로 /var/lib/docker 와 자동으로 연결된다

3. 자주 사용하는 Docker File 옵션들
   RUN : 명령어 작성, 이미지에 패키지 설치, 업데이트 등의 명령을 실행하고자 하는 경우 작성한다

shell 형식
RUN apt -y install nginx
RUN yum -y install httpd
exec 형식
RUN ["echo","테스트"]
CMD : 이미지가 컨테이너로 배포될 때 실행할 명령어를 추가할 수 있다

CMD nginx -g 'damon off;'
CMD ["nginx","-g","daemon off;"]

CMD 는 보통 Docker FIle 맨 밑에 작성
ENTRYPOINT : 이미지가 컨테이너로 배포될 때 사용하는 명령어

ENTRYPOINT nginx -g 'daemon off;'

COPY : Host 환경의 파일, 디렉터리를 이미지 안에 복사하는 경우 작성한다. Build 작업이 일어나는 디렉터리 외부의 File 이나 디렉터리는 COPY 할 수 없다

ADD : COPY 를 포함한다. URL 에 있는 파일을 붙여넣기 하는 것도 가능하다. 또한 패키지, 압축 파일의 경우에는 이를 해제하여 내용물만 붙여넣기 할 수 있다. 단, URL 상의 tar 파일등은 해제 되지 않은 상태에서 붙여넣기 된다

COPY test.tar /var/www/html - test.tar 그대로 복사되어 붙여넣기 된다
ADD test.tar /var/www/html - test.tar 을 압축 해제해서 안에 내용물이 복사되어 붙여넣기 된다

VOLUME : 이미지에 볼륨을 할당하고자 할 때 사용한다

VOLUME /var/log
VOLUME ["/var/log"]

EXPOSE : 마치 방화벽에서 몇 번 Port 를 열지 지정하는 것과 유사하다

EXPOSE 80
EXPOSE 8080
EXPOSE ["80","8080"] -> 80 번 Port 와 8080 번 Port 를 연다

WORKDIR : 컨테이너 내에서 작업할 경로 설정

WORKDIR /var/www
"/var/www 에서 작업할 내용"
WORKDIR /root
"/root 에서 작업할 내용"

RUN cd /var/www 로 할 경우, 해당 /var/www 로 이동한 다음, RUN 명령이 끝나면 다시 원래 위치로 돌아온다. 따라서, RUN 으로는 특정 경로에서 작업하는 것이 불가능하다
USER : 작업 사용자 지정

ARG : 컨테이너가 아니라 이미지에서 사용하는 변수 지정

CMD 와 ENTRYPOINT
둘 다 Docker File 내에서 1 번만 사용 가능하다. 여러번 사용하면 마지막 하나만 처리된다

ex)
FROM ubuntu
ENTRYPOINT ["top"]
CMD ["-d","10"]

위 형식으로 이미지 생성 후 아래 코드로 배포
docker container run -it test:1.0
top 주기를 10에서 2로 줄이고자 CMD 를 전달했다
docker container run -it test:1.0 -d 2
이 경우, Docker File 에 적힌 CMD 가 아닌, 전달한 CMD 를 선택하여 top -d 2 를 실행한다
CMD, ENTRYPOINT 에서 실행하는 명령어가 docker container run 에서 실행하는 옵션과 동일한 경우, ENTRYPOINT 는 모두 처리한다. 하지만, CMD 는 동일 옵션이 있는 경우 docker container run 에 있는 옵션만을 처리한다

ENTRYPOINT 는 고정적으로 실행할 명령을 작성하고, CMD 는 변경될 가능성이 있는 매개 변수, 옵션 등에 대하여 지정할 때 주로 사용한다

추가적으로 만약 컨테이너로 배포될 때 실행해야할 명령어가 ENTRYPOINT 나 CMD 두 개 가지고는 부족한 경우에는 shell 파일을 만들고, CMD 나 ENTRYPOINT 를 이용하여 해당 shell 을 실행하도록 설정한다

4. ONBUILD
   ONBUILD 는 이를 이용하여 베이스 이미지를 만들때에는 필요하지 않지만, 생성된 이미지를 베이스 이미지로 활용하는 경우에는 사용되는 명령
   ex ) 웹 개발 팀장이 팀원들 중에 /blog 를 만드는 팀 에게 아래와 같이 지시했다
   "제가 index.html 만들테니, blog 팀은 개발된 파일이나 디렉터리를 blog.tar 로 만드세요"



위와 같이 Docker file 을 작성하자

팀장은 index.html 만 만들면 된다. 이제 팀원들이 blog.tar 을 만들어서 이 이미지를 베이스 이미지로 사용할 때 ONBUILD ADD 가 사용된다

이미지를 생성하자

Step 를 확인하자. Step 에서 ONBUILD 가 실행되었지만, 이때 사용될 blog.tar 은 지금 가지고 있을 필요가 없다

생성한 이미지 확인
베이스 이미지 활용하여 이미지 생성


blogdev 디렉터리 안에 blog 디렉터리 안에 html 파일을 생성하자

blog 디렉터리를 압축하여 tar 파일을 생성하자

이미지 생성을 위해 Dockerfile 을 생성하고, 편집기로 열어주자

위에서 생성한 베이스 이미지를 사용한다고 작성한다. 이를 통해 이미지를 생성하면 베이스 이미지에서 작성한 ONBUILD 가 실행된다

베이스 이미지를 토대로 이미지를 생성하자. ONBUILD 가 실행되어 blog.tar 이 ADD 될 것 이다
컨테이너 배포


생성한 이미지로 컨테이너를 배포하자

접속하면, 팀장이 만든 index.html 이 보인다

/blog 로 들어가면, blog 팀이 작성한 tar 파일 내용물인 html 파일이 보인다
ONBUILD는 ONBUILD 가 작성된 파일을 베이스 이미지로 하는 별도의 Docker file 에서 동작하는 옵션이다
5. 이미지 생성 Quiz 1 - nginx
   ubuntu 18.04 이미지를 베이스 이미지로 하여 nginx 를 설치하고, 해당 nginx 에서는 개발자가 작성한 index.html 파일이 보이도록 설정한다! 외부에서 접속시 해당 컨테이너의 웹페이지가 보여야 하며, 포트 번호는 8881 을 이용하여 접속할 수 있어야 한다
   단, 위의 실습전 각 ubuntu 의 Ip 주소는 192.168.1.118 로 한다


centos 나 ubuntu 이미지에 웹 서버를 설치하면 /var/www/html 이 홈 디렉터리가 되고, 그냥 웹 서버 이미지를 사용하면, 홈 디렉터리는 위와 같다


vmnet 0 으로 변경

다음 yaml 파일을 편집기로 열어주자

위와 같이 yaml 파일을 작성하자. yaml 파일은 들여쓰기가 중요하므로 tab 이 아닌 space 로 들여쓰기를 해줘야 한다
# Let NetworkManager manage all devices on this system
network:
ethernets:
ens32:
addresses: [192.168.1.118/24]
gateway4: 192.168.1.1
nameservers:
addresses: [8.8.8.8, 168.126.63.1]
dhcp4: no
version: 2
#renderer: NetworkManager


netplan 변경 사항을 적용시키자
FROM ubuntu:18.04
RUN apt-get update
RUN apt-get -y install nginx
EXPOSE 80
ADD index.html /var/www/html/index.html
CMD ["nginx", "-g", "daemon off;"]


Dockerfile 은 다음과 같이 작성한다

Dockerfile 을 토대로 이미지 파일을 생성하자

Host 의 8881 Port 와 매핑하여 컨테이너를 배포하자

잘 접속이 된다
6. 이미지 생성 Quiz 2 - xpressengine
   https://xe1.xpressengine.com/ 접속
   다음의 조건을 활용하여 배포된 컨테이너는 접속 즉시 설치페이지에서 설치후 게시판을 사용할 수 있어야 한다
   컨테이너 두 개 필요 ( xe 컨테이너, db 컨테이너 )
   centos:7 을 base 로 xe1.0 이미지 만들기 -> xe01 컨테이너
   mysql:5.7 -> db01 컨테이너
   db 정보 : root / test123 / xbdb

centos 에는 php, php-fpm, php-gd, php-mysql, 소스코드 풀기를 해야 한다

참조 ) https://missio1227.tistory.com/26

DB 컨테이너 배포


db01 컨테이너를 배포해주자
docker container run -d --name db01 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=wordpress --restart=always mysql:5.7
XE 이미지를 위한 Dockerfile 작성
https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-Docker-%EA%B3%B5%EB%B6%80-Dockerfile-%EC%9D%98-%EA%B8%B0%EB%B3%B8

위 글에서 이어서 진행한다


- 출처 : https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-Docker-%EA%B3%B5%EB%B6%80-Docker-Image-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
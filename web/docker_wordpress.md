1. 실습 내용
   워드 프레스 구축하기
   실제 환경에서는 php 설치, apache 설치, mariaDB ( Mysql ) 설치, wordpress 소스 코드가 필요하다. 하지만, 컨테이너를 이용하게 되면 이를 두 개의 컨테이너로 구성할 수 있다

Mysql 이미지 - 배포 -> DB 컨테이너
wordpress 이미지 - 배포 -> WP 컨테이너
2. DB 컨테이너 생성


Mysql 은 DB 와 Table 에 대한 정보가 /var/lib/mysql 에 저장된다. 이를 볼륨과 mount 하자
docker container run -d --name wpdb -v wpdbvol:/var/lib/mysql \
> --restart=always -e MYSQL_ROOT_PASSWORD=test123 -e MYSQL_DATABASE=wordpress \
> mysql:5.7
코드는 위와 같다

잘 동작하는지 확인하자

볼륨도 잘 생성되었다. 이처럼 볼륨을 미리 생성하여 연결할 필요없이 컨테이너 생성시 볼륨이 자동으로 생성되어 연결된다
3. WP 컨테이너 생성
   docker container run -d --restart=always -p 8080:80 --name=wp -e WORDPRESS_DB_PASSWORD=test123 -e WORDPRESS_DB_NAME=wordpress -e WORDPRESS_DB_USER=root --link wpdb:mysql -v wpvol:/var/www/html wordpress
   위 코드를 통해 생성하자

포트 지정, DB 연결시 필요한 환경 변수 설정, DB 와 link, 볼륨 마운트까지 해주었다

wordpress 에 잘 들어가진다
4. cAdvisor
   cAdvisor 는 서비스 운영을 하면서 필요한 시스템 Metric ( CPU / 메모리 사용률 / 네트워크 트래픽 등 ) 을 모니터링 하면서 특이사항이 있을 때, 대응하기 위해 모니터링 수행을 위한 도구 이다
   docker run --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --publish=9559:8080 --detach=true --name=cadvisor google/cadvisor:latest
   위 코드를 실행하여 cadvisor 컨테이너를 생성하자

생성이 되면 9559 번 Port 로 접속해보자

cAdvisor 에 잘 접속된다
5. Prune


다음과 같이 사용하지 않는 네트워크, 볼륨을 prune 을 통해 삭제 가능하다

위와 같이 system prune 을 하면, 네트워크, 볼륨을 포함하여 사용하지 않는 모든 시스템 요소를 삭제 가능하다


- 출처 : https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-Docker-%EA%B3%B5%EB%B6%80-wordpress-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-cAdvisor-Prune
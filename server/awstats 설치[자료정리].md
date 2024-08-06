# awstats 설치 (자료 정리)

<aside>
💡 Perl 설치 여부 확인 필요

```bash
[root@localhost ~]# rpm -qa | grep perl  (RPM 설치 확인)
[root@localhost ~]# dnf install perl  (없다면 Perl 설치)
[root@localhost ~]# perl -v  (버전 확인)
```

</aside>

<aside>
💡 뉴스 샐러드 api 서버의 경우 php 설치 되어있지 않음으로 크론으로 html 파일 매 시간마다 생성해서 통계페이지 생성

</aside>

---

## 설치 과정

1. 파일 다운로드

   ```bash
   sudo su
   yum install wget

   # 다운로드
   [root@localhost ~]# sudo wget https://prdownloads.sourceforge.net/awstats/awstats-7.8.tar.gz --no-check-certificate
   ****[root@localhost ~]# tar xvfz awstats-7.8.tar.gz  **(압축해제)**
   [root@localhost ~]# **mv awstats-7.8 /usr/local/awstats  (폴더 이동 및 이름 변경)**
   ```

1. 설치

   ```bash
   cd /usr/local/awstats/tools  (경로이동)

   sudo ./awstats_configure.pl

   - ---- AWStats awstats_configure 1.0 (build 20140126) (c) Laurent Destailleur -----
   This tool will help you to configure AWStats to analyze statistics for
   one web server. You can try to use it to let it do all that is possible
   in AWStats setup, however following the step by step manual setup
   documentation (docs/index.html) is often a better idea. Above all if:
   - You are not an administrator user,
   - You want to analyze downloaded log files without web server,
   - You want to analyze mail or ftp log files instead of web log files,
   - You need to analyze load balanced servers log files,
   - You want to 'understand' all possible ways to use AWStats...
   Read the AWStats documentation (docs/index.html).
   - ----> Running OS detected: Linux, BSD or Unix
   - ----> Check for web server install

   Enter full config file path of your Web server.
   Example: /etc/httpd/httpd.conf
   Example: /usr/local/apache2/conf/httpd.conf
   Example: c:\Program files\apache group\apache\conf\httpd.conf
   Config file path ('none' to skip web server setup):

   **> none**
   >

   Your web server config file(s) could not be found.
   You will need to setup your web server manually to declare AWStats
   script as a CGI, if you want to build reports dynamically.
   See AWStats setup documentation (file docs/index.html)

   - ----> Update model config file '/usr/local/awstats/wwwroot/cgi-bin/awstats.model.conf'
   File awstats.model.conf updated.
   - ----> Need to create a new config file ?
   Do you want me to build a new AWStats config/profile
   file (required if first install) [y/N] ? **y**
   - ----> Define config file name to create
   What is the name of your web site or profile analysis ?
   Example: [www.mysite.com](http://www.mysite.com/)
   Example: demo
   Your web site, virtual server or profile name:

   > **dev-api.newssalad.com (개발계) / api.newssalad.com (운영계)**
   >
   - ----> Define config file path
   In which directory do you plan to store your config file(s) ?
   Default: /etc/awstats
   Directory path to store config file(s) (Enter for default):

   >
   >
   - ----> Create config file '/etc/awstats/awstats.dev-api.newssalad.com.conf'
   Config file /etc/awstats/awstats.dev-api.newssalad.com.conf created.
   - ----> Add update process inside a scheduler
   Sorry, [configure.pl](http://configure.pl/) does not support automatic add to cron yet.
   You can do it manually by adding the following command to your cron:
   /usr/local/awstats/wwwroot/cgi-bin/awstats.pl -update -config=[dev-api.newssalad.com](http://dev-api.newssalad.com/)
   Or if you have several config files and prefer having only one command:
   /usr/local/awstats/tools/awstats_updateall.pl now
   Press **ENTER** to continue...

   A SIMPLE config file has been created: /etc/awstats/awstats.dev-api.newssalad.com.conf
   You should have a look inside to check and change manually main parameters.
   You can then manually update your statistics for '[dev-api.newssalad.com](http://dev-api.newssalad.com/)' with command:

   > perl awstats.pl -update -config=dev-api.newssalad.com
   You can also build static report pages for 'dev-api.newssalad.com' with command:
   perl awstats.pl -output=pagetype -config=dev-api.newssalad.com
   >

   Press **ENTER** to finish...
   ```

1. GeopIp 적용

   ```bash
   #geoip 설치
   yum install epel-release
   yum install GeoIP GeoIP-data perl-Geo-IP GeoIP-devel

   #설치 확
   ll /usr/share/GeoIP/

   ```

1. 로그파일 위치

   ```bash
   # 2에서 생성된 config 파일 경로
   /etc/awstats

   #config 파일 열어서 아래 경로 수정
   vi awstats.dev-api.newssalad.com.conf
   LogFile ="/var/log/nginx/access.log"
   -> 개발계 : LogFile ="/var/log/nginx/dev-api.newssalad.com.access_%YYYY%MM%DD.log"
   -> 운영   : LogFile ="/var/log/nginx/api.newssalad.com.access_%YYYY%MM%DD.log"

   62 LogType=W  [Web log file]
   126 LogFormat=1  [1번일 경우 Apache combined logs 기본 포멧 사용/ 2번은 Windows IIS]
    ※ Apache CustomLog 설정 시에는 꼭 combined 사용해주시기 바랍니다.
   157 SiteDomain="api.newssalad.com"  [개인 사이트 도메인]
   172 HostAliases="api.newssalad.com www.api.newssalad.com 127.0.0.1 localhost"  [별칭 설정]
   941 Lang="ko"  [auto → ko 언어(한국어) 변경]

   # PLUGIN: GeoIP
   # REQUIRED MODULES: Geo::IP or Geo::IP::PurePerl (from Maxmind)
   # PARAMETERS: [GEOIP_STANDARD | GEOIP_MEMORY_CACHE] [/pathto/geoip.dat[+/pathto/override.txt]]
   # DESCRIPTION: Builds a country chart and adds an entry to the hosts
   # table with country name
   # Replace spaces in the path of geoip data file with string "%20".
   LoadPlugin="geoip GEOIP_STANDARD /usr/share/GeoIP/GeoIP.dat"

   # PLUGIN: GeoIP_City_Maxmind
   # REQUIRED MODULES: Geo::IP or Geo::IP::PurePerl (from Maxmind)
   # PARAMETERS: [GEOIP_STANDARD | GEOIP_MEMORY_CACHE] [/pathto/GeoIPCity.dat[+/pathto/override.txt]]
   # DESCRIPTION: This plugin adds a column under the hosts field and tracks the pageviews
   # and hits by city including regions.
   # Replace spaces in the path of geoip data file with string "%20".
   LoadPlugin="geoip_city_maxmind GEOIP_STANDARD /usr/share/GeoIP/GeoIPCity.dat"
   ```

   ```bash
   #nginx.conf 파일 수정
   	  ##################
       # AWSTATS        #
       ##################
       server {
           listen 80;
           server_name dev-api.newssalad.com;  #api.newssalad.com
           root /usr/local/awstats/wwwroot/static;
           index awstats.dev-api.newssalad.com.html;

           access_log off;
           error_log off;
           charset utf-8;

           # Static awstats files: HTML files stored in DOCUMENT_ROOT/awstats/
           location /classes/ {
                   alias /usr/local/awstats/wwwroot/classes/;
           }

           location /css/ {
                   alias /usr/local/awstats/wwwroot/css/;
           }

           location /icon/ {
                   alias /usr/local/awstats/wwwroot/icon/;
           }

           location /awstats-icon/ {
                   alias /usr/local/awstats/wwwroot/icon/;
           }

           location /awstatsicons/ {
                   alias /usr/local/awstats/wwwroot/icon/;
           }

           location /js/ {
                   alias /usr/local/awstats/wwwroot/js/;
           }

   				location /status {
               include uwsgi_params;
               uwsgi_pass unix:/var/run/ns_api.sock;
           }
       }
   ```

---

1. **Static HTML 파일이 만들어질 수 있게 디렉토리를 생성한다.**

   만들어질 파일과 구분을 위해서 static이라는 디렉토리를 만들자. 아니면 자신이 원하는 곳에 해도 상관 없다.

   ```bash
   # mkdir /server/awstats/wwwroot/static
   mkdir /usr/local/awstats/wwwroot/static
   ```

2. **Static HTML 파일 생성**

   다음 명령을 실행해서 Static HTML 파일을 생성한다.

   config는 위의 설정에서 지정한 이름으로 한다. dir은 Static HTML 파일이 만들어질 위치이며 -awstatsprog는 swstats.pl 파일이 있는 위치이다. 위의 명령을 실행하면 dir에 지정된 디렉토리에 Static HTML 파일들이 생성된다

   ```bash
   # /server/awstats/tools/awstats_buildstaticpages.pl -update -config=www.wildpup-dev.com -lang=en -dir=/server/awstats/wwwroot/static -awstatsprog=/server/awstats/wwwroot/cgi-bin/awstats.pl
   /usr/local/awstats/tools/awstats_buildstaticpages.pl
   -update
   -config=[dev-api.newssalad.com](http://dev-api.newssalad.com/)
   -lang=ko
   -dir=/usr/local/awstats/wwwroot/static
   -awstatsprog=/usr/local/awstats/wwwroot/cgi-bin/awstats.pl

   #개발
   /usr/local/awstats/tools/awstats_buildstaticpages.pl -update -config=[dev-api.newssalad.com](http://dev-api.newssalad.com/) -lang=ko -dir=/usr/local/awstats/wwwroot/static -awstatsprog=/usr/local/awstats/wwwroot/cgi-bin/awstats.pl

   #운영
   /usr/local/awstats/tools/awstats_buildstaticpages.pl -update -config=[api.newssalad.com](http://dev-api.newssalad.com/) -lang=ko -dir=/usr/local/awstats/wwwroot/static -awstatsprog=/usr/local/awstats/wwwroot/cgi-bin/awstats.pl
   ```

3. 쉘 파일 생성 및 크론탭 등록
   1. 데일리 로그 생성 쉘 생성

      ```bash
      #killall 명령어위해서 설
      yum install psmisc

      # nginx_daillog.sh - 개발계
      #!/bin/sh
      mv /var/log/nginx/access.log /var/log/nginx/dev-api.newssalad.com.access_`date +%Y%m%d`.log
      killall -USR1 nginx
      # nginx_daillog.sh - 운영계
      #!/bin/sh
      mv /var/log/nginx/access.log /var/log/nginx/api.newssalad.com.access_`date +%Y%m%d`.log
      killall -USR1 nginx

      # 권한 설정 (sudo 모드에서)
      chmod +x nginx_daillog.sh
      ```

   2. 크론탭 등록
      1. 개발계

         ```bash
         # 10분에 한번씩 실행
         vi /etc/crontab
         */10 * * * * root /home/centos/nginx_dailylog.sh
         */10 * * * * root /usr/local/awstats/tools/awstats_buildstaticpages.pl -update -config=dev-api.newssalad.com -lang=ko -dir=/usr/local/awstats/wwwroot/static -awstatsprog=/usr/local/awstats/wwwroot/cgi-bin/awstats.pl

         sudo systemctl status crond # 크론 상태 확인
         sudo systemctl restart crond # 크론 재실행, 위의 크론 등록후 재실행 필요
         sudo systemctl stop crond # 크론 중단
         ```

      2. 운영계

         ```bash
         # 10분에 한번씩 실행
         vi /etc/crontab
         */10 * * * * root /home/centos/nginx_daillog.sh
         */10 * * * * root /usr/local/awstats/tools/awstats_buildstaticpages.pl -update -config=[api.newssalad.com](http://dev-api.newssalad.com/) -lang=ko -dir=/usr/local/awstats/wwwroot/static -awstatsprog=/usr/local/awstats/wwwroot/cgi-bin/awstats.pl

         sudo systemctl status crond # 크론 상태 확인
         sudo systemctl restart crond # 크론 재실행, 위의 크론 등록후 재실행 필요
         sudo systemctl stop crond # 크론 중단

         #관리자 권한
         sudo su
         crontab -e # 크론 등록
         crontab -l # 크론 조회
         tail -f /var/log/cron #로그 조회
         ```

---

[~~http://dev-api.newssalad.com/awstats/awstats.pl?config=dev-api.newssalad.com~~](http://dev-api.newssalad.com/awstats/awstats.pl?config=dev-api.newssalad.com)

→ http://dev-api.newssalad.com/

→ https://api-awstats.newssalad.com/

- 참고자료

  - https://foxydog.tistory.com/36

- DirData 오류
  ```bash
  Error: AWStats database directory defined in config file by 'DirData' parameter (/var/lib/awstats) does not exist or isnot writable. Setup ('/etc/awstats/awstats.foxydog11.com.conf' file, web server or permissions) may be wrong.

  Check config file, permissions and AWStats documentation (in 'docs' directory).

  실행했더니 에러 발생하여 내용을 확인해보니 결과 값 생성을 위해 디폴트 경로[/var/lib/awstats] 폴더가 있어야 하나 자동으로 생성되는 게 아니다 보니 수동으로 생성을 해야 합니다.


  [root@localhost ~]# mkdir /var/lib/awstats (경로에 폴더 생성)
  ```
- 기존 nginx.conf
  ```bash
  # For more information on configuration, see:
  #   * Official English Documentation: http://nginx.org/en/docs/
  #   * Official Russian Documentation: http://nginx.org/ru/docs/

  user nginx;
  worker_processes auto;
  error_log /var/log/nginx/error.log;
  pid /run/nginx.pid;

  # Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
  include /usr/share/nginx/modules/*.conf;

  events {
      worker_connections 1024;
  }

  http {
      log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';

      access_log  /var/log/nginx/access.log  main;

      sendfile            on;
      tcp_nopush          on;
      tcp_nodelay         on;
      keepalive_timeout   65;
      types_hash_max_size 2048;

      include             /etc/nginx/mime.types;
      default_type        application/octet-stream;

      # Load modular configuration files from the /etc/nginx/conf.d directory.
      # See http://nginx.org/en/docs/ngx_core_module.html#include
      # for more information.
      include /etc/nginx/conf.d/*.conf;

      server {
          listen       80 default_server;
          listen       [::]:80 default_server;
          server_name  _;
          root         /usr/share/nginx/html;

          # Load configuration files for the default server block.
          include /etc/nginx/default.d/*.conf;

          location / {
              include uwsgi_params;
              uwsgi_pass unix:/run/ns_api.sock;
          }

          error_page 404 /404.html;
              location = /40x.html {
          }

          error_page 500 502 503 504 /50x.html;
              location = /50x.html {
          }
      }

      ##################
      # AWSTATS        #
      ##################
      server {
          listen 80;
          server_name dev-api-awstats.newssalad.com;
          root /usr/local/awstats/wwwroot/static;
          index awstats.dev-api.newssalad.com.html;

          access_log off;
          error_log off;
          charset utf-8;

          # Static awstats files: HTML files stored in DOCUMENT_ROOT/awstats/
          location /classes/ {
                  alias /usr/local/awstats/wwwroot/classes/;
          }

          location /css/ {
                  alias /usr/local/awstats/wwwroot/css/;
          }

          location /icon/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /awstats-icon/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /awstatsicons/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /js/ {
                  alias /usr/local/awstats/wwwroot/js/;
          }

      }

  # Settings for a TLS enabled server.

      server {
          server_name  dev-api.newssalad.com;
          listen       443 ssl;
          listen       [::]:443 ssl;

          #listen       443 ssl http2 default_server;
          #listen       [::]:443 ssl http2 default_server;
          #root         /usr/share/nginx/html;

          ssl_certificate "/etc/pki/nginx/star_newssalad_com_NginX_cert.pem";
          ssl_certificate_key "/etc/pki/nginx/star_newssalad_com_NginX_nopass_key.pem";

          ssl_session_cache shared:SSL:1m;
          ssl_session_timeout  10m;
          ssl_ciphers HIGH:!aNULL:!MD5;
          ssl_prefer_server_ciphers on;

          # Load configuration files for the default server block.
          include /etc/nginx/default.d/*.conf;

          location / {
              include uwsgi_params;
              uwsgi_pass unix:/run/ns_api.sock;
          }
          #location / {
          #    proxy_pass http://127.0.0.1:80;
          #}

          error_page 404 /404.html;
              location = /40x.html {
          }

          error_page 500 502 503 504 /50x.html;
              location = /50x.html {
          }
      }

      server{
          listen       443 ssl;
          listen       [::]:443 ssl;
          server_name  dev-api-awstats.newssalad.com;
          root /usr/local/awstats/wwwroot/static;
          index awstats.dev-api.newssalad.com.html;

          access_log  /var/log/nginx/awstats.access.log  main;

          ssl_certificate "/etc/pki/nginx/star_newssalad_com_NginX_cert.pem";
          ssl_certificate_key "/etc/pki/nginx/star_newssalad_com_NginX_nopass_key.pem";

          #location / {
          #    proxy_pass http//127.0.0.1:80;
          #}
          location /classes/ {
                  alias /usr/local/awstats/wwwroot/classes/;
          }

          location /css/ {
                  alias /usr/local/awstats/wwwroot/css/;
          }

          location /icon/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /awstats-icon/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /awstatsicons/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /js/ {
                  alias /usr/local/awstats/wwwroot/js/;
          }

      }
  }
  ```
- 추가 awstats.conf
  ```bash
  server{
          listen       443 ssl;
          listen       [::]:443 ssl;
          server_name  api-awstats.newssalad.com;
          root /usr/local/awstats/wwwroot/static;
          index awstats.api.newssalad.com.html;

          access_log  /var/log/nginx/awstats.access.log  main;

          ssl_certificate     "/etc/pki/nginx/star_newssalad_com_NginX_cert.pem";
          ssl_certificate_key "/etc/pki/nginx/star_newssalad_com_NginX_nopass_key.pem";

          location /classes/ {
                  alias /usr/local/awstats/wwwroot/classes/;
          }

          location /css/ {
                  alias /usr/local/awstats/wwwroot/css/;
          }

          location /icon/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /awstats-icon/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /awstatsicons/ {
                  alias /usr/local/awstats/wwwroot/icon/;
          }

          location /js/ {
                  alias /usr/local/awstats/wwwroot/js/;
          }

  }
  ```
- php 설치
- https://larsee.com/blog/2020/06/awstats-on-ubuntu-20-04-with-nginx/
  - `sudo apt install php-fpm`
  ```bash
  #파일 생성
  sudo vi /etc/nginx/cgi-bin.php

  #/etc/nginx/cgi-bin.php
  <?php
  $descriptorspec = array(
             0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
             1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
             2 => array("pipe", "w")   // stderr is a file to write to
  );
  $newenv = $_SERVER;
  $newenv["SCRIPT_FILENAME"] = $_SERVER["X_SCRIPT_FILENAME"];
  $newenv["SCRIPT_NAME"] = $_SERVER["X_SCRIPT_NAME"];
  if (is_executable($_SERVER["X_SCRIPT_FILENAME"])) {
      $process = proc_open($_SERVER["X_SCRIPT_FILENAME"], $descriptorspec, $pipes, NULL, $newenv);
      if (is_resource($process)) {
          fclose($pipes[0]);
          $head = fgets($pipes[1]);
          while (strcmp($head, "\n")) {
              header($head);
              $head = fgets($pipes[1]);
          }
          fpassthru($pipes[1]);
          fclose($pipes[1]);
          fclose($pipes[2]);
          $return_value = proc_close($process);
      } else {
          header("Status: 500 Internal Server Error");
          echo("Internal Server Error");
      }
  } else {
      header("Status: 404 Page Not Found");
      echo("Page Not Found");
  }
  ?>
  ```

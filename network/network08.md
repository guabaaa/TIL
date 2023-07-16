# Network 08

## 🪄 NAT

- NAT는 IP 패킷의 TCP/UDP 포트 숫자와 IP 주소를 재기록하면서 라우터를 통해 네트워크 트래픽을 주고 받는 것으로
  NAT를 통해 변환하게 되면 NAT 테이블에 기록하고 해당 패킷이 돌아왔을 때 기록해둔 내용을 보고 원래의 경로로 패킷을 보내준다.

!https://velog.velcdn.com/images/lijahong/post/e8fb04f5-ed88-4e8f-8a13-903ec654531e/image.png

- 허나 외부에서는 사설 IP가 보이지 않는다. 따라서 포트포워딩이 필요하다.

!https://velog.velcdn.com/images/lijahong/post/c0b1a920-8bea-4a1b-903e-9f459f991c36/image.png

## 🪄 포트 포워딩 (매핑)

<aside>
💡 **패킷이 네트워크 장비를 통해 특정 IP주소와 포트 번호의 통신 요청을 다른 특정 포트 번호와 IP로 넘겨주는 것으로 NAT의 응용

사설 IP는 보이지 않기에 보이는 네트워크 장비까지 찾아간 다음, 그 다음 설정한 포트를 확인 후 사설 IP로 찾아감.

이 설정은 외부 포트에 들어오면 이걸 특정 내부 포트에 보내 특정 사설 IP에 보내주는 것.
즉 사설 IP의 포트와 연결**

</aside>

<aside>
💡 실습 해봐야 함!

</aside>

-참고 : [https://velog.io/@lijahong/0부터-시작하는-네트워크-공부-NAT-포트포워딩](https://velog.io/@lijahong/0%EB%B6%80%ED%84%B0-%EC%8B%9C%EC%9E%91%ED%95%98%EB%8A%94-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B3%B5%EB%B6%80-NAT-%ED%8F%AC%ED%8A%B8%ED%8F%AC%EC%9B%8C%EB%94%A9)
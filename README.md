# back-office
🛠 테크 블로그, 기술공유 및 회고 플랫폼 🛠

### 프로젝트 설명

'테크 블로그'는 주말의집을 만드는 팀 오도리의 성장 과정을 기록하는 저장소이자, 사용자에게 그 과정을 보여주기 위해 시작된 서비스입니다.

본 프로젝트를 통해 다음과 같은 경험과 지식을 쌓고 있습니다.

- Vue 프레임워크를 통한 CSR 개발
- 주말의집 본 서비스와의 API 혼합 사용
- Typescript 언어를 통한 컴파일 시점 안정성 획득
- 컴포넌트, 모듈화로 코드 품질 관리
- 부트스트랩을 통한 반응형 CSS 적용
- 서비스 기능 및 프로세스 정의
- Github Actions, AWS S3, CodeDeploy를 통한 자동화 배포 파이프라인 구축

### 기술 스택

**어플리케이션**
- Typescript
- Vue3
- Vuex
- Vue-Router
- Bootstrap
- Axios

**Build**

- npm

### 핵심 기능

**로그인/로그아웃**

- 주말의집 관리자 계정으로 로그인/로그아웃

> 주말의집 서비스와 동일하게 RefreshToken을 Cookie에서 관리하는 방식으로 reissue 처리를 진행합니다.
> 주말의집 서비스를 통해 로그인 후, 테크 블로그 접속 시 로그인 상태가 유지됩니다.

**리뷰 승인된 게시글 전체 조회**

- 테크 블로그에 노출되는 게시글은 모두 내부 관리자들에 의해 리뷰가 거쳐진 게시글입니다. 해당 게시글은 로그인 하지 않은 상태에서도 조회가 가능합니다.

> 단, 게시글에 대한 관리자의 리뷰는 관리자만 열람할 수 있습니다.

**파트별 게시글 필터링**

- 메인페이지 사이드바를 통해 필터링

메인페이지 사이드바에는 WEB/SERVER/INFRA 3가지 필터를 제공합니다. 필터링이 적용되면, 좌측 게시글 리스트 화면이 동적으로 변경됩니다.

**금주의 핫 게시글 TOP3 조회**

- 메인페이지 사이드바 하단에 금주의 핫 게시글 TOP3 제목 노출

테크 블로그에서 가장 조회가 많이 된 게시글 상위 3개의 제목을 노출합니다. 해당 게시글 제목을 클릭하면, 상세 페이지로 이동합니다.

**로그인 시, 글쓰기 버튼 노출 및 게시글 작성**

- 로그인된 유저에 한해, 글쓰기 버튼을 노출
- 게시글 작성 시, Toast-ui 라이브러리를 이용해 마크다운 형식으로 게시글 작성

깃허브 위키 페이지에서 마크다운 형식으로 게시글을 작성한 상태이므로 마이그레이션에 용이하게 하기 위해 본 서비스에서도 마크다운 형식만을 지원합니다.

**본인이 작성한 게시글에 대해서만 수정/삭제 버튼 노출**

- 로그인된 유저이면서 본인인 경우, 게시글 수정/삭제 버튼 노출

관리자 모두 동등한 권한을 갖고 있기 때문에, 자신의 게시글은 자신만이 수정/삭제할 수 있습니다.

**마이페이지에서 4가지 필터링 제공**

- 내가 작성한 게시글 전체 조회 ( 리뷰어로부터 승인/반려 처리된 게시글을 추가 필터링 합니다. )
- 내가 리뷰 신청한 게시글 전체 조회
- 내가 리뷰한 게시글 전체 조회 ( 내가 승인/반려한 게시글을 추가 필터링 합니다. )
- 내라 리뷰해야 하는 게시글 전체 조회

위의 4가지 필터링을 거친 게시글에 대해 리뷰 해야 하는 게시글 상세보기 클릭 시, 하단에 리뷰 입력 폼이 노출됩니다.

> 리뷰 확인하기 버튼을 통해 리뷰가 등록된 게시글의 상세 조회 페이지로 라우팅됩니다. 

**리뷰**

- 타인의 게시글 리뷰

리뷰 승인/반려에 대해 코멘트를 작성해야만 합니다.

**올바르지 않은 URL로 접근할 경우, 404 페이지 노출**

- 404 페이지 화면 구현 및 라우터 가드 적용

### 테크 블로그 프로세스 정의

<details>
<summary>로그인</summary>
<div markdown="1">
![image](https://github.com/ODOICHON/back-office/assets/61505572/d78202f1-8f6a-424d-b2a0-b420a234e2a6)
</div>
</details>

<details>
<summary>게시글 작성</summary>
<div markdown="1">
  ![image](https://github.com/ODOICHON/back-office/assets/61505572/ff0d33be-2a57-4eca-ae8f-1743fc5bc40e)
</div>
</details>

<details>
<summary>게시글 수정</summary>
<div markdown="1">
  ![image](https://github.com/ODOICHON/back-office/assets/61505572/a6766194-4ca2-47df-b752-a7d7ceb9cbd2)
</div>
</details>

<details>
<summary>게시글 삭제</summary>
<div markdown="1">
  ![image](https://github.com/ODOICHON/back-office/assets/61505572/9eba77c1-4341-46e6-9694-082991d17ade)
</div>
</details>

<details>
<summary>게시글 댓글 작성</summary>
<div markdown="1">
  ![image](https://github.com/ODOICHON/back-office/assets/61505572/7afc1b82-bff8-4443-821c-287fe29c4c82)
</div>
</details>

<details>
<summary>마이페이지 리뷰 조회</summary>
<div markdown="1">
  ![image](https://github.com/ODOICHON/back-office/assets/61505572/5296a1c1-37ca-4aa1-b8d3-94488056a653)
</div>
</details>

<details>
<summary>마이페이지 리뷰 등록</summary>
<div markdown="1">
 ![image](https://github.com/ODOICHON/back-office/assets/61505572/285334fd-480a-4e69-a840-4485bf9bec01)
</div>
</details>

### 회고

은비 - [테크블로그 기획](https://github.com/ODOICHON/back-office/wiki/%5B%EA%B8%B0%ED%9A%8D%5D-%ED%85%8C%ED%81%AC-%EB%B8%94%EB%A1%9C%EA%B7%B8%EC%9D%98-%EC%8B%9C%EC%9E%91)

은비 - [프로젝트 초기 세팅](https://github.com/ODOICHON/back-office/wiki/%5B%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%5D-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85)

은비 - [CD 파이프라인 구축](https://github.com/ODOICHON/back-office/wiki/%5B%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%5D-CD-%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8-%EA%B5%AC%EC%B6%95)

은비 - [이슈(Reissue)](https://github.com/ODOICHON/back-office/wiki/%5B%EC%9D%B4%EC%8A%88%5D-Reissue-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)

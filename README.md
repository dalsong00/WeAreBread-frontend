안녕하세요! 'We are Bread 🥨' 팀입니다.

# 📌 프로젝트 및 팀 소개

## 프로젝트 소개

유명한 제과영업점의 경우 업체 정보를 업체 SNS에 방문하거나 직접 문의해야 얻을 수 있습니다.
그래서 모두가 쉽게 정보를 얻을 수 있는 제과영업 맛집 공유 사이트 'We are Bread'를 제작했습니다.

## 프로젝트 기간

2023.01.30~2023.02.10 (약 2주)

## 팀 소개

- 개발인원 : 프론트엔드 4명, 백엔드 2명

- Product Manager : 황선용 | Project Manager : 윤지수

  - 프론트엔드 : 윤지수, 이세윤, 임가림, 황선용

  - 백엔드 : 김광휘

# 📌 구현 기능

## 기술 스택

- `FE` : html.javascript, react, redux, styled-components
- `BE` : node.js, express, mysql, aws, oracle
- `공통` : git, trello, figma, notion, slack

## 담당한 부분

### 메인
https://user-images.githubusercontent.com/114578990/218025322-14cfc9e9-a80c-4af2-b683-ecb0641583ae.mov
+ react-slick 라이브러리를 활용하여 캐러셀 만들기
+ map() 함수로 반복되는 카드 레이아웃 구성하기
+ forEach 고차함수로 setData(prev => [...prev, { ...el, content: res.shopDataByBread }]) 작성하여 원하는 형태의 데이터로 가공하기
+ visibility: visible;, visibility: hidden; CSS 속성을 이용해 hover 시 화면을 나타내거나 사라지게 만들기

### 랜덤게임

https://user-images.githubusercontent.com/114578990/218028932-d7bff681-ce3a-4bde-99e1-e205c0ed2276.mov
+ setTimeout, clearTimeout 함수, Math.Random 매서드를 이용해서 랜덤으로 이미지 띄워주다가 클릭하면 정지하게 만들기

### 좋아요 버튼

https://user-images.githubusercontent.com/114578990/218029854-68f31db2-80de-4065-b959-75338503ee25.mov
+ 좋아요 클릭 시 +1, 좋아요 해제 시 -1 되게 만들기

### 필수 구현 사항

1. 로그인 : 카카오 로그인/회원가입 API(OAuth 2.0)
2. 검색바 : 검색 제시어(Ajax)
3. 메인 : 캐러셀 기능, 버튼(↑) 클릭 시 화면 맨 위로 이동
4. 랜덤 이미지 게임 : 빵과 쿠키 사진 랜덤으로 띄우다 클릭 시 정지
5. 검색 결과 페이지 : 필터 기능, 지도 API
6. 상세 페이지 : 가게 정보 제공, 후기 조회, 등록, 수정, 삭제, 지도 API 
7. Nav : 검색 기능, 로그인 시 메뉴 항목 (로그인 -> 로그아웃으로 변경)
8. Footer

### 회고록
[회고록 링크](https://dalsong-00.tistory.com/37?category=1343302)
## Reference

이 프로젝트는 다이닝코드 사이트를 참조하여 학습목적으로 만들었습니다.
실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.

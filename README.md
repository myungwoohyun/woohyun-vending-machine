# 📌 스튜디오 씨드 과제 프로젝트(자판기)

## ✅ 프로젝트 개요
이 프로젝트는 Vanilla JavaScript를 사용하여 구현한 자판기 시뮬레이션입니다.  
상품 재고를 설정한 후 자판기를 이용하여 음료를 구매할 수 있습니다.  

## ✅ 주요 기능
- 상품 재고 설정
- 돈 투입 및 카드 결제 지원
- 잔액 부족 시 구매 불가
- 품절된 상품 구매 불가
- 로컬스토리지(localStorage)를 사용하여 재고 유지

## 📂 프로젝트 구조
````
📂 vending-machine
 📂 images // 이미지 폴더
 │    ├── protopie-logo.svg // 로고 이미지 파일
 📂 css // css 폴더
 │    ├── common.css // 크로스브라우징 공통 css 파일
 │    ├── common.scss // 크로스브라우징 공통 scss 파일
 │    ├── style.css // 프로젝트 css 파일
 │    ├── style.scss // 프로젝트 scss 파일
 📂 js // js 폴더
 │    ├── index.js // 상품 수량 설정 스크립트 파일
 │    ├── vendingMachine.js // 자판기 스크립트 파일
 ├── package.json  // 프로젝트 설정 파일
 ├── jest.config.js  // Jest 환경 설정 파일
 ├── index.html  // 상품 수량 설정 및 자판기 페이지
````

## ⚙️ 실행 방법
### 1️⃣ 프로젝트 설치
```
npm install
```

### 2️⃣ 테스트 실행
```
npm test
```

### 3️⃣ 로컬 환경에서 실행
index.html을 열어 상품 재고를 설정합니다.  
설정 완료 후, vendingMachine.html로 이동하여 자판기를 사용할 수 있습니다.

## 🛠 기능 설명
### 1️⃣ 상품 재고 설정
index.html에서 음료의 초기 재고를 설정할 수 있습니다.  
설정한 값은 localStorage에 저장됩니다.

### 2️⃣ 자판기 기능
현금(100원, 500원, 1000원, 5000원, 10000원) 또는 카드 결제를 선택할 수 있습니다.  
카드 결제 시, 한 번만 구매 가능하고 결제 후 자동 해제됩니다.  
잔액이 부족하면 구매 불가하며 경고 메시지가 출력됩니다.  
상품이 품절되면 구매 불가하며 경고 메시지가 출력됩니다.

## ✅ 다이어그램(자판기 동작 흐름)

````
  A[상품 재고 입력 모달] --> |상품 설정| B[자판기 페이지]
  B --> C[사용자가 돈을 투입]
  C --> |잔액 충분| D[상품 선택]
  C --> |잔액 부족| E[경고 메시지 출력]
  D --> |상품 재고 있음| F[구매 완료, 잔액 차감]
  D --> |상품 품절| G[경고 메시지 출력]
  F --> |재고 업데이트| H[구매 가능 상태 유지]
  F --> |재고 소진| G[경고 메시지 출력]
  ````
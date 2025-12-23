# Work Calendar

선택적 근로제를 위한 웹 기반 근무 시간 관리 달력 애플리케이션

A web-based calendar application for managing flexible work hours with intelligent auto-adjustment and comprehensive time tracking features.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hogenius/work_calendar/blob/main/LICENSE)
[![JavaScript](https://img.shields.io/badge/javascript-vanilla-yellow.svg)](https://github.com/hogenius/work_calendar)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-green.svg)](https://github.com/hogenius/work_calendar)

## ✨ 주요 기능 (Key Features)

### 🎯 핵심 기능
- **1분 단위 정밀 조정** - 클릭/드래그로 직관적인 시간 입력
- **자동 시간 분배** - 현재 근무 시간에 따라 미래 날짜 자동 조정
- **수동 잠금/해제** - 특정 날짜를 고정하여 자동 조정에서 제외
- **휴가 관리** - 체크박스로 간편한 휴가일 설정
- **공휴일 관리** - 웹에서 공휴일 추가/수정/삭제 및 백업/복원

### 📊 데이터 관리
- **인트라넷 연동** - 복사/붙여넣기로 근무 시간 자동 가져오기
- **휴게 시간 자동 차감** - 실제 근무 시간 정확히 계산
- **로컬 저장** - localStorage 기반 오프라인 데이터 보관
- **자동 휴가 설정** - 빠진 날짜 자동으로 휴가 처리

### 📈 실시간 통계
- 이번 달 필요 근무시간
- 실제 근무시간
- 현재까지 근무 시간 (어제까지)
- 부족/초과 시간
- 남은 평일 평균 필요 시간

## 🚀 시작하기 (Getting Started)

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/hogenius/work_calendar.git
cd work_calendar
```

2. **브라우저에서 실행**
```bash
# 간단히 index.html 파일을 브라우저에서 열기
open index.html

# 또는 로컬 서버 실행 (선택사항)
python -m http.server 8000
# http://localhost:8000 접속
```

### 요구사항
- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- JavaScript 활성화
- localStorage 지원

**의존성 없음!** - Vanilla JavaScript로 작성되어 별도 라이브러리 불필요

## 📖 사용 방법 (Usage)

### 기본 사용

1. **시간 입력**
   - 날짜 셀의 수직 바를 클릭하거나 드래그
   - 1분 단위로 정밀 조정 가능 (4h ~ 13h)

2. **자동 조정**
   - 과거/현재 날짜 수정 시 미래 평일에 자동 분배
   - 🔒 아이콘으로 특정 날짜 고정 가능

3. **휴가 설정**
   - 평일 셀의 체크박스 클릭
   - 계산에서 자동 제외

4. **공휴일 관리**
   - "공휴일 관리" 버튼 클릭
   - CSV 형식으로 편집 (YYYY-MM-DD,이름)
   - txt 파일로 백업/복원 가능

### 인트라넷 데이터 가져오기

1. 회사 인트라넷에서 근무시간 표 복사
2. "데이터 넣기" 버튼 클릭
3. 복사한 데이터 붙여넣기
4. "적용하기" 클릭
5. 자동으로 업무시간 - 휴게시간 계산 및 적용

## 🎨 특징 (Highlights)

### 직관적인 UI
- **4단계 색상 시스템**
  - 🔵 파란색: ≤ 4시간
  - 🟢 초록색: 4-8시간
  - 🟠 주황색: 8-10시간
  - 🔴 빨간색: > 10시간

### 스마트 기능
- 이전/다음 달 날짜 미리보기
- 오늘 날짜 하이라이트
- 반응형 디자인 (모바일/태블릿 지원)

### 데이터 안전성
- 로컬 저장으로 개인정보 보호
- 자동 저장 (입력 즉시)
- 데이터 내보내기/가져오기

## 🛠️ 기술 스택 (Tech Stack)

- **HTML5** - 시맨틱 마크업
- **CSS3** - Grid, Flexbox, Gradient
- **JavaScript (ES6+)** - Vanilla JS
  - localStorage API
  - Date API
  - FileReader API
  - Blob API

**No frameworks, no libraries!** 순수 JavaScript로 작성

## 📁 프로젝트 구조

```
work_calendar/
├── index.html          # 메인 HTML
├── style.css           # 스타일시트
├── script.js           # 핵심 로직
├── holidays.txt        # 공휴일 데이터 (CSV)
├── README.md           # 본 문서
├── 구조분석.md         # 상세 구조 분석
└── 작업히스토리.md     # 개발 히스토리
```

## 📊 데이터 구조

### 근무시간 데이터 (localStorage)
```javascript
{
  "2025-12": {
    "2025-12-23": {
      hours: 8.5,        // 근무시간 (1분 단위)
      manual: true,      // 수동 조정 여부
      vacation: false    // 휴가 여부
    }
  }
}
```

### 공휴일 데이터 (localStorage + holidays.txt)
```javascript
[
  { date: "2025-01-01", name: "신정" },
  { date: "2025-01-29", name: "설날" },
  // ...
]
```

## 🎯 알고리즘

### 자동 조정 알고리즘
```
1. 오늘까지 실제 근무시간 계산
2. 이번 달 필요 총 시간 계산 (평일 × 8h)
3. 부족/초과 시간 산출
4. 미래 평일 중 수동 조정되지 않은 날짜 찾기
5. 부족/초과 시간을 균등 분배
```

## 🌏 브라우저 지원

- ✅ Chrome (권장)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ❌ Internet Explorer

## 🤝 기여하기 (Contributing)

프로젝트 개선에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스 (License)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 개발자

개발 기간: 2025년 12월 23일 (약 8시간)

## 🙏 감사의 말

이 프로젝트는 선택적 근로제를 사용하는 개발자들의 시간 관리를 돕기 위해 만들어졌습니다.

---

**⭐ 유용하셨다면 Star를 눌러주세요!**

## 📸 스크린샷

*추후 추가 예정*

## 🔮 향후 계획

- [ ] 월별 통계 차트
- [ ] 다크 모드
- [ ] PWA 지원 (오프라인 앱)
- [ ] 다국어 지원
- [ ] CSV 내보내기

## ❓ FAQ

### Q: 서버가 필요한가요?
A: 아니요! 완전히 클라이언트 사이드에서 작동합니다. HTML 파일만 브라우저에서 열면 됩니다.

### Q: 데이터는 어디에 저장되나요?
A: 브라우저의 localStorage에 저장됩니다. 서버로 전송되지 않아 개인정보가 안전합니다.

### Q: 모바일에서도 사용 가능한가요?
A: 네! 반응형 디자인으로 모바일/태블릿에서도 사용 가능합니다.

### Q: 공휴일 데이터는 어떻게 업데이트하나요?
A: "공휴일 관리" 버튼을 통해 웹에서 직접 추가/수정/삭제할 수 있습니다.

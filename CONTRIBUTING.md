# 기여 가이드 (Contributing Guide)

Work Calendar 프로젝트에 기여해주셔서 감사합니다!

## 기여 방법

### 1. 이슈 제기
- 버그 리포트
- 기능 제안
- 문서 개선 제안

### 2. Pull Request

1. **Fork & Clone**
```bash
git clone https://github.com/hogenius/work_calendar.git
cd work_calendar
```

2. **브랜치 생성**
```bash
git checkout -b feature/your-feature-name
# 또는
git checkout -b fix/bug-description
```

3. **코드 작성**
- 기존 코드 스타일 유지
- 주석은 한글 또는 영어로 작성
- 변경사항은 최소화

4. **테스트**
- 브라우저에서 직접 테스트
- 여러 시나리오 확인
- 모바일 반응형 확인

5. **커밋**
```bash
git add .
git commit -m "Add: 새로운 기능 설명"
# 또는
git commit -m "Fix: 버그 수정 설명"
```

6. **푸시 & PR**
```bash
git push origin feature/your-feature-name
```
- GitHub에서 Pull Request 생성
- 변경사항 설명 작성

## 코드 스타일

### JavaScript
```javascript
// 함수명: camelCase
function calculateTotalHours() { }

// 변수명: camelCase
const currentMonth = 12;

// 상수: camelCase
const defaultHours = 8;

// 주석: 한글 또는 영어
// 이 함수는 총 근무시간을 계산합니다
// This function calculates total work hours
```

### CSS
```css
/* 클래스명: kebab-case */
.day-cell { }
.manage-holidays-button { }

/* ID: camelCase */
#currentMonth { }
#holidayTextarea { }
```

### HTML
```html
<!-- 들여쓰기: 4 spaces -->
<div class="container">
    <button id="saveButton">저장</button>
</div>
```

## 커밋 메시지 규칙

```
Add: 새로운 기능 추가
Fix: 버그 수정
Update: 기존 기능 수정
Remove: 코드/파일 삭제
Refactor: 코드 리팩토링
Docs: 문서 수정
Style: 코드 포맷팅 (기능 변경 없음)
```

예시:
```
Add: 주간 통계 기능 추가
Fix: 휴가일 계산 오류 수정
Update: 공휴일 데이터 2026년 추가
Docs: README 설치 방법 개선
```

## 이슈 작성 가이드

### 버그 리포트
```markdown
**버그 설명**
무엇이 잘못되었나요?

**재현 방법**
1. ...
2. ...
3. ...

**예상 동작**
어떻게 작동해야 하나요?

**실제 동작**
실제로 어떻게 작동하나요?

**환경**
- 브라우저: Chrome 120
- OS: Windows 11
- 버전: v1.0.0

**스크린샷**
(선택사항)
```

### 기능 제안
```markdown
**제안 배경**
왜 이 기능이 필요한가요?

**제안 내용**
어떤 기능을 추가하면 좋을까요?

**대안**
다른 방법은 없을까요?

**추가 정보**
(선택사항)
```

## 코드 리뷰

모든 PR은 다음을 확인합니다:
- [ ] 기존 기능이 정상 작동하는가?
- [ ] 새 기능이 의도대로 작동하는가?
- [ ] 코드 스타일이 일관적인가?
- [ ] 주석이 적절한가?
- [ ] 모바일에서도 작동하는가?

## 라이선스

기여하신 코드는 MIT 라이선스 하에 배포됩니다.

## 질문?

궁금한 점이 있으면 Issue를 통해 질문해주세요!

---

다시 한번 감사드립니다! 🙏

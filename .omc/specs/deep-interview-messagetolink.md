# Deep Interview Spec: messagetolink

## Metadata
- Interview ID: di-messagetolink-001
- Rounds: 7
- Final Ambiguity Score: 19%
- Type: greenfield
- Generated: 2026-03-22T15:30:00+09:00
- Threshold: 20%
- Status: PASSED

## Clarity Breakdown
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Goal Clarity | 0.92 | 40% | 0.368 |
| Constraint Clarity | 0.82 | 30% | 0.246 |
| Success Criteria | 0.65 | 30% | 0.195 |
| **Total Clarity** | | | **0.809** |
| **Ambiguity** | | | **19%** |

## Goal

마크다운 형태의 메시지를 URL fragment(`#`)에 압축+암호화하여 담아, DB 없이 순수 클라이언트 사이드로 메시지를 공유하는 웹 서비스. 도메인은 `messageto.link`.

**작성자 흐름:** 단일 페이지에서 마크다운을 작성하면 실시간으로 URL이 갱신됨. 비밀번호 옵션 설정 가능. URL을 복사해서 상대에게 전달.

**수신자 흐름:** URL을 열면 (비밀번호 설정 시) 비밀번호 입력 화면 → 정확하면 렌더링된 마크다운 메시지를 볼 수 있음. 원문 보기, 복사, 다운로드, 다크모드 지원.

## Constraints

- **No Database**: 모든 데이터는 URL fragment(`#`)에 저장. 서버에 데이터가 전송되지 않음.
- **No Time Limit**: DB 없이는 진정한 시간제한 불가능하므로 기능 제거.
- **Compression**: lz-string 등으로 마크다운을 압축 → Base64 인코딩 → URL fragment에 저장.
- **Encryption**: 비밀번호 설정 시 AES 암호화. 비밀번호가 복호화 키. 틀리면 복호화 자체 불가능.
- **URL Fragment**: query string(`?`) 대신 fragment(`#`) 사용. 서버로 전송되지 않아 프라이버시 보장. 길이 제한 완화.
- **Tech Stack**: Next.js 15 (App Router), React 19, Tailwind CSS 4, TypeScript 5.x

## Non-Goals

- 서버 사이드 데이터 저장 (DB, KV store 등)
- 시간제한/만료 기능
- 사용자 계정/인증
- 메시지 수정/삭제 (URL 자체가 메시지이므로 의미 없음)
- 서버 사이드 렌더링 of message content (보안상 클라이언트에서만 처리)

## Acceptance Criteria

- [ ] 작성 페이지에서 마크다운을 입력하면 실시간으로 URL fragment가 갱신된다
- [ ] 생성된 URL을 다른 브라우저/기기에서 열면 동일한 마크다운 메시지가 렌더링된다
- [ ] 비밀번호 설정 시 AES로 암호화되어 URL에 저장된다
- [ ] 비밀번호가 틀리면 메시지 복호화가 실패하고, 올바른 비밀번호 입력 시 메시지가 표시된다
- [ ] 비밀번호 없이 생성된 URL은 비밀번호 입력 없이 바로 메시지가 표시된다
- [ ] 읽기 화면에서 렌더링된 마크다운, 원문(raw markdown), 복사 버튼, 다운로드 기능이 동작한다
- [ ] 다크모드가 지원된다
- [ ] 작성 페이지는 좌우 분할 레이아웃 (왼쪽: 에디터+옵션, 오른쪽: 미리보기, 하단: URL)
- [ ] 모바일(375px), 태블릿(768px), 데스크톱(1280px) 반응형 지원
- [ ] WCAG AA 색상 대비 준수

## Assumptions Exposed & Resolved

| Assumption | Challenge | Resolution |
|------------|-----------|------------|
| 시간제한이 DB 없이 가능 | 클라이언트 시계 조작으로 우회 가능 | 시간제한 기능 제거 |
| URL query string 사용 | 서버에 데이터 전송됨, 길이 제한 심함 | URL fragment(`#`) 사용으로 변경 |
| 비밀번호는 해시 비교로 충분 | 데이터 자체가 URL에 노출됨 | AES 암호화로 비밀번호를 복호화 키로 사용 |
| 실시간 URL 갱신 필요 없음 | 사용자가 별도 "생성" 버튼 없이 원함 | 입력 시 실시간 URL 갱신 확정 |

## Technical Context

### Architecture
- **Single Page Application**: Next.js 15 App Router, 클라이언트 컴포넌트 중심
- **Two Routes**: `/` (작성 페이지), `/view` 또는 `/#data` (읽기 페이지)
- **Data Flow**: Markdown → JSON(content + options) → Compress(lz-string) → Encrypt(AES, optional) → Base64 → URL fragment
- **Reverse Flow**: URL fragment → Base64 decode → Decrypt(AES, if encrypted) → Decompress → JSON → Render markdown

### Key Libraries (예상)
- `lz-string`: 클라이언트 사이드 압축
- `crypto-js` 또는 Web Crypto API: AES 암호화/복호화
- `react-markdown` 또는 유사: 마크다운 렌더링
- Tailwind CSS 4: 스타일링

### Page Structure
**작성 페이지 (`/`)**
```
┌─────────────────────────────────────────────┐
│  Options (비밀번호 설정)                       │
├──────────────────────┬──────────────────────┤
│  Markdown Editor     │  Preview (rendered)   │
│                      │                       │
│                      │                       │
├──────────────────────┴──────────────────────┤
│  Generated URL [Copy Button]                 │
└─────────────────────────────────────────────┘
```

**읽기 페이지 (URL with fragment)**
```
┌─────────────────────────────────────────────┐
│  [비밀번호 입력 화면 — 설정된 경우만]            │
├─────────────────────────────────────────────┤
│  Rendered Markdown Message                   │
│                                             │
│  [원문 보기] [복사] [다운로드] [다크모드 토글]    │
└─────────────────────────────────────────────┘
```

## Ontology (Key Entities)

| Entity | Type | Fields | Relationships |
|--------|------|--------|---------------|
| Message | core domain | markdown content | Writer creates Message |
| URL | core domain | fragment, compressed+encrypted data | URL encodes Message + Options |
| Writer | core domain | - | Creates Message, sets Options, shares URL |
| Reader | core domain | - | Opens URL, enters password, views Message |
| Options | supporting | password (AES key) | Encrypts Message data |
| ReaderView | supporting | rendered MD, raw MD, copy, download, dark mode | Displays decoded Message |

## Ontology Convergence

| Round | Entity Count | New | Changed | Stable | Stability Ratio |
|-------|-------------|-----|---------|--------|----------------|
| 1 | 5 | 5 | - | - | N/A |
| 2 | 5 | 0 | 0 | 5 | 100% |
| 3 | 5 | 0 | 0 | 5 | 100% |
| 4 | 5 | 0 | 1 | 4 | 100% |
| 5 | 6 | 1 | 0 | 5 | 83% |
| 6 | 6 | 0 | 0 | 6 | 100% |
| 7 | 6 | 0 | 0 | 6 | 100% |

## Interview Transcript
<details>
<summary>Full Q&A (7 rounds)</summary>

### Round 1
**Q:** 사용자가 이 서비스를 사용하는 전체 흐름을 구체적으로 설명해주세요.
**A:** 작성 (작성하는 동시에 url에 반영), 옵션 설정도 위에서 진행 (동시에 url에 반영) 실시간으로 생성되는 url을 복사해서 상대에게 보내는 흐름
**Ambiguity:** 61% (Goal: 0.60, Constraints: 0.30, Criteria: 0.20)

### Round 2
**Q:** URL에 모든 데이터를 담는다면 URL 길이 제한이 핵심 제약입니다. 이 제한에 대해 어떻게 대응할 계획인가요?
**A:** URL fragment는 어떻기에 서버로 전송되지 않고 데이터 저장이 가능한거야? 최대한 길면 좋긴 한데 어떤 방식인지 몰라서 확정이 안되네 → fragment 방식 설명 후 이해함
**Ambiguity:** 53% (Goal: 0.65, Constraints: 0.50, Criteria: 0.20)

### Round 3
**Q:** 이 서비스가 완성되었을 때 판단할 기준이 뭐예요?
**A:** 모두 다 중요 (URL 왕복 정합성 + 제한사항 동작 + UX 모두)
**Ambiguity:** 46% (Goal: 0.65, Constraints: 0.50, Criteria: 0.45)

### Round 4 (Contrarian Mode)
**Q:** DB 없이 시간제한이라는 제약을 다시 생각해보겠습니다. 클라이언트 시계 조작 우회 가능한데 충분한가요?
**A:** DB 없으니 시간제한 제거
**Ambiguity:** 39% (Goal: 0.70, Constraints: 0.65, Criteria: 0.45)

### Round 5
**Q:** 수신자가 URL을 열었을 때 보는 화면에서 추가 기능이 필요한가요?
**A:** 풀 기능 (렌더링 + 원문 + 복사 + 다운로드 + 다크모드)
**Ambiguity:** 34% (Goal: 0.80, Constraints: 0.65, Criteria: 0.55)

### Round 6 (Simplifier Mode)
**Q:** 비밀번호 보호 방식: AES 암호화 vs 해시 비교?
**A:** AES 암호화 (강력)
**Ambiguity:** 26% (Goal: 0.85, Constraints: 0.80, Criteria: 0.55)

### Round 7
**Q:** 작성 페이지 레이아웃: 좌우 분할, 상하 배치, 탭 전환?
**A:** 좌우 분할 (Split)
**Ambiguity:** 19% (Goal: 0.92, Constraints: 0.82, Criteria: 0.65)

</details>

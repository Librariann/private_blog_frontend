const blogStack = [
  [
    "프론트엔드",
    "Next.js, Apollo Client, Radix UI, TypeScript, Tailwind CSS, Zustand, GraphQL",
  ],
  ["백엔드", "NestJS, GraphQL, TypeORM, PostgreSQL"],
  ["인프라", "Railway, Vercel"],
] as const;

const gitLawnStack = [
  ["앱", "React Native, TypeScript, AsyncStorage"],
  ["홈 화면 위젯", "Swift, SwiftUI, WidgetKit, App Intents"],
  ["백엔드", "Node.js 24, GitHub GraphQL API"],
] as const;

export function PersonalProjects() {
  return (
    <section
      id="projects"
      className="editorial-profile-section"
      aria-labelledby="personal-projects-title"
    >
      <header>
        <span aria-hidden="true">03</span>
        <div>
          <h2 id="personal-projects-title">개인 프로젝트</h2>
        </div>
      </header>
      <div className="min-w-0 space-y-10">
        <article className="border-t border-[var(--editorial-ink)] pt-6">
          <h3 className="font-[family-name:var(--font-editorial)] text-2xl">
            개인 블로그 구축
          </h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--editorial-muted)]">
            지금 보고 계신 블로그입니다. 개발하면서 겪은 문제와 해결 방법을
            정리하려고 만들었고, 지금도 직접 운영하고 있습니다.
          </p>
          <dl className="mt-6 border-y border-[var(--editorial-rule)] text-sm">
            {blogStack.map(([label, stack]) => (
              <div
                key={label}
                className="grid gap-1 py-3 not-first:border-t not-first:border-[var(--editorial-rule)] sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="font-semibold">{label}</dt>
                <dd className="leading-relaxed text-[var(--editorial-muted)]">
                  {stack}
                </dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="border-t border-[var(--editorial-ink)] pt-6">
          <h3 className="font-[family-name:var(--font-editorial)] text-2xl">
            pay-rehearsal
          </h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--editorial-muted)]">
            PG 연동을 기다리는 동안에도 결제 화면과 주문 처리를 개발할 수 있도록
            React용 모의 결제 라이브러리를 만들었습니다.
          </p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--editorial-muted)]">
            함수 호출 한번으로 결제창을 열어 성공·실패·취소부터 가상계좌 입금
            대기와 PayPal 승인·캡처 흐름까지 검증할 수 있습니다. npm에 공개
            배포했습니다.
          </p>
          <dl className="mt-6 border-y border-[var(--editorial-rule)] text-sm">
            <div className="grid gap-1 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
              <dt className="font-semibold">기술 스택</dt>
              <dd className="leading-relaxed text-[var(--editorial-muted)]">
                React 18/19, TypeScript, React DOM, tsup, Vitest, React Testing
                Library
              </dd>
            </div>
          </dl>
        </article>
        <article className="border-t border-[var(--editorial-ink)] pt-6">
          <h3 className="font-[family-name:var(--font-editorial)] text-2xl">
            GitLawn
          </h3>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--editorial-muted)]">
            쓰던 GitHub 잔디 앱에 버그가 있고 업데이트도 끊겨서, 직접 만들어
            관리하기로 했습니다.
          </p>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[var(--editorial-muted)]">
            iPhone과 iPad에서 사용자명만 입력하면{" "}
            <strong className="text-[var(--editorial-ink)]">
              여러 사람의 지난 1년간 공개 기여 기록을 <br />한 화면에서 비교
            </strong>
            할 수 있습니다. 자주 보는 프로필은 홈 화면 위젯에 고정할 수
            있습니다. 현재 App Store에서 받을 수 있습니다.
          </p>
          <dl className="mt-6 border-y border-[var(--editorial-rule)] text-sm">
            {gitLawnStack.map(([label, stack]) => (
              <div
                key={label}
                className="grid gap-1 py-3 not-first:border-t not-first:border-[var(--editorial-rule)] sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="font-semibold">{label}</dt>
                <dd className="leading-relaxed text-[var(--editorial-muted)]">
                  {stack}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}

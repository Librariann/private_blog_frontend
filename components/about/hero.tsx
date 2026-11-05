import { ArrowDownRight, Github, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="editorial-profile-hero">
      <div className="editorial-profile-number" aria-hidden="true">P<br />01</div>
      <div className="editorial-profile-intro">
        <span className="editorial-kicker">소개</span>
        <h1>Park<br />SeongHyun</h1>
        <p>
          안녕하세요, 백엔드 개발자 박성현입니다. 주로 API를 개발하고 DB
          구조를 설계합니다. 필요하면 화면 개발과 배포도 직접 합니다. 이
          블로그에는 개발하다 막혔던 문제와 해결 방법을 적고 있습니다.
        </p>
      </div>
      <aside>
        <span>Backend · Frontend<br />Infrastructure · Architecture</span>
        <a href="mailto:okpc0305@gmail.com"><Mail aria-hidden="true" /> okpc0305@gmail.com</a>
        <a href="https://github.com/librariann" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> github/librariann</a>
        <a href="#capabilities" className="editorial-profile-scroll">하는 일 보기 <ArrowDownRight /></a>
      </aside>
    </section>
  );
}

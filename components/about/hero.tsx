import { ArrowDownRight, Github, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="editorial-profile-hero">
      <div className="editorial-profile-number" aria-hidden="true">P<br />01</div>
      <div className="editorial-profile-intro">
        <span className="editorial-kicker">소개</span>
        <h1>Park<br />SeongHyun</h1>
        <p>백엔드 개발자 박성현입니다. 서버와 DB를 주로 다루고, 화면 개발과 배포도 직접 해요.</p>
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

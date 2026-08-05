import { ArrowDownRight, Github, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="editorial-profile-hero">
      <div className="editorial-profile-number" aria-hidden="true">P<br />01</div>
      <div className="editorial-profile-intro">
        <span className="editorial-kicker">Developer profile / Seoul</span>
        <h1>Park<br />SeongHyun</h1>
        <p>복잡한 문제를 구조화하고, 작동하며 확장 가능한 시스템으로 옮기는 소프트웨어 엔지니어입니다.</p>
      </div>
      <aside>
        <span>Backend · Frontend<br />Infrastructure · Architecture</span>
        <a href="mailto:okpc0305@gmail.com"><Mail aria-hidden="true" /> okpc0305@gmail.com</a>
        <a href="https://github.com/librariann" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> github/librariann</a>
        <a href="#capabilities" className="editorial-profile-scroll">프로필 보기 <ArrowDownRight /></a>
      </aside>
    </section>
  );
}

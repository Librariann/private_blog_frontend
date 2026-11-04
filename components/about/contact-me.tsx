import { ArrowUpRight } from "lucide-react";

export function ContactMe() {
  return (
    <section id="contact" className="editorial-profile-contact">
      <span className="editorial-kicker">연락처</span>
      <h2>편하게 연락 주세요.</h2>
      <div>
        <a href="mailto:okpc0305@gmail.com"><span>Email</span><strong>okpc0305@gmail.com</strong><ArrowUpRight /></a>
        <a href="https://github.com/librariann" target="_blank" rel="noreferrer"><span>GitHub</span><strong>Librariann</strong><ArrowUpRight /></a>
      </div>
      <small>© 2026 Park SeongHyun</small>
    </section>
  );
}

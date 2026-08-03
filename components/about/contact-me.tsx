import { ArrowUpRight } from "lucide-react";

export function ContactMe() {
  return (
    <section id="contact" className="editorial-profile-contact">
      <span className="editorial-kicker">Open channel / Contact</span>
      <h2>흥미로운 문제라면,<br />이야기를 나누고 싶습니다.</h2>
      <div>
        <a href="mailto:okpc0305@gmail.com"><span>Email</span><strong>okpc0305@gmail.com</strong><ArrowUpRight /></a>
        <a href="https://github.com/librariann" target="_blank" rel="noreferrer"><span>GitHub</span><strong>Librariann</strong><ArrowUpRight /></a>
      </div>
      <small>© 2026 Park SeongHyun · Backend engineer who values documentation.</small>
    </section>
  );
}

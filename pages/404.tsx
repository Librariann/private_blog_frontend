import Link from "next/link";

export default function Custom404() {
  return (
    <main className="editorial-error-page">
      <span>404</span>
      <div><p className="editorial-kicker">404</p><h1>페이지를 찾을 수 없어요.</h1><Link href="/">홈으로 돌아가기 ↗</Link></div>
    </main>
  );
}

import Link from "next/link";

export default function Custom404() {
  return (
    <main className="editorial-error-page">
      <span>404</span>
      <div><p className="editorial-kicker">Missing page / Not found</p><h1>이 페이지는<br />아직 기록되지 않았습니다.</h1><Link href="/">메인으로 돌아가기 ↗</Link></div>
    </main>
  );
}

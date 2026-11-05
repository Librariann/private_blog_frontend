const capabilities = [
  [
    "백엔드",
    "Spring Boot나 Node.js로 백엔드를 구성합니다. REST API를 설계하고, DB 구조를 설계·개선합니다.",
  ],
  [
    "시스템 설계",
    "기능을 어디서 나눌지, 나눈 기능끼리 어떤 데이터를 주고받을지 정리합니다.",
  ],
  ["AI 기능", "LLM을 학습하고 배포해 목적에 맞는 기능을 구현합니다."],
  [
    "배포와 운영",
    "프라이빗 클라우드를 구성하고, Kubernetes와 GitOps로 배포 환경을 만들었습니다.",
  ],
  ["프론트엔드", "React와 Next.js로 사용자 화면을 만듭니다."],
];

export function AboutMe() {
  return (
    <section id="capabilities" className="editorial-profile-section">
      <header>
        <span>01</span>
        <div>
          <p className="editorial-kicker">개발 분야</p>
          <h2>하는 일</h2>
        </div>
      </header>
      <div className="editorial-capability-list">
        {capabilities.map(([title, description], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

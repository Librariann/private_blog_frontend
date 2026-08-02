const capabilities = [
  ["Backend Engineering", "Spring Boot와 Node.js 기반 서버 로직, API와 데이터 모델을 설계합니다."],
  ["System Architecture", "도메인과 계층을 분리하고 서비스 전체의 데이터 흐름을 구조화합니다."],
  ["Applied AI & LLM", "서비스 목적에 맞는 LLM을 학습·배포하고, 사용자 맥락을 분석해 행동과 개선 방향을 추천하는 기능을 설계합니다."],
  ["DevOps & Infrastructure", "Private Cloud, Kubernetes, GitOps 기반의 배포와 운영 환경을 구축합니다."],
  ["Frontend Engineering", "React와 Next.js로 제품의 인터페이스와 렌더링 구조를 구현합니다."],
];

export function AboutMe() {
  return (
    <section id="capabilities" className="editorial-profile-section">
      <header><span>01</span><div><p className="editorial-kicker">Capabilities</p><h2>시스템을 끝까지<br />이어 보는 역량</h2></div></header>
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

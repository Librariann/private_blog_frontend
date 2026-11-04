const capabilities = [
  ["백엔드", "Spring Boot와 Node.js로 서버를 만들고, API와 DB 구조를 설계해요."],
  ["시스템 설계", "기능을 어디까지 나눌지, 데이터가 어디로 흘러갈지 설계해요."],
  ["AI 기능", "LLM을 학습하고 배포해서 할 일이나 광고 개선안을 추천하는 기능에 붙여봤어요."],
  ["배포와 운영", "프라이빗 클라우드를 구성하고, Kubernetes와 GitOps로 배포 환경을 만들었어요."],
  ["프론트엔드", "React와 Next.js로 사용자 화면을 만들어요."],
];

export function AboutMe() {
  return (
    <section id="capabilities" className="editorial-profile-section">
      <header><span>01</span><div><p className="editorial-kicker">개발 분야</p><h2>하는 일</h2></div></header>
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

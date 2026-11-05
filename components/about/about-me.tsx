const capabilities = [
  ["백엔드", "Spring Boot나 Node.js로 API를 만들어요. 필요한 데이터를 어떻게 저장할지도 같이 정해요."],
  ["시스템 설계", "기능을 어디서 나눌지, 나눈 기능끼리 어떤 데이터를 주고받을지 정리해요."],
  ["AI 기능", "직접 학습시켜 배포한 LLM을 할 일 추천이나 광고 개선안 제안에 써봤어요."],
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

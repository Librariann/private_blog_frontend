export function Experience() {
  const experiences = [
    {
      company: "Growdo Labs (그로우두 랩스)",
      position: "Founder, Software Engineer (Fullstack)",
      period: "2025.11 - Present",
      location: "Seoul, Korea",
      description: [
        "Growdo와 GrowdoAds의 도메인 모델링, DB 스키마 및 NestJS API 설계·구현",
        "NestJS 기반 백엔드 API 설계·구현 및 PostgreSQL 데이터베이스 구조 설계·개선",
        "Next.js App router 기반 사용자 화면 개발",
        "각 서비스의 목적에 맞게 LLM을 학습·배포하고 AI 추천 기능에 연동",
        "쿠폰교환 및 도전과제 달성시의 데이터 정합성, 멱등성, 트랜잭션 처리 로직 구현",
      ],
    },
    {
      company: "(주)웨이버스",
      position: "Software Engineer (Fullstack)",
      period: "2024.05 - 2025.08",
      location: "Seoul, Korea",
      description: [
        "Spring Boot 기반 MSA 아키텍처 설계 및 서비스 모듈화 주도",
        "OpenStack All-in-One 환경에 내·외부 네트워크 분리 및 Private Cloud 구성",
        "ArgoCD를 통한 GitOps 방식의 CI/CD 인프라 구축 및 자동화",
      ],
    },
    {
      company: "JIN SYSTEM(주)",
      position: "Software Engineer (Fullstack)",
      period: "2023.02 - 2024.03",
      location: "Seoul, Korea",
      description: [
        "공간 데이터를 조회하는 전용 API 서버 설계·개발",
        "공간 인덱스 적용과 복합 쿼리 최적화로 응답 시간 단축",
        "공간 데이터와 API, GeoServer 연동을 통해 실시간 도로 상태 및 위치정보 표시",
      ],
    },
    {
      company: "한류뱅크(주)",
      position: "Software Engineer (Fullstack)",
      period: "2021.12 - 2022.06",
      location: "Seoul, Korea",
      description: [
        "Spring Boot 기반 백엔드 신규 개발, 회원·게시판 등 핵심 API 설계 및 구현",
        "Node.js(Express) 기반으로 글로벌 댄스 컴피티션 웹사이트의 백엔드 API를 설계·구현",
        "React 기반 커뮤니티 웹뷰 페이지 신규 구축 및 Spring Boot / Node.js(Express) API 연동",
      ],
    },
    {
      company: "Intellic I&S",
      position: "Software Engineer (Backend)",
      period: "2021.03 - 2021.08",
      location: "Seoul, Korea",
      description: [
        "Spring Boot, MyBatis 기반으로 급여·평가 등 인사 도메인 REST API 구현",
        "Oracle -> Tibero 데이터베이스 마이그레이션 수행",
        "이관 전후의 행 수를 확인하고, ID로 뽑은 무작위 표본을 비교해 데이터 검증",
      ],
    },
    {
      company: "Eduhash Global Partners",
      position: "Software Engineer (Backend)",
      period: "2020.02 - 2021.02",
      location: "Seoul, Korea",
      description: [
        "PHP(CodeIgniter) 기반으로 백엔드 API 구조 설계",
        "NHN KCP 결제 API 연동 및 결제 프로세스 구축",
        "쿠폰 생성·적용 기능 개발로 상품·강의 결제 시 할인 로직 구현",
        "MySQL -> MariaDB 데이터 마이그레이션 수행",
      ],
    },
  ];

  return (
    <section id="experience" className="editorial-profile-section">
      <header>
        <span>02</span>
        <div>
          <p className="editorial-kicker">2020년부터</p>
          <h2>일해 온 곳</h2>
        </div>
      </header>
      <div className="editorial-experience-list">
        {experiences.map((experience, index) => (
          <article key={`${experience.company}-${experience.period}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <time>{experience.period}</time>
              <small>{experience.location}</small>
            </div>
            <div>
              <h3>{experience.company}</h3>
              <p>{experience.position}</p>
            </div>
            <ul>
              {experience.description.map((description) => (
                <li key={description}>{description}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

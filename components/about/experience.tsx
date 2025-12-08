import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const experiences = [
    {
      company: "(주)웨이버스",
      position: "Software Engineer (Backend)",
      period: "2024.05 - 2025.07",
      location: "Seoul, Korea",
      description: [
        "Spring Boot 기반 MSA 아키텍처 설계 및 서비스 모듈화 주도",
        "OpenStack All-in-One 환경에 내·외부 네트워크 분리 및 Private Cloud 구성",
        "ArgoCD를 통한 GitOps 방식의 CI/CD 인프라 구축 및 자동화",
      ],
      color: "violet",
    },
    {
      company: "JIN SYSTEM(주)",
      position: "Software Engineer (Backend)",
      period: "2023.02 - 2024.03",
      location: "Seoul, Korea",
      description: [
        "공간정보 데이터를 효율적으로 핸들링하기 위한 전용 백엔드 API 서버 설계 및 구축",
        "공간 인덱스(Spatial Index) 적용 및 복합 쿼리 최적화로 응답 지연 최소화",
        "공간 데이터와 API, GeoServer 연동을 통해 실시간 도로 상태 및 위치정보 표시",
      ],
      color: "purple",
    },
    {
      company: "한류뱅크(주)",
      position: "Software Engineer (Backend)",
      period: "2021.12 - 2022.06",
      location: "Seoul, Korea",
      description: [
        "Spring Boot 기반 백엔드 신규 개발, 회원·게시판 등 핵심 API 설계 및 구현",
        "Node.js(Express) 기반으로 글로벌 댄스 컴피티션 웹사이트의 백엔드 API를 설계·구현",
        "React 기반 커뮤니티 웹뷰 페이지 신규 구축 및 Spring Boot / Node.js(Express) API 연동",
      ],
      color: "purple",
    },
    {
      company: "Intellic I&S",
      position: "Software Engineer (Backend)",
      period: "2021.03 - 2021.08",
      location: "Seoul, Korea",
      description: [
        "Spring Boot, MyBatis 기반으로 급여·평가 등 인사 도메인 REST API 구현",
        "Oracle -> Tibero 데이터베이스 마이그레이션 수행",
        "이관 전후 Row Count 및 주요 Key(ID) 기준 랜덤 샘플 데이터 비교를 통해 정합성 검증 수행",
      ],
      color: "indigo",
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
      color: "indigo",
    },
  ];

  const colorMap = {
    violet: {
      badge: "bg-violet-400",
      border: "border-violet-400/30",
      hoverBorder: "hover:border-violet-400/60",
      text: "text-violet-200",
      glow: "shadow-violet-500/20",
    },
    purple: {
      badge: "bg-purple-400",
      border: "border-purple-400/30",
      hoverBorder: "hover:border-purple-400/60",
      text: "text-purple-200",
      glow: "shadow-purple-500/20",
    },
    indigo: {
      badge: "bg-indigo-400",
      border: "border-indigo-400/30",
      hoverBorder: "hover:border-indigo-400/60",
      text: "text-indigo-200",
      glow: "shadow-indigo-500/20",
    },
  };

  return (
    <section
      id="experience"
      className="min-h-screen snap-start flex items-center py-20 px-4 relative"
    >
      {/* Section divider line */}
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-purple-200 mb-4 text-2xl md:text-4xl"
            animate={
              isInView
                ? {
                    textShadow: [
                      "0 0 20px rgba(192, 132, 252, 0.3)",
                      "0 0 30px rgba(192, 132, 252, 0.5)",
                      "0 0 20px rgba(192, 132, 252, 0.3)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            경력사항
          </motion.h2>
          <p className="text-violet-200 max-w-2xl mx-auto">
            My professional journey and achievements
          </p>
        </motion.div>

        {/* Grid layout for experiences */}
        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => {
            const colors = colorMap[exp.color as keyof typeof colorMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                <div
                  className={`relative bg-zinc-900/50 backdrop-blur-md border ${colors.border} ${colors.hoverBorder} rounded-2xl p-6 transition-all duration-300 h-full hover:scale-105 hover:shadow-xl ${colors.glow} flex flex-col`}
                >
                  {/* Header */}
                  <div className="mb-4">
                    <p className="text-gray-300 mb-3 md:text-xl font-bold">
                      {exp.company}
                    </p>
                    <motion.h3
                      className={`${colors.text} mb-2 text-sm md:text-`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {exp.position}
                    </motion.h3>

                    {/* Period badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 ${colors.badge} bg-opacity-20 rounded-lg border ${colors.border} mb-2`}
                    >
                      <Calendar className="w-3 h-3 text-gray-300" />
                      <span className="text-gray-300 text-xs">
                        {exp.period}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 flex-1">
                    {exp.description.map((desc, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.2 + i * 0.1,
                        }}
                        className="flex items-start gap-2 text-gray-400 text-sm"
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 ${colors.badge} rounded-full flex-shrink-0`}
                        ></span>
                        <span>{desc}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Decorative corner accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-16 h-16 ${colors.badge} opacity-10 rounded-bl-full blur-xl`}
                    animate={{
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

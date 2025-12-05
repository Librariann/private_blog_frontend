"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function About2() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEmphasis, setShowEmphasis] = useState(false);

  const titles = [
    "Backend Developer",
    "Frontend Developer",
    "Software Engineer",
  ];

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const isLastTitle = titleIndex === titles.length - 1;
    const pauseTime = isLastTitle ? 4000 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // 타이핑 중
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
          // 마지막 글자 타이핑 완료 시
          if (displayText.length + 1 === currentTitle.length && isLastTitle) {
            setShowEmphasis(true);
          }
        } else {
          // 타이핑 완료 - 대기 후 삭제
          setTimeout(() => {
            setShowEmphasis(false);
            setIsDeleting(true);
          }, pauseTime);
        }
      } else {
        // 삭제 중
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // 삭제 완료, 다음 타이틀로
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 },
  };

  const skills = {
    Frontend: ["React", "TypeScript", "Next.js", "Zustand", "React-Query"],
    Backend: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "Nest.js",
      "PHP",
      "CodeIgniter",
    ],
    DevOps: [
      "OpenStack",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "Harbor",
      "ArgoCD",
    ],
    Database: ["PostgreSQL", "MySQL", "MariaDB", "Oracle", "Tibero"],
    Etc: ["Git", "Jira", "Slack"],
  };

  const timeline = [
    {
      year: "2024.05 - 2025.07",
      title: "Software Engineer",
      company: "㈜ 웨이버스",
      position: "대리",
      description:
        "재산관리통합체계 구축 - MSA 아키텍처 설계, MFA 구축, CI/CD 인프라 구축으로 배포 시간 75% 단축",
    },
    {
      year: "2023.02 - 2024.03",
      title: "Software Engineer",
      company: "제이아이엔시스템㈜",
      position: "대리",
      description:
        "도로정보플랫폼 구축 - PostgreSQL 공간 인덱스 최적화로 GIS 조회 성능 50% 개선",
    },
    {
      year: "2021.12 - 2022.06",
      title: "Software Engineer",
      company: "한류뱅크㈜",
      position: "대리",
      description:
        "글로벌 K-POP 플랫폼 - React 기반 이벤트 페이지 단독 개발, Node.js 프로모션 사이트 구축",
    },
    {
      year: "2021.03 - 2021.08",
      title: "Software Engineer",
      company: "Intellic I&S",
      position: "대리",
      description:
        "현대 IFC 인사시스템 - Spring 기반 대규모 인사 데이터 트랜잭션 처리 로직 구현",
    },
    {
      year: "2020.02 - 2021.02",
      title: "Software Engineer",
      company: "에듀해시글로벌파트너스",
      position: "매니저",
      description:
        "공무원 학원 강의 플랫폼 - PHP 기반 리뉴얼, NHN KCP 결제 시스템 설계 및 구현",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 snap-y snap-mandatory overflow-y-scroll h-screen">
      {/* Hero Section */}
      <section className="snap-start relative min-h-screen flex items-center justify-center px-4 bg-slate-900">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            Park SeongHyun
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-4xl mb-8 h-12 md:h-16 text-gray-300"
          >
            {showEmphasis ? (
              <motion.span
                key="emphasis"
                className="final-title"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.3, 1.15, 1.3, 1.15, 1.1],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                {displayText}
              </motion.span>
            ) : (
              <span className="typing-text">{displayText}</span>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center text-gray-400 text-sm"
          >
            <span>📧 okpc0306@naver.com</span>
            {/* <span className="hidden md:inline">|</span> */}
            {/* <span>💼 경력 4년 7개월</span> */}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="text-sm">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="snap-start relative min-h-screen flex items-center py-32 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="glass-card p-8 md:p-12 rounded-2xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">핵심 역량</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  🎯 Frontend Development
                </h3>
                <p>
                  Spring Boot 기반 MSA 아키텍처 설계 및 REST API 개발,
                  PostgreSQL 데이터베이스 설계 및 최적화
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  🎯 Backend Development
                </h3>
                <p>
                  Spring Boot 기반 MSA 아키텍처 설계 및 REST API 개발,
                  PostgreSQL 데이터베이스 설계 및 최적화
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  💻 DevOps Development
                </h3>
                <p>
                  Spring Boot, Node.js (Backend) + React, TypeScript (Frontend)
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  🏗️ Micro Frontend Architecture
                </h3>
                <p>
                  Webpack Module Federation 기반 MFA 구조 설계 및 런타임 통합
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  ⚙️ DevOps Experience
                </h3>
                <p>Kubernetes, CI/CD 기반 배포 자동화 경험</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="snap-start relative min-h-screen flex items-center py-32 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            {...fadeInUp}
            className="text-4xl font-bold text-white mb-16 text-center"
          >
            경력 사항
          </motion.h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-24 shrink-0">
                    <span className="text-2xl font-bold text-[#29445D]">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-2">
                      {item.company} - {item.position}
                    </p>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="snap-start relative min-h-screen flex items-center py-32 px-4 bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeInUp}
            className="text-4xl font-bold text-white mb-16 text-center"
          >
            기술 스택
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, techs], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-2xl font-bold text-[#29445D] mb-4 text-white">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 cursor-pointer">
                  {techs.map((tech, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-slate-700/50 text-gray-300 rounded-lg text-sm border border-gray-600 hover:border-[#29445D] hover:text-white transition-all"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="snap-start relative min-h-screen flex items-center py-32 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            {...fadeInUp}
            className="text-4xl font-bold text-white mb-8"
          >
            연락처
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-2xl">📧</span>
                <a
                  href="mailto:okpc0306@naver.com"
                  className="text-lg hover:text-white transition-colors"
                >
                  okpc0306@naver.com
                </a>
              </div>
            </div>

            <motion.a
              href="https://github.com/Librariann"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              className="glass-card p-5 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .typing-text {
          display: inline-block;
          border-right: 3px solid rgba(255, 255, 255, 0.7);
          animation: blink 0.7s step-end infinite;
        }

        .final-title {
          display: inline-block;
          color: #ffffff !important;
          font-weight: 700;
          animation: super-glow 3s ease-in-out;
        }

        @keyframes blink {
          0%,
          100% {
            border-color: rgba(255, 255, 255, 0.7);
          }
          50% {
            border-color: transparent;
          }
        }

        @keyframes super-glow {
          0% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 1);
          }
          20% {
            text-shadow:
              0 0 30px #29445d,
              0 0 50px #29445d,
              0 0 70px #29445d,
              0 0 90px rgba(41, 68, 93, 0.8),
              0 0 110px rgba(41, 68, 93, 0.6);
          }
          40% {
            text-shadow:
              0 0 25px rgba(255, 255, 255, 1),
              0 0 40px #29445d;
          }
          60% {
            text-shadow:
              0 0 35px #29445d,
              0 0 55px #29445d,
              0 0 75px #29445d,
              0 0 95px rgba(41, 68, 93, 0.8),
              0 0 115px rgba(41, 68, 93, 0.6);
          }
          80% {
            text-shadow:
              0 0 25px rgba(255, 255, 255, 1),
              0 0 40px #29445d;
          }
          100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 1);
          }
        }
      `}</style>
    </div>
  );
}

export default About2;

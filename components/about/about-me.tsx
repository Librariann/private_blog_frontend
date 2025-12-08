"use client";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import {
  User,
  Heart,
  Target,
  Server,
  Globe,
  MonitorCog,
  CloudCog,
  Asterisk,
} from "lucide-react";

export function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  type cardsType = {
    icon: any;
    title: string;
    description: string[];
    color: string;
    borderColor: string;
    hoverBorder: string;
    textColor: string;
  };

  const cards: cardsType[] = [
    {
      icon: Server,
      title: `Backend Engineering`,
      description: [
        "Spring Boot 기반 비즈니스 로직 및 트랜잭션 처리 경험",
        "Node.js(Express, NestJS) 기반 서버 로직 개발",
        "API 설계 및 데이터 모델링 경험",
        "안정성과 유지보수성을 고려한 서비스 구조 설계",
      ],
      color: "bg-violet-400",
      borderColor: "border-violet-400/30",
      hoverBorder: "hover:border-violet-400/60",
      textColor: "text-violet-200",
    },
    {
      icon: MonitorCog,
      title: "System Architecture",
      description: [
        "도메인 분리 및 계층형 구조 설계",
        "요구사항 분석 및 아키텍처 구조화",
        "데이터 흐름 설계 및 서비스 전체 구조 정리",
      ],
      color: "bg-indigo-400",
      borderColor: "border-indigo-400/30",
      hoverBorder: "hover:border-indigo-400/60",
      textColor: "text-indigo-200",
    },
    {
      icon: CloudCog,
      title: "DevOps & Infrastructure",
      description: [
        "Cloud 기반 배포 및 운영 경험",
        "OpenStack 기반 Private Cloud 구축 경험",
        "GitOps 활용 CI/CD 파이프라인 구축",
        "K8s, Docker 운영 경험",
      ],
      color: "bg-indigo-400",
      borderColor: "border-indigo-400/30",
      hoverBorder: "hover:border-indigo-400/60",
      textColor: "text-indigo-200",
    },
    {
      icon: Globe,
      title: "Frontend Engineering",
      description: [
        "React 기반 UI 개발",
        "Next.js (App Router, Page Router) 활용 및 SEO 최적화",
        "MFA(Micro Frontend Architecture) 구조 설계 및 활용",
        "렌더링 흐름 및 컴포넌트 구조 최적화",
      ],
      color: "bg-purple-400",
      borderColor: "border-purple-400/30",
      hoverBorder: "hover:border-purple-400/60",
      textColor: "text-purple-200",
    },
    {
      icon: Asterisk,
      title: "Problem Solving & Collaboration",
      description: [
        "문제 정의 및 구조화",
        "코드 품질 및 일관성 유지",
        "리뷰 중심 협업 경험",
        "타 부서와 원활한 협업 경험",
      ],
      color: "bg-purple-400",
      borderColor: "border-purple-400/30",
      hoverBorder: "hover:border-purple-400/60",
      textColor: "text-purple-200",
    },
  ];

  return (
    <section
      data-section="1"
      id="about"
      className="min-h-screen snap-start flex items-center py-20 px-4 relative"
    >
      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-[linear-gradient(to_bottom,transparent,rgba(216,180,254,0.5),transparent)]"></div>

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-violet-200 mb-4 text-2xl md:text-4xl"
            animate={
              isInView
                ? {
                    opacity: [0.7, 1, 0.7],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            핵심역량
          </motion.h1>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            {/* 작동하고, 확장되고, 안정적인 시스템을 만듭니다. */}
            Quietly building systems that work, scale, and stay reliable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                <div
                  className={`relative bg-zinc-900/50 backdrop-blur-md border ${card.borderColor} ${card.hoverBorder} rounded-2xl p-8 transition-all duration-300 h-full hover:scale-105`}
                >
                  <motion.div
                    className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center mb-6 transition-transform duration-300`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-black" />
                  </motion.div>
                  <motion.h3
                    className={`${card.textColor} mb-3`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {card.title}
                  </motion.h3>
                  <div className="text-gray-400">
                    {card?.description?.map((line, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="shrink-0">•</span>
                        <span className="flex-1">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
function About3() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEmphasis, setShowEmphasis] = useState(false);
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 },
  };
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

  const MemoizedSparkles = useMemo(
    () => (
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    ),
    []
  );
  return (
    <div
      className="h-screen overflow-y-auto"
      style={{ scrollSnapType: "y mandatory" }}
    >
      {/* 첫 번째: snap으로 고정 */}
      <section
        className="h-screen relative flex items-center justify-center bg-black snap-start snap-always"
        style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
      >
        <div className="w-full absolute inset-0 h-screen">
          {MemoizedSparkles}
        </div>

        <div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center text-gray-400 md:text-lg text-sm"
          >
            문제를 기술로 매끄럽게 정리하는 개발자입니다.
          </motion.div>
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
            transition={{ delay: 1, duration: 0.8 }}
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
            transition={{ delay: 2, duration: 0.8 }}
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
      <section
        className="bg-slate-900 min-h-screen px-4 py-20 md:p-20"
        style={{ scrollSnapAlign: "start" }}
      >
        <motion.div {...fadeInUp}>
          <h2 className="text-white text-4xl">핵심역량</h2>
          <p className="text-gray-300">내용...</p>
        </motion.div>
      </section>

      <section
        className="min-h-screen py-20 px-4 md:p-20 bg-slate-800"
        style={{ scrollSnapAlign: "start" }}
      >
        <h2 className="text-white text-4xl">Projects</h2>
        <p className="text-gray-300">프로젝트...</p>
      </section>

      <section
        className="min-h-screen py-20 px-4 md:p-20 bg-slate-900"
        style={{ scrollSnapAlign: "start" }}
      >
        <h2 className="text-white text-4xl">Skills</h2>
        <p className="text-gray-300">기술...</p>
      </section>

      <section
        className="min-h-screen py-20 px-4 md:p-20 bg-slate-800"
        style={{ scrollSnapAlign: "start" }}
      >
        <h2 className="text-white text-4xl">Contact</h2>
        <p className="text-gray-300">연락처</p>
      </section>
    </div>
  );
}

export default About3;

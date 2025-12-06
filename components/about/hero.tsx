import { motion } from "motion/react";
import { ChevronDown, Mail, GithubIcon } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

export function Hero() {
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

  const particles = useMemo(
    () =>
      [...Array(30)].map((_, i) => ({
        id: i,
        initialX:
          Math.random() *
          (typeof window !== "undefined" ? window.innerWidth : 1000),
        initialY:
          Math.random() *
          (typeof window !== "undefined" ? window.innerHeight : 1000),
        moveY: Math.random() * -100 - 50,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    []
  ); // 빈 의존성 배열 = 한 번만 생성
  return (
    <section
      data-section={"0"}
      className="h-screen flex items-center justify-center px-4 snap-start relative"
    >
      {/* Floating particles - pastel colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-violet-400 rounded-full"
            initial={{
              x: particle.initialX,
              y: particle.initialY,
              opacity: 0,
            }}
            animate={{
              y: [null, particle.moveY],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center text-gray-400 md:text-lg text-sm"
        >
          문제를 기술로 매끄럽게 정리하는 개발자입니다.
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
        >
          Park SeongHyun
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
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
        <div className="flex">
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 125 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center text-gray-400 text-sm"
          >
            <div className="flex">
              <Mail />
              &nbsp;&nbsp;
              <span className="mt-[1px]">okpc0306@naver.com</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 195 }}
            animate={{ opacity: 1, x: 155 }}
            transition={{ delay: 4.5, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center text-gray-400 text-sm"
          >
            <div className="flex">
              <GithubIcon />
              <span className="mt-[1px]">Librariann</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-violet-300 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

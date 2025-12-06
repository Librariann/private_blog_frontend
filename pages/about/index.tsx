"use client";
import { AboutMe } from "@/components/about/about-me";
import { Hero } from "@/components/about/hero";
import { useEffect, useState } from "react";
function About() {
  const [pageNum, setPageNum] = useState(0);
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionNum = entry.target.getAttribute("data-section");
            setPageNum(Number(sectionNum));
          }
        });
      },
      { threshold: 0.5 } // 섹션의 50% 보이면 트리거
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black relative">
      {/* Animated background grid */}
      {pageNum !== 0 && (
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />
      )}

      {/* Gradient orbs - pastel colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow"></div>
      </div>

      {/* Spotlight effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.05),transparent)] pointer-events-none"></div>

      <Hero />
      <AboutMe />
    </div>
  );
}

export default About;

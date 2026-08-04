import { AboutMe } from "@/components/about/about-me";
import { ContactMe } from "@/components/about/contact-me";
import { Experience } from "@/components/about/experience";
import { Hero } from "@/components/about/hero";
import { Skills } from "@/components/about/skils";
import Head from "next/head";

function About() {
  return (
    <>
      <Head>
        <title>개발자 프로필 | Park SeongHyun</title>
        <meta name="description" content="시스템을 설계하고 운영하는 개발자 Park SeongHyun의 경력과 기술 프로필" />
      </Head>
      <main className="editorial-profile">
        <Hero />
        <AboutMe />
        <Experience />
        <Skills />
        <ContactMe />
      </main>
    </>
  );
}

export default About;

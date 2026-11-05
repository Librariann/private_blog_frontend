import { AboutMe } from "@/components/about/about-me";
import { ContactMe } from "@/components/about/contact-me";
import { Experience } from "@/components/about/experience";
import { Hero } from "@/components/about/hero";
import { PersonalProjects } from "@/components/about/personal-projects";
import { Skills } from "@/components/about/skils";
import Head from "next/head";

function About() {
  return (
    <>
      <Head>
        <title>개발자 프로필 | Park SeongHyun</title>
        <meta name="description" content="백엔드 개발자 박성현이에요. 제가 해온 일과 써본 기술을 소개해요." />
      </Head>
      <main className="editorial-profile">
        <Hero />
        <AboutMe />
        <Experience />
        <PersonalProjects />
        <Skills />
        <ContactMe />
      </main>
    </>
  );
}

export default About;

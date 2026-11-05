const skillCategories = [
  ["Backend", ["Spring Boot", "JPA", "MyBatis", "Node.js", "NestJS", "Express", "TypeORM", "REST API"]],
  ["Database", ["MySQL", "MariaDB", "PostgreSQL", "MongoDB", "Redis"]],
  ["DevOps", ["Kubernetes", "Docker", "AWS", "OpenStack", "Ansible", "ArgoCD", "Jenkins", "Linux", "Kong"]],
  ["Frontend", ["React", "Next.js", "Tailwind CSS", "Redux Toolkit", "Zustand", "TanStack Query"]],
  ["Languages", ["Java", "JavaScript", "TypeScript", "SQL", "Bash / Shell"]],
] as const;

export function Skills() {
  return (
    <section id="skills" className="editorial-profile-section">
      <header><span>04</span><div><p className="editorial-kicker">기술 스택</p><h2>써본 기술</h2></div></header>
      <div className="editorial-skill-index">
        {skillCategories.map(([title, skills], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{skills.join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

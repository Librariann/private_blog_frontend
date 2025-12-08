import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Database,
  Layout,
  Wrench,
  Cloud,
  GitBranch,
  Sparkles,
  Server,
} from "lucide-react";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skillCategories = [
    {
      title: "Backend",
      icon: Server,
      color: "violet",
      skills: [
        "Spring Boot",
        "JPA",
        "MyBatis",
        "Node.js",
        "NestJS",
        "Express",
        "TypeORM",
        "Rest API",
      ],
    },
    {
      title: "Database",
      icon: Database,
      color: "violet",
      skills: ["MySQL", "MariaDB", "PostgreSQL", "MongoDB", "Redis"],
    },

    {
      title: "DevOps",
      icon: Cloud,
      color: "purple",
      skills: [
        "Kubernetes",
        "Docker",
        "AWS EC2",
        "AWS S3",
        "OpenStack",
        "Ansible",
        "CI/CD",
        "Nginx/Apache",
        "ArgoCD",
        "Jenkins",
        "Linux",
        "Kong",
      ],
    },
    {
      title: "Frontend",
      icon: Layout,
      color: "purple",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Redux Toolkit",
        "Zustand",
        "Tanstack-Query",
      ],
    },
    {
      title: "Languages",
      icon: Sparkles,
      color: "indigo",
      skills: ["Java", "JavaScript", "TypeScript", "SQL", "Bash/Shell Script"],
    },
  ];

  const colorMap = {
    violet: {
      bg: "bg-violet-400/10",
      border: "border-violet-400/30",
      text: "text-violet-300",
      chip: "bg-violet-400/20 text-violet-200 border-violet-400/30",
      icon: "bg-violet-400",
    },
    purple: {
      bg: "bg-purple-400/10",
      border: "border-purple-400/30",
      text: "text-purple-300",
      chip: "bg-purple-400/20 text-purple-200 border-purple-400/30",
      icon: "bg-purple-400",
    },
    indigo: {
      bg: "bg-indigo-400/10",
      border: "border-indigo-400/30",
      text: "text-indigo-300",
      chip: "bg-indigo-400/20 text-indigo-200 border-indigo-400/30",
      icon: "bg-indigo-400",
    },
    blue: {
      bg: "bg-blue-400/10",
      border: "border-blue-400/30",
      text: "text-blue-300",
      chip: "bg-blue-400/20 text-blue-200 border-blue-400/30",
      icon: "bg-blue-400",
    },
  };

  const levelColors = {
    Expert: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
    Advanced: "bg-blue-400/20 text-blue-300 border-blue-400/40",
    Intermediate: "bg-amber-400/20 text-amber-300 border-amber-400/40",
    Beginner: "bg-slate-400/20 text-slate-300 border-slate-400/40",
  };

  return (
    <section
      id="skills"
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
            className="text-indigo-200 mb-4 text-2xl md:text-4xl"
            animate={
              isInView
                ? {
                    textShadow: [
                      "0 0 20px rgba(165, 180, 252, 0.3)",
                      "0 0 30px rgba(165, 180, 252, 0.5)",
                      "0 0 20px rgba(165, 180, 252, 0.3)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            기술역량
          </motion.h2>
          <p className="text-violet-200 max-w-2xl mx-auto">
            The technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            const colors = colorMap[category.color as keyof typeof colorMap];

            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="group"
              >
                <div
                  className={`relative bg-zinc-900/50 backdrop-blur-md border ${colors.border} rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300 h-full hover:scale-105`}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      className={`${colors.icon} p-2 rounded-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-black" />
                    </motion.div>
                    <h3 className={`${colors.text}`}>{category.title}</h3>
                  </div>

                  {/* Skills list with progress bars */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`px-3 py-1.5 rounded-lg text-sm border ${colors.chip} cursor-default transition-all`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Decorative glow */}
                  <motion.div
                    className={`absolute -top-10 -right-10 w-20 h-20 ${colors.icon} opacity-10 rounded-full blur-2xl hidden md:block`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: categoryIndex * 0.5,
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

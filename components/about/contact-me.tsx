import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";

export function ContactMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:okpc0305@gmail.com",
      color: "bg-violet-300",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/librariann",
      color: "bg-indigo-300",
    },
    // {
    //   icon: Linkedin,
    //   label: "LinkedIn",
    //   href: "https://linkedin.com",
    //   color: "bg-blue-300",
    // },
    // {
    //   icon: Twitter,
    //   label: "Twitter",
    //   href: "https://twitter.com",
    //   color: "bg-purple-300",
    // },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen snap-start flex items-center py-20 px-4 relative"
    >
      {/* Section divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-[linear-gradient(to_bottom,transparent,rgba(244,114,182,0.5),transparent)]"></div>

      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-violet-200 mb-4 text-2xl md:text-4xl"
            animate={
              isInView
                ? {
                    scale: [1, 1.02, 1],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            연락처
          </motion.h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            I&apos;m always open to interesting conversations and collaborations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-zinc-900/50 backdrop-blur-md border border-indigo-400/20 rounded-3xl p-8 md:p-12"
        >
          <div className="relative grid grid-cols-2 md:grid-cols-2 gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group relative flex flex-col items-center gap-3 p-4 bg-black/30 rounded-xl hover:bg-black/50 transition-all hover:scale-110"
                >
                  <motion.div
                    className={`relative w-12 h-12 ${link.color} rounded-lg flex items-center justify-center shadow-lg`}
                    whileHover={{
                      rotate: [0, -15, 15, 0],
                      scale: 1.15,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </motion.div>
                  <motion.span
                    className="relative text-gray-300 text-sm"
                    whileHover={{
                      color: "#c7d2fe",
                      y: -2,
                    }}
                  >
                    {link.label}
                  </motion.span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500">
            © 2024 Park SeongHyun (Librarian). Backend engineer who loves
            documentation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

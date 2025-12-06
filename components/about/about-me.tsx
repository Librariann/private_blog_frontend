import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { User, Heart, Target } from "lucide-react";

export function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cards = [
    {
      icon: User,
      title: "Who I Am",
      description:
        "A passionate creator who loves organizing and sharing knowledge through writing and digital experiences.",
      color: "bg-violet-400",
      borderColor: "border-violet-400/30",
      hoverBorder: "hover:border-violet-400/60",
      textColor: "text-violet-200",
    },
    {
      icon: Heart,
      title: "What I Love",
      description:
        "Curating information, exploring new ideas, and building connections through thoughtful content.",
      color: "bg-purple-400",
      borderColor: "border-purple-400/30",
      hoverBorder: "hover:border-purple-400/60",
      textColor: "text-purple-200",
    },
    {
      icon: Target,
      title: "My Mission",
      description:
        "To create meaningful digital spaces where knowledge is accessible, organized, and inspiring.",
      color: "bg-indigo-400",
      borderColor: "border-indigo-400/30",
      hoverBorder: "hover:border-indigo-400/60",
      textColor: "text-indigo-200",
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
          <motion.h2
            className="text-violet-200 mb-4"
            animate={
              isInView
                ? {
                    opacity: [0.7, 1, 0.7],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            About Me
          </motion.h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            More than just a name, I&apos;m a storyteller and knowledge
            organizer
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
                  <p className="text-gray-400">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

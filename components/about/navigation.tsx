import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, User, Code, Mail } from "lucide-react";
import { useRouter } from "next/router";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuItems = [
    { icon: Home, label: "홈", href: "/" },
    { icon: User, label: "포스트", href: "/all-posts-page" },
    { icon: Code, label: "카테고리", href: "/all-categories-page" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll to section

    router.push(href);
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer fixed top-6 left-6 z-40 p-3 bg-violet-500/10 backdrop-blur-md rounded-lg border border-violet-400/30 hover:bg-violet-500/20 hover:border-violet-400/50 transition-all duration-300 group"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-violet-300 group-hover:text-violet-200 transition-colors" />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-black/95 backdrop-blur-xl border-r border-violet-400/30 z-50 shadow-2xl shadow-violet-500/20"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-6 right-6 p-2 bg-violet-500/10 rounded-lg border border-violet-400/30 hover:bg-violet-500/20 hover:border-violet-400/50 transition-all duration-300 group"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-violet-300 group-hover:text-violet-200 transition-colors" />
            </button>

            {/* Content */}
            <div className="flex flex-col h-full px-8 py-16">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-violet-200 mb-2">Park SeongHyun</h2>
                <p className="text-indigo-300">aka Librarian</p>
              </motion.div>

              {/* Navigation Items */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className="cursor-pointer w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-violet-500/5 border border-violet-400/20 hover:bg-violet-500/15 hover:border-violet-400/40 transition-all duration-300 group"
                        >
                          <Icon className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
                          <span className="text-violet-200 group-hover:text-violet-100 transition-colors">
                            {item.label}
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-8 border-t border-violet-400/20"
              >
                <p className="text-indigo-300 text-sm text-center">
                  Crafted with passion 💜
                </p>
              </motion.div>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-500 rounded-full filter blur-3xl opacity-10"></div>
              <div className="absolute top-1/2 -right-32 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

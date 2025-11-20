import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Menu,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useRouter } from "next/router";
import { glassCardTypes } from "./cards/blog-post-card";
import styled from "styled-components";
import { GlassCardMain } from "./main/main";

const Header = ({
  isDarkMode,
  onNavigateHome,
  onToggleTheme,
  onNavigateToAllCategories,
}: any) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleNavigation = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  const clickedMenu = (menuName: string): boolean => {
    return menuName === router.pathname;
  };

  return (
    <>
      <GlassCardMain
        isDarkMode={isDarkMode}
        className="sticky top-0 z-50 border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white">{`{L}`}</span>
              </div>
              <span
                className={`hidden sm:block ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Librarian&apos;s Blog
              </span>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push("/")}
                className={`cursor-pointer transition-colors
                  ${
                    isDarkMode
                      ? clickedMenu("/")
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : clickedMenu("/")
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:font-bold"
                  }
                `}
              >
                홈
              </button>
              <button
                onClick={() => router.push("/all-posts-page")}
                className={`cursor-pointer transition-colors
                  ${
                    isDarkMode
                      ? clickedMenu("/all-posts-page")
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : clickedMenu("/all-posts-page")
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:font-bold"
                  }`}
              >
                포스트
              </button>
              <button
                onClick={() => router.push("/all-categories-page")}
                className={`cursor-pointer transition-colors
                  ${
                    isDarkMode
                      ? clickedMenu("/all-categories-page")
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : clickedMenu("/all-categories-page")
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:font-bold"
                  }`}
              >
                카테고리
              </button>
              <button
                onClick={() => router.push("/about")}
                className={`cursor-pointer transition-colors
                  ${
                    isDarkMode
                      ? clickedMenu("/about")
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : clickedMenu("/about")
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:font-bold"
                  }`}
              >
                소개
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* <button
                className={`hidden sm:block ${isDarkMode ? "text-white/70 hover:text-white transition-colors" : "text-gray-600 hover:text-gray-900 transition-colors"}`}
              >
                <Search className="w-5 h-5" />
              </button> */}
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <div className="hidden lg:flex items-center space-x-2">
                <a
                  href="#"
                  className={
                    isDarkMode
                      ? "text-white/70 hover:text-white transition-colors"
                      : "text-gray-600 hover:text-gray-900 transition-colors"
                  }
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={
                    isDarkMode
                      ? "text-white/70 hover:text-white transition-colors"
                      : "text-gray-600 hover:text-gray-900 transition-colors"
                  }
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={
                  isDarkMode
                    ? "md:hidden text-white"
                    : "md:hidden text-gray-900"
                }
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </GlassCardMain>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <GlassMotionCardMain
            isDarkMode={isDarkMode}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 border-b overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              <button
                onClick={() => handleNavigation(onNavigateHome)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-white hover:bg-white/10"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                홈
              </button>
              <button
                onClick={() => router.push("/all-posts-page")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                포스트
              </button>
              <button
                onClick={() => handleNavigation(onNavigateToAllCategories)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                카테고리
              </button>
              <a
                href="#"
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                소개
              </a>

              <div className="pt-4 border-t border-white/10 flex items-center justify-around">
                <a
                  href="#"
                  className={
                    isDarkMode
                      ? "text-white/70 hover:text-white transition-colors p-2"
                      : "text-gray-600 hover:text-gray-900 transition-colors p-2"
                  }
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className={
                    isDarkMode
                      ? "text-white/70 hover:text-white transition-colors p-2"
                      : "text-gray-600 hover:text-gray-900 transition-colors p-2"
                  }
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className={
                    isDarkMode
                      ? "text-white/70 hover:text-white transition-colors p-2"
                      : "text-gray-600 hover:text-gray-900 transition-colors p-2"
                  }
                >
                  <Mail className="w-6 h-6" />
                </a>
                <button
                  className={
                    isDarkMode
                      ? "text-white/70 hover:text-white transition-colors p-2"
                      : "text-gray-600 hover:text-gray-900 transition-colors p-2"
                  }
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </nav>
          </GlassMotionCardMain>
        )}
      </AnimatePresence>
    </>
  );
};

export const GlassMotionCardMain = styled(motion.div)<glassCardTypes>`
  background: ${(props) =>
    props.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.7)"};
  backdrop-filter: ${(props) =>
    props.isDarkMode ? "blur(4px)" : "blur(10px)"};
  -webkit-backdrop-filter: ${(props) =>
    props.isDarkMode ? "blur(4px)" : "blur(10px)"};
  border: ${(props) =>
    props.isDarkMode
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(0, 0, 0, 0.05)"};
  box-shadow: ${(props) =>
    props.isDarkMode
      ? "0 8px 32px 0 rgba(0, 0, 0, 0.1)"
      : "0 8px 32px 0 rgba(0, 0, 0, 0.08)"};
`;

export default Header;

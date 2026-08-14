import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Github, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserInfoStore } from "@/stores/useUserInfoStore";

type HeaderProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isLoggedIn: boolean;
};

const navigation = [
  { label: "Articles", path: "/all-posts-page" },
  { label: "Index", path: "/all-categories-page" },
  { label: "About", path: "/about" },
];

const Header = ({ isDarkMode, onToggleTheme, isLoggedIn }: HeaderProps) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo } = useUserInfoStore();

  const isActive = (path: string) =>
    path === "/all-posts-page"
      ? router.pathname === path || router.pathname.startsWith("/post/")
      : router.pathname === path;

  const navigate = (path: string) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editorial-rule)] bg-[color-mix(in_oklch,var(--editorial-paper)_94%,transparent)] text-[var(--editorial-ink)] backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-[1536px] items-center justify-between px-4 sm:px-8 lg:px-20">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="editorial-serif cursor-pointer text-left text-xl font-semibold tracking-[-0.035em] sm:text-2xl"
          aria-label="Librarian's Archive 홈"
        >
          Librarian&apos;s <span className="text-[var(--editorial-signal-strong)]">Archive</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <button
              type="button"
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative min-h-11 cursor-pointer text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-colors hover:text-[var(--editorial-signal-strong)] ${
                isActive(item.path) ? "text-[var(--editorial-signal-strong)]" : ""
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--editorial-signal)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="https://github.com/Librariann"
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 min-w-11 items-center justify-center transition-colors hover:text-[var(--editorial-signal-strong)] lg:flex"
            aria-label="GitHub 프로필 열기"
          >
            <Github className="h-[1.05rem] w-[1.05rem]" />
          </a>
          <a
            href="mailto:okpc0305@gmail.com"
            className="hidden min-h-11 min-w-11 items-center justify-center transition-colors hover:text-[var(--editorial-signal-strong)] lg:flex"
            aria-label="이메일 보내기"
          >
            <Mail className="h-[1.05rem] w-[1.05rem]" />
          </a>
          <span className="mx-1 hidden h-5 w-px bg-[var(--editorial-rule)] lg:block" />
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-[var(--editorial-paper-deep)]"
            aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {isDarkMode ? <Sun className="h-[1.05rem] w-[1.05rem]" /> : <Moon className="h-[1.05rem] w-[1.05rem]" />}
          </button>

          {isLoggedIn && (
            <button
              type="button"
              onClick={() => navigate("/settings/my-page")}
              className="hidden min-h-11 min-w-11 cursor-pointer items-center justify-center sm:flex"
              aria-label="관리자 프로필 설정"
            >
              <Avatar className="h-7 w-7 rounded-none ring-1 ring-[var(--editorial-rule)]">
                <AvatarImage src={userInfo?.user?.profileImage || ""} />
                <AvatarFallback className="rounded-none bg-[var(--editorial-signal)] text-xs text-[var(--editorial-paper)]">
                  L
                </AvatarFallback>
              </Avatar>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center md:hidden"
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-[var(--editorial-ink)] bg-[var(--editorial-paper)] px-4 py-5 md:hidden"
          >
            <nav className="mx-auto grid max-w-[1536px]" aria-label="모바일 메뉴">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex min-h-14 items-center justify-between border-t border-[var(--editorial-rule)] text-left editorial-serif"
              >
                Home <span className="text-xs text-[var(--editorial-signal-strong)]">00</span>
              </button>
              {navigation.map((item, index) => (
                <button
                  type="button"
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex min-h-14 items-center justify-between border-t border-[var(--editorial-rule)] text-left editorial-serif"
                >
                  {item.label}
                  <span className="text-xs text-[var(--editorial-signal-strong)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
              <div className="flex min-h-14 items-center gap-4 border-y border-[var(--editorial-rule)]">
                <a href="https://github.com/Librariann" target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 text-xs uppercase tracking-widest">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href="mailto:okpc0305@gmail.com" className="flex min-h-11 items-center gap-2 text-xs uppercase tracking-widest">
                  <Mail className="h-4 w-4" /> Mail
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

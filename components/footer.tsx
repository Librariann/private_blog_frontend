const Footer = ({ isDarkMode }: { isDarkMode?: boolean }) => {
  return (
    <footer
      data-theme={isDarkMode ? "dark" : "light"}
      className="mt-16 border-t border-[var(--editorial-rule)] text-[var(--editorial-ink)]"
    >
      <div className="mx-auto flex max-w-[1536px] flex-col gap-3 px-4 py-8 text-[0.65rem] uppercase tracking-[0.12em] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-20">
        <p>© {new Date().getFullYear()} Librarian&apos;s Archive</p>
        <p className="text-[var(--editorial-muted)]">
          Engineering notes · Seoul, KR
        </p>
      </div>
    </footer>
  );
};

export default Footer;

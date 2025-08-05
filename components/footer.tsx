const Footer = ({ isDarkMode }: { isDarkMode?: boolean }) => {
  return (
    <footer
      className={`mt-16 py-8 ${isDarkMode ? "border-white/10" : "border-gray-200"} border-t`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-2xl p-6 text-center ${isDarkMode ? "glass-card" : "glass-card-light"}`}
        >
          <p className={isDarkMode ? "text-white/70" : "text-gray-600"}>
            © 2025 Developer Blog. All rights reserved.
          </p>
          <p
            className={isDarkMode ? "text-white/50 mt-2" : "text-gray-400 mt-2"}
          >
            글래스모피즘 디자인으로 제작된 개인 기술 블로그
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

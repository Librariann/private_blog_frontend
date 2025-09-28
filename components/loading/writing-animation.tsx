import { motion } from "framer-motion";

const WritingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative">
        {/* 노트 배경 */}
        <div className="relative w-80 h-96 bg-amber-50 rounded-lg shadow-2xl border-2 border-amber-200 overflow-hidden">
          {/* 노트 줄무늬 */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-blue-200 opacity-30"
                style={{ top: `${(i + 1) * 8}%` }}
              />
            ))}
          </div>

          {/* 노트 좌측 여백선 */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-red-300 opacity-40" />

          {/* 연필로 쓰는 텍스트 애니메이션 */}
          <div className="absolute left-16 top-16 space-y-6">
            {/* 첫 번째 줄 */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="h-1 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full"
            />

            {/* 두 번째 줄 */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "180px" }}
              transition={{
                duration: 1.3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.3,
              }}
              className="h-1 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full"
            />

            {/* 세 번째 줄 */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "220px" }}
              transition={{
                duration: 1.7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.6,
              }}
              className="h-1 bg-gradient-to-r from-slate-700 to-slate-500 rounded-full"
            />
          </div>

          {/* 연필 애니메이션 */}
          <motion.div
            initial={{ x: 60, y: 97, rotate: 45 }}
            animate={{
              x: [60, 260, 60, 240, 60, 280],
              y: [97, 97, 128, 128, 156, 156],
              rotate: 45,
            }}
            transition={{
              duration: 4.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            className="absolute"
          >
            {/* 연필 몸통 */}
            <div className="relative w-20 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg transform origin-left">
              {/* 연필 끝 (검은 부분) */}
              <div className="absolute -left-2 top-0 bottom-0 w-4 bg-gradient-to-r from-slate-800 to-slate-600 rounded-l-full" />
              {/* 연필 심 */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-1 bg-slate-900 rounded-full" />
              {/* 연필 지우개 */}
              <div className="absolute -right-2 top-0 bottom-0 w-3 bg-pink-400 rounded-r-full border-l-2 border-yellow-600" />
            </div>
          </motion.div>

          {/* 로딩 텍스트 */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <motion.p
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-slate-700 font-medium text-lg"
            >
              Posting...
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingAnimation;

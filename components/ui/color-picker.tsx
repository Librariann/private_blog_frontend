interface ColorPickerProps {
  selectedColor?: string;
  onSelect: (color: string) => void;
  isDarkMode: boolean;
}

const availableColors = [
  { name: "블루-시안", value: "from-blue-500 to-cyan-500" },
  { name: "보라-핑크", value: "from-purple-500 to-pink-500" },
  { name: "그린-에메랄드", value: "from-green-500 to-emerald-500" },
  { name: "오렌지-레드", value: "from-orange-500 to-red-500" },
  { name: "인디고-퍼플", value: "from-indigo-500 to-purple-500" },
  { name: "틸-블루", value: "from-teal-500 to-blue-500" },
  { name: "핑크-로즈", value: "from-pink-500 to-rose-500" },
  { name: "옐로-오렌지", value: "from-yellow-500 to-orange-500" },
  { name: "라임-그린", value: "from-lime-500 to-green-500" },
  { name: "바이올렛-퓨샤", value: "from-violet-500 to-fuchsia-500" },
  { name: "스카이-인디고", value: "from-sky-500 to-indigo-500" },
  { name: "앰버-레드", value: "from-amber-500 to-red-500" },
];

const ColorPicker = ({
  selectedColor,
  onSelect,
  isDarkMode,
}: ColorPickerProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {availableColors.map((color) => {
        const isSelected = selectedColor === color.value;

        return (
          <button
            key={color.value}
            onClick={() => onSelect(color.value)}
            className={`
              group relative h-12 rounded-lg overflow-hidden transition-all
              ${
                isSelected
                  ? "ring-2 ring-offset-2 scale-105" +
                    (isDarkMode
                      ? " ring-blue-400 ring-offset-gray-900"
                      : " ring-blue-500 ring-offset-white")
                  : "hover:scale-105"
              }
            `}
            title={color.name}
          >
            <div className={`w-full h-full bg-gradient-to-br ${color.value}`} />
            {isSelected && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorPicker;

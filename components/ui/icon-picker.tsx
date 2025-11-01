import {
  Code2,
  Database,
  Globe,
  Rocket,
  Server,
  Cloud,
  Cpu,
  Briefcase,
  BookOpen,
  Lightbulb,
  Smartphone,
  Monitor,
  Terminal,
  Package,
  GitBranch,
  Layout,
  Palette,
  Music,
  Camera,
  Heart,
  Star,
  Zap,
  Coffee,
  MessageSquare,
  FileCode,
  Folder,
  Settings,
  Shield,
  Lock,
  Key,
  Mail,
  Bell,
  Calendar,
  Clock,
  Map,
  Search,
  Filter,
  LucideIcon,
  Braces,
} from "lucide-react";
import { useState } from "react";
import { Input } from "./input";

interface IconPickerProps {
  selectedIcon?: string;
  onSelect: (iconName: string) => void;
  isDarkMode: boolean;
}

const availableIcons: { name: string; icon: LucideIcon }[] = [
  { name: "Code2", icon: Code2 },
  { name: "Database", icon: Database },
  { name: "Globe", icon: Globe },
  { name: "Rocket", icon: Rocket },
  { name: "Server", icon: Server },
  { name: "Cloud", icon: Cloud },
  { name: "Cpu", icon: Cpu },
  { name: "Briefcase", icon: Briefcase },
  { name: "BookOpen", icon: BookOpen },
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Smartphone", icon: Smartphone },
  { name: "Monitor", icon: Monitor },
  { name: "Terminal", icon: Terminal },
  { name: "Package", icon: Package },
  { name: "GitBranch", icon: GitBranch },
  { name: "Layout", icon: Layout },
  { name: "Palette", icon: Palette },
  { name: "Music", icon: Music },
  { name: "Camera", icon: Camera },
  { name: "Heart", icon: Heart },
  { name: "Star", icon: Star },
  { name: "Zap", icon: Zap },
  { name: "Coffee", icon: Coffee },
  { name: "MessageSquare", icon: MessageSquare },
  { name: "FileCode", icon: FileCode },
  { name: "Folder", icon: Folder },
  { name: "Settings", icon: Settings },
  { name: "Shield", icon: Shield },
  { name: "Lock", icon: Lock },
  { name: "Key", icon: Key },
  { name: "Mail", icon: Mail },
  { name: "Bell", icon: Bell },
  { name: "Calendar", icon: Calendar },
  { name: "Clock", icon: Clock },
  { name: "Map", icon: Map },
  { name: "Search", icon: Search },
  { name: "Filter", icon: Filter },
  { name: "Braces", icon: Braces },
];

const IconPicker = ({
  selectedIcon,
  onSelect,
  isDarkMode,
}: IconPickerProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIcons = availableIcons.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="아이콘 검색..."
        className={
          isDarkMode
            ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
            : "bg-white border-gray-200"
        }
      />

      <div className="grid grid-cols-9 gap-2 max-h-64 overflow-y-auto">
        {filteredIcons.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedIcon === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onSelect(item.name)}
              className={`
                aspect-square rounded-lg transition-all hover:scale-110 flex items-center justify-center
                ${
                  isSelected
                    ? isDarkMode
                      ? "bg-blue-500/30 border-2 border-blue-400"
                      : "bg-blue-100 border-2 border-blue-500"
                    : isDarkMode
                      ? "bg-white/5 hover:bg-white/10 border border-white/10"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                }
              `}
              title={item.name}
            >
              <Icon
                className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`}
              />
            </button>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <p
          className={`text-center py-4 ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
        >
          검색 결과가 없습니다
        </p>
      )}
    </div>
  );
};

export default IconPicker;

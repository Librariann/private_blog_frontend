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
import { DynamicIcon } from "lucide-react/dynamic";

interface IconPickerProps {
  selectedIcon?: string;
  onSelect: (iconName: string) => void;
  isDarkMode: boolean;
}

const availableIcons: { name: string; icon: LucideIcon }[] = [
  { name: "code-xml", icon: Code2 },
  { name: "database", icon: Database },
  { name: "globe", icon: Globe },
  { name: "rocket", icon: Rocket },
  { name: "server", icon: Server },
  { name: "cloud", icon: Cloud },
  { name: "cpu", icon: Cpu },
  { name: "briefcase", icon: Briefcase },
  { name: "book-open", icon: BookOpen },
  { name: "lightbulb", icon: Lightbulb },
  { name: "smartphone", icon: Smartphone },
  { name: "monitor", icon: Monitor },
  { name: "terminal", icon: Terminal },
  { name: "package", icon: Package },
  { name: "git-branch", icon: GitBranch },
  { name: "layout", icon: Layout },
  { name: "palette", icon: Palette },
  { name: "music", icon: Music },
  { name: "camera", icon: Camera },
  { name: "heart", icon: Heart },
  { name: "star", icon: Star },
  { name: "zap", icon: Zap },
  { name: "coffee", icon: Coffee },
  { name: "message-square", icon: MessageSquare },
  { name: "file-code", icon: FileCode },
  { name: "folder", icon: Folder },
  { name: "settings", icon: Settings },
  { name: "shield", icon: Shield },
  { name: "lock", icon: Lock },
  { name: "key", icon: Key },
  { name: "mail", icon: Mail },
  { name: "bell", icon: Bell },
  { name: "calendar", icon: Calendar },
  { name: "clock", icon: Clock },
  { name: "map", icon: Map },
  { name: "search", icon: Search },
  { name: "filter", icon: Filter },
  { name: "braces", icon: Braces },
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
          // const Icon = item.icon;
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
              <DynamicIcon
                color="white"
                className="w-5 h-5"
                name={(item.name as any) || "code"}
              />
              {/* <Icon
                className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-700"}`}
              /> */}
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

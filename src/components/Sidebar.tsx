import { motion } from "motion/react";
import { lessons, getRandomQuiz, Lesson } from "../data/lessons";
import { UserProfile } from "../types";
import { 
  Calculator, 
  Languages, 
  Beaker, 
  Globe, 
  Laptop,
  ChevronRight,
  BookOpen,
  FolderOpen,
  Trophy,
  Sparkles,
  GraduationCap,
  User as UserIcon,
  Home,
  Users,
  ShieldCheck,
  Baby,
  ShieldAlert
} from "lucide-react";

interface SidebarProps {
  activeLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  onGoHome: () => void;
  onGoSocial: () => void;
  onGoCompetition: () => void;
  onGoProfile: () => void;
  user: UserProfile | null;
}

const iconMap: Record<string, any> = {
  Fraction: Calculator,
  Languages: Languages,
  Beaker: Beaker,
  Globe: Globe,
  Laptop: Laptop,
  Trophy: Trophy
};

export default function Sidebar({ 
  activeLessonId, 
  onSelectLesson, 
  onGoHome, 
  onGoSocial, 
  onGoCompetition, 
  onGoProfile,
  user 
}: SidebarProps) {
  const categories = Array.from(new Set(lessons.map(l => l.category)));

  const getDashboardIcon = () => {
    if (user?.role === 'admin') return <ShieldAlert size={20} />;
    if (user?.role === 'user') return <Sparkles size={20} />;
    if (user?.role === 'teacher') return <ShieldCheck size={20} />;
    if (user?.role === 'parent') return <Baby size={20} />;
    return <Home size={20} />;
  };

  const getDashboardLabel = () => {
    if (user?.role === 'admin') return "Bảng Quản trị";
    if (user?.role === 'user') return "Bảng Tổng hợp";
    return "Trang chủ";
  };

  return (
    <aside className="w-full lg:w-80 bg-white border-r border-slate-200 h-screen overflow-y-auto shrink-0 flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-200 ring-4 ring-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight text-xl tracking-tight">Học Tốt Lớp 5</h1>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                {user?.role === 'admin' ? 'Tối cao Quản trị' : user?.role === 'user' ? 'Toàn quyền' : user?.role === 'teacher' ? 'Đang hướng dẫn' : user?.role === 'parent' ? 'Đang đồng hành' : 'Đang học tập'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-8">
          <button
            onClick={onGoHome}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
              activeLessonId === "home" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold" 
                : "text-slate-600 hover:bg-slate-50 font-medium"
            }`}
          >
            {getDashboardIcon()}
            {getDashboardLabel()}
          </button>

          <button
            onClick={onGoSocial}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
              activeLessonId === "social" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold" 
                : "text-slate-600 hover:bg-slate-50 font-medium"
            }`}
          >
            <Users size={20} />
            Bạn bè & Trò chuyện
          </button>

          <button
            onClick={onGoCompetition}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
              activeLessonId === "competition" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold" 
                : "text-slate-600 hover:bg-slate-50 font-medium"
            }`}
          >
            <Trophy size={20} />
            Cuộc thi & Bảng xếp hạng
          </button>

          <button
            onClick={onGoProfile}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 ${
              activeLessonId === "profile" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold" 
                : "text-slate-600 hover:bg-slate-50 font-medium"
            }`}
          >
            <UserIcon size={20} />
            Hồ sơ cá nhân
          </button>
          
          <button
            onClick={() => onSelectLesson(getRandomQuiz())}
            className={`w-full group relative flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 ${
              activeLessonId === "kiem-tra-tong-hop"
              ? "bg-purple-600 text-white shadow-xl shadow-purple-100"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-200"
            }`}
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Trophy size={20} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Siêu thử thách</p>
              <p className="font-bold text-sm">30 Câu hỏi ngẫu nhiên</p>
            </div>
            <Sparkles size={16} className="absolute top-2 right-2 opacity-50 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

        <nav className="space-y-6">
          <div className="flex items-center gap-2 px-3 mb-1">
            <BookOpen size={14} className="text-slate-400" />
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Học tập nhanh</h2>
          </div>
          {categories.map((category) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2 px-3 mb-1">
                <FolderOpen size={14} className="text-slate-400" />
                <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{category}</h2>
              </div>
              <div className="space-y-1">
                {lessons
                  .filter((l) => l.category === category)
                  .map((lesson) => {
                    const Icon = iconMap[lesson.icon] || BookOpen;
                    const isActive = activeLessonId === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-semibold" 
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg transition-colors ${
                            isActive ? "bg-blue-100" : "bg-slate-100 group-hover:bg-white"
                          }`}>
                            <Icon size={16} />
                          </div>
                          <span className="text-sm text-left line-clamp-1">{lesson.title}</span>
                        </div>
                        {isActive && (
                          <motion.div layoutId="active-indicator">
                            <ChevronRight size={14} className="text-blue-500" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 overflow-hidden shadow-inner p-1">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={20} />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              {user?.name || "Người học"}
            </p>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">
              {user?.role === 'admin' ? 'Quản trị viên' : user?.role === 'user' ? 'Siêu người dùng' : user?.role === 'teacher' ? 'Giáo viên' : user?.role === 'parent' ? 'Phụ huynh' : `Lớp ${user?.className}`}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

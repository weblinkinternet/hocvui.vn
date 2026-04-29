import { motion } from "motion/react";
import { lessons, Lesson } from "../data/lessons";
import { Trophy, BookOpen, Star, Clock, ArrowRight, Sparkles } from "lucide-react";

interface HomeViewProps {
  user: any;
  onSelectLesson: (lesson: Lesson) => void;
  onStartQuiz: () => void;
}

export default function HomeView({ user, onSelectLesson, onStartQuiz }: HomeViewProps) {
  const categories = ["Toán học", "Tiếng Việt", "Khoa học"];
  
  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="mb-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-4">Chào mừng {user?.name || "bạn"}! 👋</h1>
            <p className="text-blue-100 text-lg font-medium max-w-xl leading-relaxed">
              Hôm nay chúng ta sẽ bắt đầu bài học nào? Hệ thống đã chuẩn bị sẵn các bài ôn tập lớp 5 cho bạn.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={onStartQuiz}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Trophy size={20} />
                Làm bài tổng hợp
              </button>
              <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-3">
                <Star className="text-yellow-400" size={20} />
                <span className="font-bold">Lớp {user?.className || "5A1"}</span>
              </div>
            </div>
          </div>
          
          <Sparkles className="absolute top-10 right-10 text-white/20" size={120} />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </header>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <BookOpen className="text-blue-600" />
            Môn học nổi bật
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const firstLesson = lessons.find(l => l.category === cat);
            if (!firstLesson) return null;
            
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onSelectLesson(firstLesson)}
                className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-left hover:border-blue-500 transition-all active:scale-95"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-6 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <BookOpen size={28} />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Cấp độ: Lớp 5</p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{cat}</h3>
                <div className="flex items-center text-blue-600 font-bold text-sm">
                  Bắt đầu ngay
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Thử thách bản thân!</h3>
            <p className="text-slate-400 font-medium">Bản lĩnh học tập với bộ 30 câu hỏi ngẫu nhiên được cập nhật hàng ngày.</p>
          </div>
          <button 
            onClick={onStartQuiz}
            className="px-10 py-5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-3xl font-black text-lg shadow-xl shadow-purple-500/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            BẮT ĐẦU THỬ THÁCH
          </button>
        </div>
      </section>
    </div>
  );
}

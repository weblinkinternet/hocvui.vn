import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Baby, 
  Search, 
  Plus, 
  BarChart2, 
  BookOpen, 
  Award, 
  Calendar, 
  User, 
  Heart,
  ChevronRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { UserProfile } from "../types";

interface ParentDashboardProps {
  user: UserProfile;
}

interface ChildData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  progress: number;
  averageScore: number;
  rank: number;
  lastLesson: string;
  badges: number;
}

export default function ParentDashboard({ user }: ParentDashboardProps) {
  const [activeChild, setActiveChild] = useState<ChildData | null>(null);
  const [children, setChildren] = useState<ChildData[]>([
    { 
      id: '1', 
      name: "Nguyễn Văn An", 
      email: "an@example.com", 
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=An", 
      progress: 75, 
      averageScore: 8.5, 
      rank: 12, 
      lastLesson: "Phép nhân phân số", 
      badges: 8 
    }
  ]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [childEmail, setChildEmail] = useState("");

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding student by email
    const newChild: ChildData = {
      id: Date.now().toString(),
      name: childEmail.split('@')[0],
      email: childEmail,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${childEmail}`,
      progress: Math.floor(Math.random() * 100),
      averageScore: Number((Math.random() * 5 + 5).toFixed(1)),
      rank: Math.floor(Math.random() * 100 + 1),
      lastLesson: "Đang cập nhật...",
      badges: Math.floor(Math.random() * 10)
    };
    setChildren([...children, newChild]);
    setChildEmail("");
    setShowAddChild(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Xin chào, Phụ huynh {user?.name}!</h1>
          <p className="text-slate-500 font-medium">Theo dõi và đồng hành cùng con trên con đường tri thức.</p>
        </div>
        <button 
          onClick={() => setShowAddChild(true)}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
        >
          <Plus size={20} />
          Kết nối với con
        </button>
      </header>

      {/* Children List */}
      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
          <Baby className="text-blue-600" />
          Các con của bạn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => setActiveChild(child)}
              className={`p-6 rounded-[2.5rem] border-4 transition-all text-left group ${
                activeChild?.id === child.id ? "bg-white border-blue-600 shadow-xl shadow-blue-100" : "bg-slate-50 border-transparent hover:bg-white hover:border-slate-200"
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-100 overflow-hidden border border-blue-200 shadow-sm transition-transform group-hover:scale-110">
                  <img src={child.avatar} alt={child.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{child.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{child.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiến độ tuần này</span>
                  <span className="text-sm font-black text-blue-600">{child.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${child.progress}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeChild && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-900">Chi tiết học tập - {activeChild.name}</h2>
            <button className="text-blue-600 font-bold hover:underline">Xuất báo cáo PDF</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Điểm trung bình", value: activeChild.averageScore, icon: <BarChart2 />, color: "text-blue-600 bg-blue-50" },
              { label: "Xếp hạng lớp", value: `#${activeChild.rank}`, icon: <TrendingUp />, color: "text-purple-600 bg-purple-50" },
              { label: "Bài học hoàn thành", value: "24", icon: <BookOpen />, color: "text-green-600 bg-green-50" },
              { label: "Huy hiệu", value: activeChild.badges, icon: <Award />, color: "text-yellow-600 bg-yellow-50" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-3">
                <Calendar className="text-blue-600" />
                Lịch sử học tập
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Toán học: Phân số", score: "9/10", date: "Hôm nay, 10:30" },
                  { title: "Vật lý: Lực hấp dẫn", score: "8.5/10", date: "Hôm qua, 15:45" },
                  { title: "Tiếng Anh: Vocabulary", score: "10/10", date: "2 ngày trước" },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{log.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{log.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-black">{log.score}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">Xem tất cả lịch sử</button>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               
               <div>
                 <h3 className="font-black text-xl mb-2">Đánh giá từ Giáo viên</h3>
                 <p className="text-slate-400 font-medium leading-relaxed italic">"An học rất chăm chỉ và có tiến bộ vượt bậc ở môn Toán. Cần chú ý thêm một chút về phần trình bày bài giải!"</p>
               </div>

               <div className="space-y-4">
                 <p className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em]">Lời nhắn khích lệ con</p>
                 <textarea 
                   placeholder="Nhập lời nhắn yêu thương gửi tới con..."
                   className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500 transition-all font-medium min-h-[120px] resize-none"
                 />
                 <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                   <Heart size={20} />
                   Gửi cho con
                 </button>
               </div>
            </div>
          </div>
        </motion.section>
      )}

      {!activeChild && (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200">
           <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm border border-slate-100">
             <Baby size={48} />
           </div>
           <h3 className="text-2xl font-black text-slate-900 mb-2">Hãy chọn một đứa trẻ</h3>
           <p className="text-slate-500 max-w-xs mx-auto font-medium">Bấm vào con của bạn ở trên để bắt đầu theo dõi tiến độ một cách chi tiết!</p>
        </div>
      )}

      {/* Add Child Modal */}
      <AnimatePresence>
        {showAddChild && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative"
            >
              <button onClick={() => setShowAddChild(false)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600">
                <Plus size={24} className="rotate-45" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <User size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Kết nối với con</h3>
                <p className="text-slate-500 font-medium">Nhập email con bạn đang sử dụng trên hệ thống.</p>
              </div>

              <form onSubmit={handleAddChild} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="Email của học sinh..."
                    value={childEmail}
                    onChange={(e) => setChildEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 hover:scale-[1.02] transition-all">
                  Kết nối ngay
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

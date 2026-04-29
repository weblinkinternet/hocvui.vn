import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  GraduationCap, 
  Plus, 
  BookOpen, 
  BarChart2, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Award,
  ExternalLink
} from "lucide-react";
import { UserProfile } from "../types";

interface TeacherDashboardProps {
  user: UserProfile;
}

interface StudentInClass {
  name: string;
  email: string;
  avatar: string;
  progress: number;
  lastActivity: string;
}

export default function TeacherDashboard({ user }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<'students' | 'classes' | 'stats'>('students');
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock students data
  const students: StudentInClass[] = [
    { name: "Nguyễn Văn An", email: "an@example.com", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=An", progress: 85, lastActivity: "2 giờ trước" },
    { name: "Trần Thị Bình", email: "binh@example.com", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Binh", progress: 92, lastActivity: "15 phút trước" },
    { name: "Lê Hoàng Long", email: "long@example.com", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Long", progress: 45, lastActivity: "1 ngày trước" },
    { name: "Phạm Minh Đức", email: "duc@example.com", avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Duc", progress: 78, lastActivity: "5 giờ trước" },
  ];

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Xin chào, Giáo viên {user?.name}!</h1>
          <p className="text-slate-500 font-medium">Quản lý lớp học {user?.className} và theo dõi kết quả của các học sinh.</p>
        </div>
        <div className="flex gap-4">
          <a 
            href="https://vuihoc.vn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white border-2 border-blue-100 text-blue-600 font-bold rounded-2xl shadow-sm hover:border-blue-600 transition-all flex items-center gap-2"
          >
            <ExternalLink size={18} />
            Bài giảng Vuihoc.vn
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Tổng số học sinh", value: "32", icon: <Users size={20} />, color: "text-blue-600 bg-blue-50" },
          { label: "Lớp đang dạy", value: "2", icon: <GraduationCap size={20} />, color: "text-purple-600 bg-purple-50" },
          { label: "Tỉ lệ hoàn thành", value: "78%", icon: <TrendingUp size={20} />, color: "text-green-600 bg-green-50" },
          { label: "Huy hiệu đã cấp", value: "124", icon: <Award size={20} />, color: "text-yellow-600 bg-yellow-50" },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-[2rem] w-fit mb-8 shadow-inner">
        <button 
          onClick={() => setActiveTab('students')}
          className={`px-8 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'students' ? "bg-white shadow-lg text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          Danh sách học sinh
        </button>
        <button 
          onClick={() => setActiveTab('classes')}
          className={`px-8 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'classes' ? "bg-white shadow-lg text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          Lớp học & Bài tập
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`px-8 py-3 rounded-[1.5rem] text-sm font-bold transition-all ${activeTab === 'stats' ? "bg-white shadow-lg text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
        >
          Báo cáo chi tiết
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'students' && (
          <motion.div
            key="students"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm học sinh..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                />
              </div>
              <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all">
                <Plus size={20} />
                Thêm học sinh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student, idx) => (
                <motion.div
                  key={student.email}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 overflow-hidden border border-blue-100">
                        <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{student.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.email}</p>
                      </div>
                    </div>
                    <button className="text-slate-300 hover:text-slate-600">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-400 uppercase tracking-wider">Tiến độ</span>
                        <span className="text-blue-600">{student.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${student.progress}%` }}
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock size={12} />
                        {student.lastActivity}
                      </div>
                      <button className="px-4 py-2 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'classes' && (
          <motion.div
            key="classes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-purple-50 text-purple-600 rounded-[2.5rem] flex items-center justify-center mb-6">
              <BookOpen size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Quản lý lớp học & Bài tập</h3>
            <p className="text-slate-500 max-w-sm font-medium">Tính năng đang được phát triển để giúp bạn dễ dàng giao bài và kiểm tra kiến thức!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

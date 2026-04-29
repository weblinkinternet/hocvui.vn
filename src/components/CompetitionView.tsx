import { motion } from "motion/react";
import { Trophy, Clock, Users, Star, ArrowRight, Medal, Sparkles } from "lucide-react";
import { Competition } from "../types";

const MOCK_COMPETITIONS: Competition[] = [
  { id: '1', title: 'Thách thức Toán học Tuần 2', participants: 1240, timeLeft: '2 ngày', reward: 'Huy hiệu Hiệp sĩ Toán học' },
  { id: '2', title: 'Siêu trí tuệ Tiếng Việt', participants: 850, timeLeft: '5 giờ', reward: 'Thẻ bài AI đặc biệt' },
  { id: '3', title: 'Nhà thám hiểm Lịch sử', participants: 2100, timeLeft: '14 ngày', reward: 'Cup Vàng Lịch sử' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Lê Minh Hưng', score: 2850, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung' },
  { rank: 2, name: 'Nguyễn Bích Ngọc', score: 2720, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc' },
  { rank: 3, name: 'Trần Thế Anh', score: 2600, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anh' },
  { rank: 4, name: 'Phạm Thu Hà', score: 2450, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ha' },
  { rank: 5, name: 'Đặng Quốc Bảo', score: 2310, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bao' },
];

export default function CompetitionView() {
  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-12">
      {/* Hero Banner */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            Đang diễn ra
          </div>
          <h2 className="text-4xl font-black mb-4 leading-tight">Đấu trường Tri thức<br />Mùa xuân 2026</h2>
          <p className="text-slate-400 text-lg font-medium max-w-sm mb-8">Tranh tài cùng hàng ngàn bạn học trên toàn quốc. Khẳng định đẳng cấp học tập của bạn!</p>
          <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-3xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
            THAM GIA NGAY
          </button>
        </div>
        <div className="w-full md:w-1/3 relative">
          <div className="bg-gradient-to-t from-blue-600/20 to-transparent absolute inset-0 rounded-full blur-3xl" />
          <Trophy size={200} className="text-yellow-500/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="relative p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
              <Medal className="text-yellow-500" size={32} />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Phần thưởng Top 1</p>
                <p className="font-bold text-lg">Laptop Học Tập AI</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-white/10 rounded-full">
                <div className="h-full w-3/4 bg-yellow-500 rounded-full" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Tiến trình mùa giải: 75%</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Competitions List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3 px-2">
            <Trophy className="text-yellow-600" />
            Cuộc thi sắp kết thúc
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_COMPETITIONS.map((comp) => (
              <div key={comp.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-blue-500 transition-all">
                <h4 className="font-bold text-slate-900 text-lg mb-4">{comp.title}</h4>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <Users size={16} />
                    <span>{comp.participants} người tham gia</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
                    <Clock size={16} />
                    <span>Còn {comp.timeLeft}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl mb-6">
                  <div className="flex items-center gap-2 text-slate-600 text-xs font-bold uppercase tracking-tighter">
                    <Star size={14} className="text-yellow-500" />
                    Thưởng: {comp.reward}
                  </div>
                </div>
                <button className="w-full py-3 bg-slate-900 group-hover:bg-blue-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
                  Đăng ký
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3 px-2">
            <Trophy className="text-blue-600" />
            Bảng vàng tháng 4
          </h3>
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-6 space-y-4">
              {LEADERBOARD.map((user) => (
                <div key={user.rank} className="flex items-center gap-4 group">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                    user.rank === 2 ? 'bg-slate-100 text-slate-500' :
                    user.rank === 3 ? 'bg-orange-100 text-orange-600' :
                    'text-slate-400'
                  }`}>
                    {user.rank}
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user.score} Điểm</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform shadow-lg shadow-blue-200" />
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button className="w-full py-2.5 text-blue-600 font-bold text-sm hover:underline">
                Xem tất cả xếp hạng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

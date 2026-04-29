import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldAlert, 
  RefreshCcw, 
  Users as UsersIcon, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  Settings,
  Database
} from "lucide-react";
import { UserProfile } from "../types";

interface AdminDashboardProps {
  user: UserProfile;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    setAllUsers(savedUsers);
  }, []);

  const handleResetSystem = () => {
    setIsResetting(true);
    // Keep only the current admin user
    const savedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    const adminUser = savedUsers.find((u: any) => u.email.toLowerCase() === 'sftcdpcute@gmail.com');
    
    // Clear almost everything except admin
    if (adminUser) {
      localStorage.setItem('app_users', JSON.stringify([adminUser]));
    } else {
      localStorage.setItem('app_users', JSON.stringify([user]));
    }

    // Clear posts
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('posts_')) {
        localStorage.removeItem(key);
      }
    });

    setTimeout(() => {
      setIsResetting(false);
      setShowConfirm(false);
      window.location.reload(); // Reload to apply changes
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10 text-center">
        <div className="w-20 h-20 bg-red-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-200">
          <ShieldAlert size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Hệ thống Quản trị tối cao</h1>
        <p className="text-slate-500 font-medium">Chào mừng trở lại, {user.name}. Bạn đang nắm giữ quyền kiểm soát toàn bộ hệ thống.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Statistics */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-black text-xl text-slate-900 flex items-center gap-3">
            <Database className="text-blue-600" />
            Trạng thái dữ liệu
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-500">Tổng tài khoản</span>
              <span className="text-xl font-black text-slate-900">{allUsers.length}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-500">Giáo viên</span>
              <span className="text-xl font-black text-blue-600">{allUsers.filter(u => u.role === 'teacher').length}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-500">Học sinh</span>
              <span className="text-xl font-black text-green-600">{allUsers.filter(u => u.role === 'student').length}</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 p-8 rounded-[2.5rem] border-2 border-dashed border-red-200 space-y-6">
          <h3 className="font-black text-xl text-red-600 flex items-center gap-3">
            <AlertTriangle />
            Khu vực nguy hiểm
          </h3>
          <p className="text-sm text-red-500 font-medium leading-relaxed">
            Hành động này sẽ xóa sạch tất cả học sinh, giáo viên, phụ huynh và bài đăng của họ trên toàn hệ thống. CHỈ để lại tài khoản Quản trị của bạn.
          </p>
          
          {!showConfirm ? (
            <button 
              onClick={() => setShowConfirm(true)}
              className="w-full py-5 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <RefreshCcw size={20} />
              RESET TOÀN BỘ HỆ THỐNG
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-center font-black text-red-600 text-sm animate-pulse">BẠN CÓ CHẮC CHẮN KHÔNG?</p>
              <div className="flex gap-3">
                <button 
                  onClick={handleResetSystem}
                  disabled={isResetting}
                  className="flex-[2] py-4 bg-red-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  {isResetting ? <RefreshCcw className="animate-spin" /> : <Trash2 size={18} />}
                  Xác nhận Xóa
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-4 bg-white text-slate-600 font-bold rounded-2xl border-2 border-slate-200"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User List */}
      <div className="mt-12 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-black text-xl text-slate-900 flex items-center gap-3">
            <UsersIcon className="text-blue-600" />
            Danh sách người dùng
          </h3>
          <span className="px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">Toàn cầu</span>
        </div>
        <div className="divide-y divide-slate-50">
          {allUsers.map((u, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden shadow-inner">
                  <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vai trò</p>
                  <p className={`text-xs font-bold ${
                    u.role === 'admin' ? 'text-red-600' : 
                    u.role === 'teacher' ? 'text-blue-600' : 
                    u.role === 'parent' ? 'text-purple-600' : 'text-green-600'
                  }`}>
                    {u.role.toUpperCase()}
                  </p>
                </div>
                <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "motion/react";
import { User, Mail, GraduationCap, X, Save, LogOut, Camera, Palette, Trash2 } from "lucide-react";
import { UserProfile } from "../types";

const backgrounds = [
  { name: 'Mặc định', class: 'bg-slate-50' },
  { name: 'Xanh nhạt', class: 'bg-blue-50' },
  { name: 'Tím nhạt', class: 'bg-purple-50' },
  { name: 'Hồng nhạt', class: 'bg-rose-50' },
  { name: 'Xám tối', class: 'bg-slate-900', isDark: true },
];

const systemAvatars = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Milo',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Felix',
  'https://api.dicebear.com/7.x/notionists/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Milo',
  'https://api.dicebear.com/7.x/lorelei/svg?seed=Luna',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
  'https://api.dicebear.com/7.x/big-ears/svg?seed=Leo',
  'https://api.dicebear.com/7.x/big-ears/svg?seed=Maya',
];

interface ProfileViewProps {
  user: UserProfile;
  onUpdate: (updated: UserProfile) => void;
  onLogout: () => void;
  onClose: () => void;
}

export default function ProfileView({ user, onUpdate, onLogout, onClose }: ProfileViewProps) {
  const [formData, setFormData] = useState({...user});
  const [activeTab, setActiveTab] = useState<'info' | 'avatar' | 'theme' | 'security'>('info');
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    
    // Update password if changed in storage
    if (activeTab === 'security' && passwordForm.newPassword) {
      const savedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
      const userIdx = savedUsers.findIndex((u: any) => u.email === formData.email);
      if (userIdx !== -1) {
        savedUsers[userIdx].password = passwordForm.newPassword;
        localStorage.setItem('app_users', JSON.stringify(savedUsers));
      }
    }
    
    onClose();
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }
    
    const savedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    const userInStorage = savedUsers.find((u: any) => u.email === user.email);
    
    if (userInStorage && passwordForm.oldPassword !== userInStorage.password) {
      alert("Mật khẩu cũ không chính xác!");
      return;
    }

    onUpdate({ ...user, password: passwordForm.newPassword } as any);
    
    // Explicitly update storage
    const userIdx = savedUsers.findIndex((u: any) => u.email === user.email);
    if (userIdx !== -1) {
      savedUsers[userIdx].password = passwordForm.newPassword;
      localStorage.setItem('app_users', JSON.stringify(savedUsers));
    }
    
    alert("Đổi mật khẩu thành công!");
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    const savedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    const filteredUsers = savedUsers.filter((u: any) => u.email !== user.email);
    localStorage.setItem('app_users', JSON.stringify(filteredUsers));
    onLogout();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
      >
        <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-8 inline-block">
            <div className="w-24 h-24 rounded-[2rem] bg-white p-1 border-4 border-white shadow-lg overflow-hidden">
              <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-6">Cài đặt tài khoản</h2>

          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'info' ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
            >
              Thông tin
            </button>
            <button 
              onClick={() => setActiveTab('avatar')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'avatar' ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
            >
              Avatar
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'security' ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
            >
              Bảo mật
            </button>
          </div>

          <div className="max-h-[380px] overflow-y-auto pr-2">
            {activeTab === 'info' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-transparent text-slate-500 rounded-xl outline-none font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Lớp học</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      value={formData.className}
                      onChange={e => setFormData({...formData, className: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 active:scale-95"
                  >
                    <Save size={18} />
                    Lưu
                  </button>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <LogOut size={18} />
                    Đăng xuất
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'avatar' && (
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-3">
                  {systemAvatars.map((avUrl) => (
                    <button
                      key={avUrl}
                      onClick={() => setFormData({...formData, avatar: avUrl})}
                      className={`relative p-1 rounded-2xl border-4 transition-all ${
                        formData.avatar === avUrl ? "border-blue-500 bg-blue-50" : "border-transparent hover:bg-slate-50"
                      }`}
                    >
                      <img src={avUrl} alt="Avatar option" className="w-full h-full rounded-xl" />
                      {formData.avatar === avUrl && (
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1 rounded-full shadow-lg">
                          <Save size={12} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleSubmit}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100"
                >
                  Xác nhận thay đổi Avatar
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Mật khẩu cũ</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.oldPassword}
                      onChange={e => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Mật khẩu mới</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100"
                  >
                    Đổi mật khẩu
                  </button>
                </form>

                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-red-600 mb-2 uppercase tracking-widest">Khu vực nguy hiểm</h4>
                  <p className="text-xs text-slate-500 mb-4 font-medium">Việc xóa tài khoản sẽ xóa tất cả dữ liệu học tập và không thể khôi phục.</p>
                  
                  {showDeleteConfirm ? (
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-slate-900 border-l-4 border-red-500 pl-3">Bạn có chắc chắn muốn xóa tài khoản này không?</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleDeleteAccount}
                          className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-100"
                        >
                          Có, Xóa ngay
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(false)}
                          className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full py-4 border-2 border-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Xóa tài khoản vĩnh viễn
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

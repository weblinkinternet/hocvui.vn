import { useState } from "react";
import { motion } from "motion/react";
import { LogIn, UserPlus, Mail, User, GraduationCap, ArrowRight, BookOpen, Lock, ShieldCheck, Baby, Heart } from "lucide-react";
import { UserProfile, AuthMode } from "../types";

interface AuthViewProps {
  onAuthSuccess: (user: UserProfile) => void;
}

export default function AuthView({ onAuthSuccess }: AuthViewProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    className: '',
    role: 'student' as 'student' | 'teacher' | 'parent' | 'user',
    gender: 'male' as 'male' | 'female' | 'other'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Simple backend simulation using localStorage
    const savedUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    
    if (mode === 'login') {
      // Special check for Admin
      if (formData.email.toLowerCase() === 'sftcdpcute@gmail.com' && formData.password === '1530970') {
        const adminUser: UserProfile = {
          name: 'Quản trị viên',
          email: 'sftcdpcute@gmail.com',
          role: 'admin',
          className: 'Hệ thống',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=Admin&backgroundColor=f87171`,
          gender: 'other',
          background: 'bg-slate-900'
        };
        onAuthSuccess(adminUser);
        return;
      }

      const user = savedUsers.find((u: any) => u.email === formData.email);
      if (!user) {
        setError('Email không tồn tại. Vui lòng đăng ký!');
        return;
      }
      if (user.password !== formData.password) {
        setError('Mật khẩu không chính xác!');
        return;
      }
      
      // If a normal user logs in with the admin email (unlikely if password is correct above), promote them locally
      if (user.email.toLowerCase() === 'sftcdpcute@gmail.com') {
        onAuthSuccess({ ...user, role: 'admin' });
      } else {
        onAuthSuccess(user);
      }
    } else {
      if (savedUsers.some((u: any) => u.email === formData.email)) {
        setError('Email này đã được sử dụng!');
        return;
      }
      
      const randomSeed = Math.random().toString(36).substring(7);
      const newUser: UserProfile & { password: string } = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        className: formData.className || "5A1",
        role: formData.role,
        gender: formData.gender,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${randomSeed}`,
        background: 'bg-slate-50',
        childEmails: formData.role === 'parent' ? [] : undefined,
        managedClasses: formData.role === 'teacher' ? [formData.className || "5A1"] : undefined
      };
      
      localStorage.setItem('app_users', JSON.stringify([...savedUsers, newUser]));
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg bg-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden my-8"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-200">
            <BookOpen size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {mode === 'login' ? 'Chào mừng trở lại!' : 'Bắt đầu hành trình'}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Học tập đỉnh cao cùng AI</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Bạn là ai?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'student', label: 'Học sinh', icon: <User size={14} /> },
                    { id: 'teacher', label: 'Giáo viên', icon: <ShieldCheck size={14} /> },
                    { id: 'parent', label: 'Phụ huynh', icon: <Baby size={14} /> },
                    { id: 'user', label: 'Người dùng', icon: <User size={14} /> }
                  ].map(role => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setFormData({...formData, role: role.id as any})}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all font-bold text-xs ${
                        formData.role === role.id ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "border-slate-100 text-slate-500 hover:border-slate-200"
                      }`}
                    >
                      {role.icon}
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Giới tính</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, gender: 'male'})}
                    className={`p-3 rounded-2xl border-2 transition-all font-bold text-xs ${
                      formData.gender === 'male' ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    Nam
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, gender: 'female'})}
                    className={`p-3 rounded-2xl border-2 transition-all font-bold text-xs ${
                      formData.gender === 'female' ? "bg-pink-600 border-pink-600 text-white shadow-lg" : "border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    Nữ
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, gender: 'other'})}
                    className={`p-3 rounded-2xl border-2 transition-all font-bold text-xs ${
                      formData.gender === 'other' ? "bg-slate-800 border-slate-800 text-white shadow-lg" : "border-slate-100 text-slate-500 hover:border-slate-200"
                    }`}
                  >
                    Khác
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="text"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              required
              type="email"
              placeholder="Địa chỉ Email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              required
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
            />
          </div>

          {mode === 'register' && formData.role !== 'parent' && formData.role !== 'user' && (
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="text"
                placeholder={formData.role === 'teacher' ? "Lớp quản lý (Ví dụ: 5A1)" : "Lớp học (Ví dụ: 5A1)"}
                value={formData.className}
                onChange={e => setFormData({...formData, className: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all active:scale-[0.98] group mt-6"
          >
            {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            {mode === 'login' ? (
              <>Chưa có tài khoản? <span className="text-blue-600">Đăng ký ngay</span></>
            ) : (
              <>Đã có tài khoản? <span className="text-blue-600">Đăng nhập</span></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

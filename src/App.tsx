/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TheoryView from "./components/TheoryView";
import ExerciseView from "./components/ExerciseView";
import GeminiTutor from "./components/GeminiTutor";
import AuthView from "./components/AuthView";
import ProfileView from "./components/ProfileView";
import HomeView from "./components/HomeView";
import SocialView from "./components/SocialView";
import CompetitionView from "./components/CompetitionView";
import MyProfileView from "./components/MyProfileView";
import ParentDashboard from "./components/ParentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import SuperDashboard from "./components/SuperDashboard";
import { lessons, Lesson, getRandomQuiz } from "./data/lessons";
import { UserProfile } from "./types";
import { BookMarked, GraduationCap, Menu, X, Sparkles, Settings, BookOpen, Home, Trophy, Users, User as UserIcon, ShieldCheck, Baby, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

 export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
  const [view, setView] = useState<"theory" | "exercises" | "social" | "competition" | "profile" | "teacher_dashboard" | "parent_dashboard" | "admin_dashboard" | "super_dashboard">("theory");
  const [isHome, setIsHome] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (user && isHome) {
      if (user.role === 'admin') setView("admin_dashboard");
      else if (user.role === 'user') setView("super_dashboard");
      else if (user.role === 'teacher') setView("teacher_dashboard");
      else if (user.role === 'parent') setView("parent_dashboard");
    }
  }, [user, isHome]);

  const handleAuthSuccess = (userData: UserProfile) => {
    const updatedUser = { ...userData, role: userData.role || 'student' };
    setUser(updatedUser);
    localStorage.setItem('user_profile', JSON.stringify(updatedUser));
    setIsHome(true);
    if (updatedUser.role === 'admin') setView("admin_dashboard");
    else if (updatedUser.role === 'user') setView("super_dashboard");
    else if (updatedUser.role === 'teacher') setView("teacher_dashboard");
    else if (updatedUser.role === 'parent') setView("parent_dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user_profile');
    setIsProfileOpen(false);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUser(updated);
    localStorage.setItem('user_profile', JSON.stringify(updated));
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setIsHome(false);
    setIsSidebarOpen(false);
    setView(lesson.id === "kiem-tra-tong-hop" ? "exercises" : "theory");
  };

  const handleGoHome = () => {
    setIsHome(true);
    if (user?.role === 'admin') setView("admin_dashboard");
    else if (user?.role === 'user') setView("super_dashboard");
    else if (user?.role === 'teacher') setView("teacher_dashboard");
    else if (user?.role === 'parent') setView("parent_dashboard");
    else setView("theory");
    setIsSidebarOpen(false);
  };

  const handleGoSocial = () => {
    setView("social");
    setIsHome(false);
    setIsSidebarOpen(false);
  };

  const handleGoCompetition = () => {
    setView("competition");
    setIsHome(false);
    setIsSidebarOpen(false);
  };

  const handleGoProfile = () => {
    setView("profile");
    setIsHome(false);
    setIsSidebarOpen(false);
  };

  return (
    <div className={`flex h-screen font-sans text-slate-900 overflow-hidden transition-colors duration-500 ${user?.background || 'bg-slate-50'}`}>
      {/* Auth Guard */}
      {!user && <AuthView onAuthSuccess={handleAuthSuccess} />}

      {/* Profile/Settings Modal */}
      <AnimatePresence>
        {user && isProfileOpen && (
          <ProfileView 
            user={user} 
            onUpdate={handleUpdateProfile} 
            onLogout={handleLogout} 
            onClose={() => setIsProfileOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none`}>
        <Sidebar 
          activeLessonId={isHome ? "home" : (view === "social" ? "social" : (view === "competition" ? "competition" : (view === "profile" ? "profile" : (view === "teacher_dashboard" || view === "parent_dashboard" || view === "admin_dashboard" || view === "super_dashboard" ? "home" : activeLesson.id))))} 
          onSelectLesson={handleSelectLesson}
          onGoHome={handleGoHome}
          onGoSocial={handleGoSocial}
          onGoCompetition={handleGoCompetition}
          onGoProfile={handleGoProfile}
          user={user}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={handleGoHome}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  isHome ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Home size={16} />
                <span className="hidden sm:inline">Trang chủ</span>
              </button>
              <button
                onClick={handleGoSocial}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  view === "social" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Users size={16} />
                <span className="hidden sm:inline">Bạn bè</span>
              </button>
              <button
                onClick={handleGoCompetition}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  view === "competition" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Trophy size={16} />
                <span className="hidden sm:inline">Cuộc thi</span>
              </button>
              <button
                onClick={handleGoProfile}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  view === "profile" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <UserIcon size={16} />
                <span className="hidden sm:inline">Trang cá nhân</span>
              </button>
              {!isHome && view !== "social" && view !== "competition" && view !== "profile" && (
                <>
                  <button
                    onClick={() => setView("theory")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      view === "theory" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <BookMarked size={16} />
                    Lý thuyết
                  </button>
                  <button
                    onClick={() => setView("exercises")}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      view === "exercises" ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <GraduationCap size={16} />
                    Luyện tập
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsAIOpen(!isAIOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isAIOpen ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              <Sparkles size={16} />
              <span className="hidden sm:inline">Hỏi Gia sư AI</span>
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isHome ? "home" : (view === "social" ? "social" : (view === "competition" ? "competition" : (view === "profile" ? "profile" : `${activeLesson.id}-${view}`)))}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {isHome ? (
                (user?.role === 'student' || !user?.role) ? (
                  <HomeView 
                    user={user!} 
                    onSelectLesson={handleSelectLesson} 
                    onStartQuiz={() => handleSelectLesson(getRandomQuiz())} 
                  />
                ) : user?.role === 'user' ? (
                  <SuperDashboard user={user!} onSelectLesson={handleSelectLesson} />
                ) : user?.role === 'admin' ? (
                  <AdminDashboard user={user} />
                ) : user?.role === 'teacher' ? (
                  <TeacherDashboard user={user} />
                ) : (
                  <ParentDashboard user={user} />
                )
              ) : view === "social" ? (
                <SocialView />
              ) : view === "competition" ? (
                <CompetitionView />
              ) : view === "profile" ? (
                user && <MyProfileView user={user} />
              ) : view === "admin_dashboard" ? (
                user && <AdminDashboard user={user} />
              ) : view === "super_dashboard" ? (
                user && <SuperDashboard user={user} onSelectLesson={handleSelectLesson} />
              ) : view === "teacher_dashboard" ? (
                user && <TeacherDashboard user={user} />
              ) : view === "parent_dashboard" ? (
                user && <ParentDashboard user={user} />
              ) : view === "theory" ? (
                <TheoryView lesson={activeLesson} />
              ) : (
                <ExerciseView lesson={activeLesson} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* AI Tutor Sidebar (Collapsible) */}
      <AnimatePresence>
        {isAIOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 lg:relative lg:translate-x-0 w-full sm:w-80 lg:w-96 shrink-0 shadow-2xl lg:shadow-none"
          >
            <div className="absolute top-4 left-4 z-50 lg:hidden">
              <button 
                onClick={() => setIsAIOpen(false)}
                className="p-2 bg-white rounded-full shadow-md text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            <GeminiTutor currentLesson={activeLesson.title} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Logo Watermark */}
      <div className="fixed bottom-6 right-6 z-[60] pointer-events-none select-none opacity-20 group hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200">
          <BookOpen className="text-blue-600" size={16} />
          <span className="text-xs font-black text-slate-900 tracking-tighter uppercase whitespace-nowrap">
            HocTotLop5.vn
          </span>
        </div>
      </div>
    </div>
  );
}


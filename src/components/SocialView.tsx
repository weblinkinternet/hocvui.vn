import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, MessageSquare, Search, Send, X, Circle, MoreVertical, UserPlus, GraduationCap, Calendar, Star, ChevronLeft } from "lucide-react";
import { Friend, Message } from "../types";

const MOCK_FRIENDS: Friend[] = [
  { id: '1', name: 'Nguyễn Văn An', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=An', status: 'online', className: '5A1' },
  { id: '2', name: 'Trần Thị Bình', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Binh', status: 'offline', className: '5A2' },
  { id: '3', name: 'Lê Hoàng Long', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Long', status: 'online', className: '5A1' },
  { id: '4', name: 'Phạm Minh Đức', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Duc', status: 'offline', className: '5A3' },
];

export default function SocialView() {
  const [activeTab, setActiveTab] = useState<'friends' | 'chat' | 'profile'>('friends');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, selectedFriend, activeTab]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedFriend) return;

    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: Date.now()
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedFriend.id]: [...(prev[selectedFriend.id] || []), msg]
    }));
    setNewMessage("");

    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedFriend.id,
        content: `Chào bạn! Mình là ${selectedFriend.name}. Chúc bạn học tốt!`,
        timestamp: Date.now()
      };
      setChatMessages(prev => ({
        ...prev,
        [selectedFriend.id]: [...(prev[selectedFriend.id] || []), reply]
      }));
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 flex overflow-hidden">
      {/* Sidebar Social */}
      <div className="w-80 border-r border-slate-100 flex flex-col h-full bg-slate-50/30 shrink-0">
        <div className="p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-900">Mạng xã hội</h2>
            <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
              <UserPlus size={18} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Tìm bạn học..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {MOCK_FRIENDS.map((friend) => (
            <button
              key={friend.id}
              onClick={() => {
                setSelectedFriend(friend);
                setActiveTab('chat');
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                selectedFriend?.id === friend.id ? "bg-white shadow-lg border border-slate-100 ring-4 ring-blue-500/5" : "hover:bg-white/50"
              }`}
            >
              <div className="relative" onClick={(e) => {
                e.stopPropagation();
                setSelectedFriend(friend);
                setActiveTab('profile');
              }}>
                <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${friend.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-slate-900 text-sm truncate">{friend.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lớp {friend.className}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeTab === 'chat' && selectedFriend ? (
          <>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="w-10 h-10 rounded-lg bg-blue-50 overflow-hidden border border-blue-100"
                >
                  <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-full h-full object-cover" />
                </button>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedFriend.name}</h3>
                  <div className="flex items-center gap-1">
                    <Circle size={8} className={selectedFriend.status === 'online' ? "fill-green-500 text-green-500" : "fill-slate-300 text-slate-300"} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {selectedFriend.status === 'online' ? 'Đang hoạt động' : 'Ngoại tuyến'}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
              {(chatMessages[selectedFriend.id] || []).map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-4 rounded-3xl shadow-sm ${
                    msg.senderId === 'me' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                    <p className={`text-[10px] mt-1 opacity-60 font-bold ${msg.senderId === 'me' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {(!chatMessages[selectedFriend.id] || chatMessages[selectedFriend.id].length === 0) && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <p className="font-bold uppercase tracking-widest text-[10px]">Chào mừng bạn đến với cuộc trò chuyện</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Gửi tin nhắn..."
                  className="flex-1 px-5 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : activeTab === 'profile' && selectedFriend ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
              <button 
                onClick={() => setActiveTab('friends')}
                className="absolute top-6 left-6 p-3 bg-white/20 hover:bg-white/30 text-white rounded-2xl backdrop-blur-md transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            
            <div className="px-10 pb-10">
              <div className="relative -mt-16 mb-8 flex items-end gap-6">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1 border-8 border-white shadow-2xl overflow-hidden aspect-square">
                  <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-full h-full object-cover" />
                </div>
                <div className="pb-4">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selectedFriend.name}</h3>
                  <p className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg inline-block">Học sinh giỏi Lớp {selectedFriend.className}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2 text-slate-400">
                    <Calendar size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Tham gia từ</span>
                  </div>
                  <p className="font-bold text-slate-800">Tháng 01, 2026</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2 text-slate-400">
                    <Star size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Xếp hạng</span>
                  </div>
                  <p className="font-bold text-slate-800">Bạch kim (Top 5%)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-lg">Thành tích nổi bật</h4>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600 border-2 border-yellow-200">
                    <Star size={24} />
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 border-2 border-blue-200">
                    <GraduationCap size={24} />
                  </div>
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 border-2 border-purple-200">
                    <Users size={24} />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button 
                  onClick={() => setActiveTab('chat')}
                  className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-[1.25rem] shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <MessageSquare size={20} />
                  Gửi tin nhắn
                </button>
                <button className="flex-1 py-4 bg-slate-900 text-white font-bold rounded-[1.25rem] shadow-xl shadow-slate-200 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                  <UserPlus size={20} />
                  Kết bạn
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-blue-50 ring-4 ring-white">
              <Users size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Trung tâm kết nối</h3>
            <p className="text-slate-400 max-w-xs font-medium leading-relaxed">Chọn một người bạn từ danh sách bên trái để bắt đầu trao đổi kiến thức hoặc xem hồ sơ cá nhân!</p>
          </div>
        )}
      </div>
    </div>
  );
}

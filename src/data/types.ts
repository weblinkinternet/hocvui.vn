export interface UserProfile {
  name: string;
  email: string;
  password?: string;
  className: string;
  avatar: string;
  background?: string;
  gender: 'male' | 'female' | 'other';
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'user';
  isAdmin?: boolean;
  childEmails?: string[]; 
  managedClasses?: string[];
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  className: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
}

export interface Competition {
  id: string;
  title: string;
  participants: number;
  timeLeft: string;
  reward: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: number;
  likes: number;
  comments: number;
}

export type AuthMode = 'login' | 'register';

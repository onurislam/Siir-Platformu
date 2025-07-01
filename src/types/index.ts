export interface User {
  id: string;
  username: string;
  displayName: string;
  bio?: string;
  createdAt: Date;
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  author: User;
  poemId: string;
  createdAt: Date;
}

export interface Poem {
  id: string;
  content: string;
  userId: string;
  author: User;
  likes: string[];
  comments?: Comment[];
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
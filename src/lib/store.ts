import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { AuthState, Comment, Poem, User } from '@/types';

// Auth Store
export const useAuthStore = create<AuthState & {
  login: (username: string, password: string) => boolean;
  register: (username: string, displayName: string, password: string) => boolean;
  logout: () => void;
}>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (username: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: User & { password: string }) => 
          u.username === username && u.password === password
        );
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: (username: string, displayName: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if username already exists
        if (users.some((u: User) => u.username === username)) {
          return false;
        }

        const newUser = {
          id: uuidv4(),
          username,
          displayName,
          password,
          bio: '',
          createdAt: new Date(),
          avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}`,
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Poems Store
export const usePoemStore = create<{
  poems: Poem[];
  addPoem: (content: string) => void;
  likePoem: (poemId: string) => void;
  getUserPoems: (userId: string) => Poem[];
  addComment: (poemId: string, content: string) => void;
  getComments: (poemId: string) => Comment[];
  getTrendingPoems: () => Poem[];
}>()(
  persist(
    (set, get) => ({
      poems: [],
      
      addPoem: (content: string) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        const newPoem = {
          id: uuidv4(),
          content,
          userId: user.id,
          author: user,
          likes: [],
          comments: [],
          createdAt: new Date(),
        };
        
        set(state => ({
          poems: [newPoem, ...state.poems]
        }));
      },
      
      likePoem: (poemId: string) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        set(state => ({
          poems: state.poems.map(poem => {
            if (poem.id === poemId) {
              const userLiked = poem.likes.includes(user.id);
              if (userLiked) {
                return {
                  ...poem,
                  likes: poem.likes.filter(id => id !== user.id)
                };
              } else {
                return {
                  ...poem,
                  likes: [...poem.likes, user.id]
                };
              }
            }
            return poem;
          })
        }));
      },
      
      getUserPoems: (userId: string) => {
        return get().poems.filter(poem => poem.userId === userId);
      },

      addComment: (poemId: string, content: string) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        const newComment: Comment = {
          id: uuidv4(),
          content,
          userId: user.id,
          author: user,
          poemId,
          createdAt: new Date(),
        };

        set(state => ({
          poems: state.poems.map(poem => {
            if (poem.id === poemId) {
              return {
                ...poem,
                comments: [...(poem.comments || []), newComment]
              };
            }
            return poem;
          })
        }));
      },
      
      getComments: (poemId: string) => {
        const poem = get().poems.find(p => p.id === poemId);
        return poem?.comments || [];
      },

      getTrendingPoems: () => {
        // Return poems sorted by number of likes
        return [...get().poems].sort((a, b) => b.likes.length - a.likes.length);
      }
    }),
    {
      name: 'poems-storage',
    }
  )
);
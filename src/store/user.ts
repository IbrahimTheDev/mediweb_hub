import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

type User = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role?: string;
  // New fields
  registration_completed?: boolean;
  specialty?: string;
  hospital_name?: string;
};

type UserState = {
  user: User | null;
  avatar: string | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  avatar: null,
  isLoading: true,

  fetchUser: async () => {
    set({ isLoading: true });
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
        set({ user: null, isLoading: false });
        return;
    }

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (profile && !error) {
        set({
            user: {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                mobile: profile.mobile || "",
                role: profile.role,
                registration_completed: profile.registration_completed,
                specialty: profile.specialty,
                hospital_name: profile.hospital_name
            },
            avatar: profile.image_url || null,
        });
    }
    set({ isLoading: false });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, avatar: null });
  }
}));
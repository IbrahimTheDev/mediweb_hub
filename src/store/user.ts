
import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  mobile: string;
};

type UserState = {
  user: User;
  avatar: string | null;
  userType: 'patient' | 'doctor';
  setUser: (user: Partial<User>) => void;
  setAvatar: (avatar: string | null) => void;
  setUserType: (userType: 'patient' | 'doctor') => void;
};

const initialPatient: User = {
  id: "P00123",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  mobile: "+1 234 567 890",
};

const initialDoctor: User = {
    id: "D0C456",
    name: "Dr. Ben Adams",
    email: "b.adams@mediweb.com",
    mobile: "+1 987 654 3210"
};

export const useUserStore = create<UserState>((set, get) => ({
  user: initialPatient,
  avatar: null,
  userType: 'patient',
  setUser: (newUser) => set((state) => ({ user: { ...state.user, ...newUser } })),
  setAvatar: (avatar) => set({ avatar }),
  setUserType: (userType) => {
    if (get().userType !== userType) {
        set({ 
            userType, 
            user: userType === 'patient' ? initialPatient : initialDoctor,
            avatar: null,
        });
    }
  },
}));

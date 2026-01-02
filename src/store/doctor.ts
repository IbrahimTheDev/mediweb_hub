
"use client";

import { create } from 'zustand';

export type DoctorProfile = { 
    name: string;
    specialty: string;
    experience: string;
    availability: string;
    imageUrl: string | null;
};

type DoctorState = {
  doctors: DoctorProfile[];
  addDoctor: (doctor: DoctorProfile) => void;
};

const initialDoctors: DoctorProfile[] = [
    { name: "Dr. Emily Carter", specialty: "Cardiologist", imageUrl: "https://images.unsplash.com/photo-1550831107-1553da8c8464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxkb2N0b3IlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjcwMzUxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080", experience: "12+ years", availability: "Mon - Fri, 9am - 5pm" },
    { name: "Dr. Ben Adams", specialty: "Neurologist", imageUrl: "https://images.unsplash.com/photo-1758691463610-3c2ecf5fb3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxkb2N0b3IlMjBzbWlsaW5nfGVufDB8fHx8MTc2NzA3NDYzMHww&ixlib=rb-4.1.0&q=80&w=1080", experience: "15+ years", availability: "Tue - Sat, 10am - 6pm" },
    { name: "Dr. Olivia Chen", specialty: "Pediatrician", imageUrl: "https://images.unsplash.com/photo-1683348858658-7c6b0eff2a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxmZW1hbGUlMjBkb2N0b3J8ZW58MHx8fHwxNzY3MTE1NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080", experience: "8+ years", availability: "Mon, Wed, Fri, 8am - 4pm" },
    { name: "Dr. James William", specialty: "Orthopedist", imageUrl: "https://images.unsplash.com/photo-1637059824899-a441006a6875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtYWxlJTIwZG9jdG9yfGVufDB8fHx8MTc2NzA3MzUwMnww&ixlib=rb-4.1.0&q=80&w=1080", experience: "9+ years", availability: "Mon - Thu, 8am - 5pm" },
];


export const useDoctorStore = create<DoctorState>((set, get) => ({
  doctors: initialDoctors,
  addDoctor: (doctor) => {
    set((state) => ({
      doctors: [doctor, ...state.doctors],
    }));
  },
}));

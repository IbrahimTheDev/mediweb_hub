
"use client";

import { create } from 'zustand';

export type Appointment = {
    id: string;
    service: string;
    doctor: string;
    date: string;
    time: string;
    notes: string;
};

type AppointmentState = {
  appointment: Appointment | null;
  setAppointment: (appointment: Appointment) => void;
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointment: null,
  setAppointment: (appointment) => set({ appointment }),
}));

    
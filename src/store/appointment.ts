"use client";

import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export type AppointmentStatus = "Pending" | "Accepted" | "Rejected" | "Reschedule_Requested" | "Completed" | "Arrived";

export type Appointment = {
    id: string;
    patientId: string;
    patientName?: string; // Joined field
    doctorId: string;
    doctorName?: string; // Joined field
    service: string;
    date: string;
    time: string;
    reason: string;
    notes: string;
    status: AppointmentStatus;
};

type AppointmentState = {
  appointments: Appointment[];
  isLoading: boolean;
  fetchAppointments: (userId: string, role: 'patient' | 'doctor') => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'patientName' | 'doctorName'>) => Promise<void>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  subscribeToAppointments: (userId: string, role: 'patient' | 'doctor') => void;
};

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  isLoading: false,

  fetchAppointments: async (userId, role) => {
    set({ isLoading: true });
    
    // Doctors see appointments where they are the doctor; Patients see where they are the patient
    const column = role === 'doctor' ? 'doctor_id' : 'patient_id';

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:profiles!patient_id(name),
        doctor:profiles!doctor_id(name)
      `)
      .eq(column, userId)
      .order('date', { ascending: true });

    if (!error && data) {
      const formatted: Appointment[] = data.map((item: any) => ({
        id: item.id,
        patientId: item.patient_id,
        patientName: item.patient?.name || 'Unknown',
        doctorId: item.doctor_id,
        doctorName: item.doctor?.name || 'Unknown',
        service: item.service,
        date: item.date,
        time: item.time,
        reason: item.reason,
        notes: item.notes,
        status: item.status,
      }));
      set({ appointments: formatted });
    }
    set({ isLoading: false });
  },

  addAppointment: async (appointment) => {
    // Convert camelCase to snake_case for DB
    const dbPayload = {
        patient_id: appointment.patientId,
        doctor_id: appointment.doctorId,
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
        reason: appointment.reason,
        notes: appointment.notes,
        status: 'Pending'
    };

    const { error } = await supabase
        .from('appointments')
        .insert([dbPayload]);
    
    if (error) console.error("Error adding appointment:", error);
    // No need to manually update state if subscription is active, but can do so for optimism
  },

  updateAppointmentStatus: async (id, status) => {
    // Optimistic update
    set((state) => ({
        appointments: state.appointments.map(a => a.id === id ? { ...a, status } : a)
    }));

    await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
  },

  subscribeToAppointments: (userId, role) => {
    const column = role === 'doctor' ? 'doctor_id' : 'patient_id';
    
    supabase
      .channel('realtime-appointments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `${column}=eq.${userId}`
        },
        () => {
          // Re-fetch when any change happens
          get().fetchAppointments(userId, role);
        }
      )
      .subscribe();
  }
}));
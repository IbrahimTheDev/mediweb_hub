
"use client";

import { create } from 'zustand';

export type AppointmentStatus = "Pending" | "Accepted" | "Rejected" | "Reschedule_Requested" | "Completed" | "Arrived";

export type Appointment = {
    id: string;
    patient: string;
    patientId: string;
    service: string;
    doctor: string;
    date: string;
    time: string;
    reason: string;
    notes: string;
    status: AppointmentStatus;
};

type AppointmentState = {
  appointments: Appointment[];
  setAppointment: (appointment: Omit<Appointment, 'status' | 'id' | 'patient' | 'patientId'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
};

const initialAppointments: Appointment[] = [
  { id: "apt-001", date: "2024-08-15", time: "10:00 AM", doctor: "Dr. Emily Carter", reason: "Cardiology Check-up", status: "Accepted", patient: "Jane Doe", patientId: "P00123", service: "Cardiology", notes: "" },
  { id: "apt-002", date: "2024-09-02", time: "02:30 PM", doctor: "Dr. Ben Adams", reason: "Neurology Consultation", status: "Accepted", patient: "Jane Doe", patientId: "P00123", service: "Neurology", notes: "" },
  { id: "apt-003", date: "2024-07-10", time: "09:00 AM", doctor: "Dr. Olivia Chen", reason: "Pediatric Follow-up", status: "Completed", patient: "Jane Doe", patientId: "P00123", service: "Pediatrics", notes: "" },
  { id: "apt-004", date: "2024-09-20", time: "11:00 AM", doctor: "Dr. Emily Carter", reason: "Annual Physical Exam", status: "Pending", patient: "John Smith", patientId: "P001", service: "Primary Care", notes: "Feeling tired lately." },
];

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: initialAppointments,
  setAppointment: (appointment) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      status: 'Pending',
      patient: "Jane Doe", // assuming logged in user
      patientId: "P00123",
      reason: appointment.notes || 'Not specified',
    };
    set((state) => ({
      appointments: [newAppointment, ...state.appointments]
    }));
  },
  updateAppointmentStatus: (id, status) => {
    set((state) => ({
        appointments: state.appointments.map(appt => 
            appt.id === id ? { ...appt, status } : appt
        )
    }));
  }
}));

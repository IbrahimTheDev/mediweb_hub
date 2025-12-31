
"use client";

import { create } from 'zustand';

export type Prescription = { 
    id: string; 
    patient: string; 
    patientId: string;
    medications: {
        medication: string;
        dosage: string;
        frequency: string;
        quantity: string;
    }[];
    notes: string;
    date: string;
    doctor: string;
};

type PrescriptionState = {
  prescriptions: Prescription[];
  addPrescription: (prescription: Omit<Prescription, 'id' | 'date' | 'doctor'>) => void;
};

const initialPrescriptions: Prescription[] = [
    { 
        id: "PRES-001", 
        patient: "John Smith", 
        patientId: "P001",
        medications: [{ medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", quantity: "30" }],
        notes: "Take with food.",
        date: "2024-08-01",
        doctor: "Dr. Ben Adams"
    },
    { 
        id: "PRES-002", 
        patient: "Sarah Lee", 
        patientId: "P002",
        medications: [{ medication: "Sumatriptan", dosage: "50mg", frequency: "As needed for migraine", quantity: "9" }],
        notes: "Do not exceed 2 doses in 24 hours.",
        date: "2024-07-22",
        doctor: "Dr. Ben Adams"
    },
    { 
        id: "PRES-003", 
        patient: "Michael Johnson",
        patientId: "P003",
        medications: [{ medication: "Metformin", dosage: "500mg", frequency: "Twice daily with meals", quantity: "60" }],
        notes: "",
        date: "2024-06-15",
        doctor: "Dr. Ben Adams"
    },
    { 
        id: "PRES-004", 
        patient: "Jessica Brown", 
        patientId: "P004",
        medications: [{ medication: "Albuterol", dosage: "90mcg/actuation", frequency: "2 puffs every 4-6 hours as needed", quantity: "1" }],
        notes: "Use for shortness of breath.",
        date: "2024-08-10",
        doctor: "Dr. Ben Adams"
    },
];

export const usePrescriptionStore = create<PrescriptionState>((set, get) => ({
  prescriptions: initialPrescriptions,
  addPrescription: (prescription) => {
    const newId = `PRES-${(get().prescriptions.length + 1).toString().padStart(3, '0')}`;
    const newPrescription: Prescription = {
      ...prescription,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      doctor: "Dr. Ben Adams", // Assuming the logged-in doctor
    };
    set((state) => ({
      prescriptions: [newPrescription, ...state.prescriptions],
    }));
  },
}));

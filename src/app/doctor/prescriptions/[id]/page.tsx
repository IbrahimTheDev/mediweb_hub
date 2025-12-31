
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const prescriptionDetails = {
    "PRES-001": { 
        id: "PRES-001", 
        patient: "John Smith", 
        patientId: "P001",
        medication: "Lisinopril", 
        dosage: "10mg",
        frequency: "Once daily",
        quantity: 30,
        notes: "Take with food.",
        date: "2024-08-01" 
    },
    "PRES-002": { 
        id: "PRES-002", 
        patient: "Sarah Lee", 
        patientId: "P002",
        medication: "Sumatriptan", 
        dosage: "50mg",
        frequency: "As needed for migraine",
        quantity: 9,
        notes: "Do not exceed 2 doses in 24 hours.",
        date: "2024-07-22" 
    },
    "PRES-003": { 
        id: "PRES-003", 
        patient: "Michael Johnson",
        patientId: "P003",
        medication: "Metformin", 
        dosage: "500mg",
        frequency: "Twice daily with meals",
        quantity: 60,
        notes: "",
        date: "2024-06-15" 
    },
    "PRES-004": { 
        id: "PRES-004", 
        patient: "Jessica Brown", 
        patientId: "P004",
        medication: "Albuterol", 
        dosage: "90mcg/actuation",
        frequency: "2 puffs every 4-6 hours as needed",
        quantity: 1,
        notes: "Use for shortness of breath.",
        date: "2024-08-10" 
    },
};


export default function PrescriptionDetailsPage({ params }: { params: { id: string } }) {
  const details = prescriptionDetails[params.id as keyof typeof prescriptionDetails];

  if (!details) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Prescription Not Found</CardTitle>
                <CardDescription>The requested prescription could not be found.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" asChild>
                    <Link href="/doctor/prescriptions">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Prescriptions
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Prescription Details</CardTitle>
                <CardDescription>ID: {details.id}</CardDescription>
            </div>
            <Button variant="outline" asChild>
                <Link href="/doctor/prescriptions">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <h3 className="font-semibold font-headline">Patient Information</h3>
            <p className="text-muted-foreground">Name: <Link href={`/doctor/patient-chart/${details.patientId}`} className="text-primary underline">{details.patient}</Link></p>
            <p className="text-muted-foreground">ID: {details.patientId}</p>
        </div>
        <Separator />
         <div className="space-y-2">
            <h3 className="font-semibold font-headline">Medication Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <p className="font-medium">Medication</p>
                    <p className="text-muted-foreground">{details.medication}</p>
                </div>
                 <div>
                    <p className="font-medium">Dosage</p>
                    <p className="text-muted-foreground">{details.dosage}</p>
                </div>
                 <div>
                    <p className="font-medium">Frequency</p>
                    <p className="text-muted-foreground">{details.frequency}</p>
                </div>
                 <div>
                    <p className="font-medium">Quantity</p>
                    <p className="text-muted-foreground">{details.quantity}</p>
                </div>
            </div>
        </div>
        {details.notes && (
            <>
                <Separator />
                <div className="space-y-2">
                    <h3 className="font-semibold font-headline">Additional Notes</h3>
                    <p className="text-muted-foreground">{details.notes}</p>
                </div>
            </>
        )}
        <Separator />
         <div className="space-y-2">
            <h3 className="font-semibold font-headline">Status</h3>
            <p className="text-muted-foreground">Date Issued: {details.date}</p>
            <p className="text-muted-foreground">Status: Sent to Pharmacy</p>
        </div>
      </CardContent>
    </Card>
  );
}

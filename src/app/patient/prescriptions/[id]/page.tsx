
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Logo } from "@/components/logo";
import { usePrescriptionStore } from "@/store/prescriptions";
import { useUserStore } from "@/store/user";

export default function PatientPrescriptionDetailsPage({ params }: { params: { id: string } }) {
  const { prescriptions } = usePrescriptionStore();
  const { user } = useUserStore();
  const details = prescriptions.find(p => p.id === params.id && (p.patientId === user.id || p.patient === user.name));
  
  const { toast } = useToast();
  const reportRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const input = reportRef.current;
    if (!input || !details) return;

    toast({
        title: "Generating PDF...",
        description: "Your prescription PDF is being created.",
    });

    html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        const width = pdfWidth;
        const height = width / ratio;

        let finalHeight = height;
        if (height > pdfHeight) {
            finalHeight = pdfHeight;
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, finalHeight);
        pdf.save(`prescription-${details.id}.pdf`);
    });
  };

  if (!details) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Prescription Not Found</CardTitle>
                <CardDescription>The requested prescription could not be found or does not belong to you.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" asChild>
                    <Link href="/patient/prescriptions">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Prescriptions
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="font-headline">Prescription Details</CardTitle>
                        <CardDescription>Review your prescription. ID: {details.id}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                         <Button variant="outline" asChild>
                            <Link href="/patient/prescriptions">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                            </Link>
                        </Button>
                        <Button onClick={handleDownload}>
                            <Download className="mr-2 h-4 w-4"/>
                            Download PDF
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>

        <div ref={reportRef} className="bg-white p-8 border rounded-lg text-black">
            <header className="flex justify-between items-start pb-4 border-b-2 border-black">
                <div className="flex items-center gap-4">
                    <Logo/>
                    <div>
                        <h1 className="text-2xl font-bold font-headline">MediWeb Hub</h1>
                        <div className="text-xs text-gray-600">
                            <p>123 Health St, Wellness City, 45678</p>
                            <p>contact@mediwebhub.com | (123) 456-7890</p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold font-headline text-primary">Prescription</h2>
                    <p className="text-sm">Prescription ID: {details.id}</p>
                </div>
            </header>
            
            <section className="grid grid-cols-2 gap-4 my-6 text-sm">
                <div>
                    <h3 className="font-bold mb-2">Patient</h3>
                    <p><strong>Name:</strong> {details.patient}</p>
                    <p><strong>Patient ID:</strong> {details.patientId}</p>
                </div>
                 <div className="text-right">
                    <h3 className="font-bold mb-2">Prescribing Physician</h3>
                    <p><strong>Name:</strong> {details.doctor}</p>
                    <p><strong>Date Issued:</strong> {details.date}</p>
                </div>
            </section>
            
            <Separator className="my-6 bg-gray-300"/>

            {details.medications.map((med, index) => (
                <React.Fragment key={index}>
                    <section className="my-6">
                        <div className="flex items-center gap-4">
                            <p className="text-5xl font-bold text-gray-400">℞</p>
                            <div>
                                <h3 className="text-2xl font-bold">{med.medication}</h3>
                                <p className="text-sm text-gray-600">{med.dosage}</p>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="font-semibold">Frequency:</p>
                                <p>{med.frequency}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Quantity:</p>
                                <p>{med.quantity}</p>
                            </div>
                        </div>
                    </section>
                    {index < details.medications.length - 1 && <Separator className="my-6 bg-gray-200" />}
                </React.Fragment>
            ))}


            {details.notes && (
                <div className="mt-4 text-sm">
                    <p className="font-semibold">Pharmacist Instructions:</p>
                    <p className="p-2 border bg-gray-50 rounded-md mt-1">{details.notes}</p>
                </div>
            )}
            
             <footer className="pt-8 mt-8 border-t-2 border-black text-sm">
                <div className="flex justify-between items-end">
                     <div>
                        <p>Electronically signed by:</p>
                        <p className="mt-8 border-t border-gray-400 pt-1 font-semibold">{details.doctor}</p>
                        <p className="text-xs text-gray-600">MediWeb Hub Medical Group</p>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                        <p>This prescription is valid until one year from the issue date unless specified otherwise.</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
  );
}

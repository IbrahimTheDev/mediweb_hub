
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";


const records = [
    { id: "rec-001", date: "2024-08-15", record: "Consultation Note - Dr. Carter", type: "Doctor's Note", doctor: "Dr. Emily Carter" },
    { id: "rec-002", date: "2024-07-20", record: "Lab Results - Lipid Panel", type: "Lab Result", doctor: "Dr. Emily Carter" },
    { id: "rec-003", date: "2024-07-11", record: "Lab Results - CBC", type: "Lab Result", doctor: "Dr. Ben Adams" },
    { id: "rec-004", date: "2023-01-10", record: "Immunization Record - Tdap", type: "Immunization", doctor: "Dr. Olivia Chen" },
    { id: "rec-005", date: "2022-05-20", record: "Prescription - Amoxicillin", type: "Prescription", doctor: "Dr. James William" },
];

const patient = {
  name: "Jane Doe",
  dob: "1985-05-22",
  id: "P00123"
}

export default function MedicalRecordsPage() {
  const { toast } = useToast();

  const downloadFile = (record: any) => {
    toast({
        title: "Generating PDF...",
        description: "Your medical record PDF is being created.",
    });

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Header
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(40, 40, 40);
    pdf.text("MediWeb Hub", 20, 25);
    
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("123 Health St, Wellness City, 45678", 20, 32);
    pdf.text("contact@mediwebhub.com | (123) 456-7890", 20, 37);

    pdf.setDrawColor(230, 230, 230);
    pdf.setLineWidth(0.5);
    pdf.line(20, 45, pageWidth - 20, 45);

    // Patient and Report Details
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(40, 40, 40);
    pdf.text("Patient Details", 20, 60);
    pdf.text("Report Details", pageWidth / 2, 60);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.text(`Name: ${patient.name}`, 20, 68);
    pdf.text(`Date of Birth: ${patient.dob}`, 20, 74);
    pdf.text(`Patient ID: ${patient.id}`, 20, 80);

    pdf.text(`Report Date: ${record.date}`, pageWidth / 2, 68);
    pdf.text(`Report Type: ${record.type}`, pageWidth / 2, 74);
    pdf.text(`Record ID: ${record.id}`, pageWidth / 2, 80);

    pdf.line(20, 90, pageWidth - 20, 90);

    // Record Content
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(40, 40, 40);
    pdf.text(record.record, 20, 105);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(80, 80, 80);
    pdf.text("This document contains a summary of the medical record. For full details, please contact our records department.", 20, 115, { maxWidth: pageWidth - 40 });

    // Placeholder for actual content
    pdf.text("...", 20, 130);

    
    // Footer
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.line(20, pageHeight - 40, pageWidth - 20, pageHeight - 40);
    
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Electronically signed by: ${record.doctor}`, 20, pageHeight - 30);
    
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      "This report is confidential and intended for the recipient only. Unauthorized distribution is prohibited.",
      pageWidth / 2,
      pageHeight - 20,
      { align: "center" }
    );
    pdf.text(`Page 1 of 1`, pageWidth - 20, pageHeight-10, { align: 'right' });


    pdf.save(`medical-record-${record.id}.pdf`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><FileText/> Digital Health Locker</CardTitle>
        <CardDescription>
          Access your complete medical history, including doctor's notes, lab results, and prescriptions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Record</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell className="font-medium">{record.record}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => downloadFile(record)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

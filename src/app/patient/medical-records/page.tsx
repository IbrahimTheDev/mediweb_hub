
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
    { id: "rec-001", date: "2024-08-15", record: "Consultation Note - Dr. Carter", type: "Doctor's Note" },
    { id: "rec-002", date: "2024-07-20", record: "Lab Results - Lipid Panel", type: "Lab Result" },
    { id: "rec-003", date: "2024-07-11", record: "Lab Results - CBC", type: "Lab Result" },
    { id: "rec-004", date: "2023-01-10", record: "Immunization Record - Tdap", type: "Immunization" },
    { id: "rec-005", date: "2022-05-20", record: "Prescription - Amoxicillin", type: "Prescription" },
];

export default function MedicalRecordsPage() {
  const { toast } = useToast();

  const downloadFile = (record: any) => {
    toast({
        title: "Generating PDF...",
        description: "Your medical record PDF is being created.",
    });

    const pdf = new jsPDF();

    // Simple header
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("MediWeb Hub", 20, 20);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text("123 Health St, Wellness City, 45678", 20, 28);
    pdf.text("contact@mediwebhub.com | (123) 456-7890", 20, 34);

    pdf.setLineWidth(0.5);
    pdf.line(20, 40, 190, 40);

    // Record details
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Medical Record", 20, 55);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Record: ${record.record}`, 20, 65);
    pdf.text(`Date: ${record.date}`, 20, 72);
    pdf.text(`Type: ${record.type}`, 20, 79);
    pdf.text(`Record ID: ${record.id}`, 20, 86);
    
    // Simple footer
    pdf.line(20, 270, 190, 270);
    pdf.setFontSize(8);
    pdf.text("*** End of Report ***", pdf.internal.pageSize.width / 2, 275, { align: 'center'});
    pdf.text("This report is confidential and intended for the recipient only.", pdf.internal.pageSize.width / 2, 280, { align: 'center'});


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

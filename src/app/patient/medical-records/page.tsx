
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

const records = [
    { id: "rec-001", date: "2024-08-15", record: "Consultation Note - Dr. Carter", type: "Doctor's Note" },
    { id: "rec-002", date: "2024-07-20", record: "Lab Results - Lipid Panel", type: "Lab Result" },
    { id: "rec-003", date: "2024-07-11", record: "Lab Results - CBC", type: "Lab Result" },
    { id: "rec-004", date: "2023-01-10", record: "Immunization Record - Tdap", type: "Immunization" },
    { id: "rec-005", date: "2022-05-20", record: "Prescription - Amoxicillin", type: "Prescription" },
];

export default function MedicalRecordsPage() {
  const downloadFile = (record: any) => {
    // This is a mock download. In a real app, this would trigger a secure API call.
    alert(`Downloading ${record.record}...`);
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

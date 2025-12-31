
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { ClipboardPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePrescriptionStore } from "@/store/prescriptions";
import { useUserStore } from "@/store/user";

export default function PatientPrescriptionsPage() {
  const { prescriptions } = usePrescriptionStore();
  const { user } = useUserStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const patientPrescriptions = prescriptions.filter(p => p.patientId === user.id || p.patient === user.name);

  const filteredPrescriptions = patientPrescriptions.filter(presc => {
    return presc.medications.some(m => m.medication.toLowerCase().includes(searchTerm.toLowerCase())) ||
           presc.doctor.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-headline flex items-center gap-2">
              <ClipboardPlus /> My Prescriptions
            </CardTitle>
            <CardDescription>
              View your prescription history.
            </CardDescription>
          </div>
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by medication or doctor..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date Issued</TableHead>
              <TableHead>Medication(s)</TableHead>
              <TableHead>Prescribed by</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((presc) => (
                <TableRow key={presc.id}>
                  <TableCell>{presc.date}</TableCell>
                  <TableCell className="font-medium">{presc.medications.map(m => m.medication).join(', ')}</TableCell>
                  <TableCell>{presc.doctor}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/patient/prescriptions/${presc.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No prescriptions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

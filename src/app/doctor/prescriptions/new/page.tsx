
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const patients = [
    { id: "P001", name: "John Smith", dob: "1975-05-20" },
    { id: "P002", name: "Sarah Lee", dob: "1982-11-30" },
    { id: "P003", name: "Michael Johnson", dob: "1990-01-15" },
    { id: "P004", name: "Jessica Brown", dob: "1988-08-25" },
    { id: "P005", name: "David William", dob: "1965-03-10" },
];

export default function NewPrescriptionPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedPatient, setSelectedPatient] = React.useState<{id: string, name: string} | null>(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelectPatient = (patient: {id: string, name: string}) => {
        setSelectedPatient(patient);
        setIsDialogOpen(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPatient) {
             toast({
                variant: "destructive",
                title: "No Patient Selected",
                description: "Please select a patient before sending a prescription.",
            });
            return;
        }
        toast({
            title: "Prescription Sent",
            description: `The new prescription for ${selectedPatient.name} has been successfully created and sent.`,
        });
        router.push("/doctor/prescriptions");
    }

  return (
    <Card className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle className="font-headline">New Digital Prescription</CardTitle>
                <CardDescription>
                Create and send a new prescription to the pharmacy.
                </CardDescription>
            </div>
            <Button variant="outline" asChild>
                <Link href="/doctor/prescriptions">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patient-search">Patient</Label>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {selectedPatient ? selectedPatient.name : "Select a patient..."}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Select a Patient</DialogTitle>
                  <DialogDescription>Search for and select an existing patient.</DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search patients..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="max-h-[300px] overflow-y-auto border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Date of Birth</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map(patient => (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.dob}</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" onClick={() => handleSelectPatient(patient)}>Select</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              </DialogContent>
            </Dialog>
            {selectedPatient && <p className="text-xs text-muted-foreground">Patient ID: {selectedPatient.id}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="medication">Medication</Label>
            <Input id="medication" placeholder="e.g., Lisinopril" required />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" placeholder="e.g., 10mg" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Input id="frequency" placeholder="e.g., Once daily" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="e.g., 30" required/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="e.g., Take with food. No refills."
          />
        </div>
        <Button>Send Prescription</Button>
      </CardContent>
      </form>
    </Card>
  );
}


"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, PlusCircle, Trash2 } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { usePrescriptionStore } from "@/store/prescriptions";
import { useUserStore } from "@/store/user";

const patients = [
    { id: "P001", name: "John Smith", dob: "1975-05-20" },
    { id: "P002", name: "Sarah Lee", dob: "1982-11-30" },
    { id: "P003", name: "Michael Johnson", dob: "1990-01-15" },
    { id: "P004", name: "Jessica Brown", dob: "1988-08-25" },
    { id: "P005", name: "David William", dob: "1965-03-10" },
    { id: "P00123", name: "Jane Doe", dob: "1985-05-22"},
];

type MedicationEntry = {
    id: number;
    medication: string;
    dosage: string;
    frequency: string;
    quantity: string;
};


export default function NewPrescriptionPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { addPrescription } = usePrescriptionStore();
    const { user: doctorUser } = useUserStore();

    const [selectedPatient, setSelectedPatient] = React.useState<{id: string, name: string} | null>(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [notes, setNotes] = React.useState("");
    
    const [medications, setMedications] = React.useState<MedicationEntry[]>([
        { id: Date.now(), medication: "", dosage: "", frequency: "", quantity: "" }
    ]);

    const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelectPatient = (patient: {id: string, name: string}) => {
        setSelectedPatient(patient);
        setIsDialogOpen(false);
    }
    
    const handleMedicationChange = (id: number, field: keyof Omit<MedicationEntry, 'id'>, value: string) => {
        setMedications(meds => 
            meds.map(med => med.id === id ? { ...med, [field]: value } : med)
        );
    };

    const addMedication = () => {
        setMedications(meds => [
            ...meds, 
            { id: Date.now(), medication: "", dosage: "", frequency: "", quantity: "" }
        ]);
    };

    const removeMedication = (id: number) => {
        setMedications(meds => meds.filter(med => med.id !== id));
    };


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

        const isAnyMedicationEmpty = medications.some(m => !m.medication || !m.dosage || !m.frequency || !m.quantity);
        if (isAnyMedicationEmpty) {
            toast({
                variant: "destructive",
                title: "Incomplete Medication Details",
                description: "Please fill out all fields for each medication.",
            });
            return;
        }

        const newPrescription = {
            patient: selectedPatient.name,
            patientId: selectedPatient.id,
            medications: medications.map(({ id, ...rest }) => rest),
            notes,
        };
        addPrescription(newPrescription);
        
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
      <CardContent className="space-y-6">
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
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map(patient => (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.name}</TableCell>
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

        <Separator />
        
        <div className="space-y-4">
            {medications.map((med, index) => (
                <div key={med.id} className="space-y-4 p-4 border rounded-lg relative">
                    <Label className="font-semibold">Medication #{index + 1}</Label>
                    {medications.length > 1 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeMedication(med.id)}
                        >
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor={`medication-${med.id}`}>Medication</Label>
                            <Input id={`medication-${med.id}`} placeholder="e.g., Lisinopril" required value={med.medication} onChange={(e) => handleMedicationChange(med.id, 'medication', e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor={`dosage-${med.id}`}>Dosage</Label>
                            <Input id={`dosage-${med.id}`} placeholder="e.g., 10mg" required value={med.dosage} onChange={(e) => handleMedicationChange(med.id, 'dosage', e.target.value)} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor={`frequency-${med.id}`}>Frequency</Label>
                            <Input id={`frequency-${med.id}`} placeholder="e.g., Once daily" required value={med.frequency} onChange={(e) => handleMedicationChange(med.id, 'frequency', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`quantity-${med.id}`}>Quantity</Label>
                            <Input id={`quantity-${med.id}`} type="number" placeholder="e.g., 30" required value={med.quantity} onChange={(e) => handleMedicationChange(med.id, 'quantity', e.target.value)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <Button type="button" variant="outline" onClick={addMedication}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add More
        </Button>
        
        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes / Pharmacist Instructions</Label>
          <Textarea
            id="notes"
            placeholder="e.g., Take with food. No refills."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-end">
        <Button size="lg" type="submit">Send Prescription</Button>
      </CardFooter>
      </form>
    </Card>
  );
}

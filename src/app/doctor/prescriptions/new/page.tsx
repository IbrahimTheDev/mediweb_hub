
"use client";
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


export default function NewPrescriptionPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Prescription Sent",
            description: "The new prescription has been successfully created and sent.",
        });
        router.push("/doctor/prescriptions");
    }

  return (
    <Card className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="font-headline">New Digital Prescription</CardTitle>
        <CardDescription>
          Create and send a new prescription to the pharmacy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="patient-search">Patient Name or ID</Label>
            <Input
              id="patient-search"
              placeholder="Search for a patient..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="medication">Medication</Label>
            <Input id="medication" placeholder="e.g., Lisinopril" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dosage">Dosage</Label>
            <Input id="dosage" placeholder="e.g., 10mg" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Input id="frequency" placeholder="e.g., Once daily" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="e.g., 30" />
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

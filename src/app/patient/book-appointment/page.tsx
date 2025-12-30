
"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { format, parseISO, isValid } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


export default function BookAppointmentPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const { toast } = useToast();
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (dateParam) {
      const parsedDate = parseISO(dateParam);
      if (isValid(parsedDate)) {
        setDate(parsedDate);
        return;
      }
    }
    setDate(new Date());
  }, [dateParam]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) {
        toast({
            variant: 'destructive',
            title: "No date selected!",
            description: `Please select a date for your appointment.`,
        });
        return;
    }
    toast({
        title: "Appointment Requested!",
        description: `Your request for ${format(date, 'PPP')} has been submitted.`,
    });
    router.push('/patient/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
            <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="font-headline">Request an Appointment</CardTitle>
            <CardDescription>
              Please fill out the details below to request an appointment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label>Department / Specialty</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="primary-care">Primary Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Doctor</Label>
                 <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carter">Dr. Emily Carter</SelectItem>
                    <SelectItem value="adams">Dr. Ben Adams</SelectItem>
                    <SelectItem value="chen">Dr. Olivia Chen</SelectItem>
                     <SelectItem value="wilson">Dr. James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                <Label>Time Slot</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000">10:00 AM</SelectItem>
                    <SelectItem value="1100">11:00 AM</SelectItem>
                    <SelectItem value="1400">02:00 PM</SelectItem>
                    <SelectItem value="1500">03:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Reason for visit (optional)</Label>
              <Textarea id="notes" placeholder="Briefly describe your symptoms or reason for the visit..." />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit Request</Button>
          </CardFooter>
          </form>
        </Card>
      </div>

      <div className="space-y-4">
        <Label>Selected Date: {date ? format(date, "PPP") : "None"}</Label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
        />
      </div>
    </div>
  );
}

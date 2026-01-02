
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { parseISO, isValid, format, getYear, getMonth, getDate, getDaysInMonth } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, Stethoscope, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useAppointmentStore } from "@/store/appointment";
import { useNotificationStore } from "@/store/notifications";
import { useUserStore } from "@/store/user";

const steps = [
  { id: 'service', name: 'Service' },
  { id: 'doctor', name: 'Doctor' },
  { id: 'datetime', name: 'Date & Time' },
  { id: 'details', name: 'Confirm Details' },
];

const services = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "primary-care", label: "Primary Care" },
];

const doctors = [
    { value: "any", label: "Any Available Doctor" },
    { value: "carter", label: "Dr. Emily Carter" },
    { value: "adams", label: "Dr. Ben Adams" },
    { value: "chen", label: "Dr. Olivia Chen" },
    { value: "william", label: "Dr. James William" },
];

const timeSlots = [
    { value: "1000", label: "10:00 AM" },
    { value: "1100", label: "11:00 AM" },
    { value: "1400", label: "02:00 PM" },
    { value: "1500", label: "03:00 PM" },
];


function Stepper({ currentStep, steps }: { currentStep: number; steps: {id: string; name: string}[] }) {
    return (
        <div className="flex items-center justify-between w-full">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center text-center">
                        <div
                            className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300",
                                currentStep > index ? "bg-primary border-primary text-primary-foreground" :
                                currentStep === index ? "border-primary" : "border-muted",
                            )}
                        >
                            {currentStep > index ? <Check className="w-5 h-5" /> : index + 1}
                        </div>
                        <p className={cn(
                            "text-xs mt-2 w-20",
                            currentStep >= index ? "font-medium text-foreground" : "text-muted-foreground"
                        )}>
                            {step.name}
                        </p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            "flex-1 h-0.5 mx-4 transition-colors duration-300",
                             currentStep > index ? "bg-primary" : "bg-muted"
                        )} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}


export default function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const isReschedule = searchParams.get("reschedule");
  const { toast } = useToast();
  const router = useRouter();
  const { addAppointment } = useAppointmentStore();
  const { user } = useUserStore();
  const { addNotification } = useNotificationStore();


  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  const [year, setYear] = useState<number | undefined>();
  const [month, setMonth] = useState<number | undefined>();
  const [day, setDay] = useState<number | undefined>();

  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");


  const years = Array.from({ length: 5 }, (_, i) => getYear(new Date()) + i);
  const months = Array.from({ length: 12 }, (_, i) => ({ value: i, label: format(new Date(2000, i), 'MMMM') }));
  const daysInMonth = year && month !== undefined ? getDaysInMonth(new Date(year, month)) : 31;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    if (dateParam) {
      const parsedDate = parseISO(dateParam);
      if (isValid(parsedDate)) {
        setDate(parsedDate);
        setYear(getYear(parsedDate));
        setMonth(getMonth(parsedDate));
        setDay(getDate(parsedDate));
        return;
      }
    }
    // Set default date to today if no valid date param
    setDate(today);
    setYear(getYear(today));
    setMonth(getMonth(today));
    setDay(getDate(today));
  }, [dateParam]);

  useEffect(() => {
    if (year !== undefined && month !== undefined && day !== undefined) {
      const newDate = new Date(year, month, day);
      if (isValid(newDate)) {
        setDate(newDate);
      }
    }
  }, [year, month, day]);


  const nextStep = () => {
    if (currentStep === 0 && !service) {
        toast({ variant: "destructive", title: "Please select a service." });
        return;
    }
    if (currentStep === 1 && !doctor) {
        toast({ variant: "destructive", title: "Please select a doctor." });
        return;
    }
    if (currentStep === 2 && (!date || !timeSlot)) {
        toast({ variant: "destructive", title: "Please select a date and time slot." });
        return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const appointmentData = {
        service: getLabel(services, service),
        doctor: getLabel(doctors, doctor),
        date: date ? format(date, "yyyy-MM-dd") : 'Not selected',
        time: getLabel(timeSlots, timeSlot),
        notes: notes,
    };
    
    addAppointment(appointmentData);
    
    addNotification({
        userId: "D0C456", // Hardcoded doctor ID for now
        message: `New appointment request from ${user.name} for ${appointmentData.date}.`,
        type: 'new_request'
    })

    toast({
        title: "Appointment Requested!",
        description: `Your request has been submitted.`,
    });
    router.push('/patient/book-appointment/confirmation');
  };

  const getLabel = (arr: {value: string, label: string}[], value: string) => {
    return arr.find(item => item.value === value)?.label || "Not selected";
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-center">{isReschedule ? "Reschedule Appointment" : "Request an Appointment"}</CardTitle>
          <CardDescription className="text-center">
            {isReschedule ? "Please select a new date and time." : "Follow the steps to book your appointment."}
          </CardDescription>
           <div className="pt-4 pb-2">
                <Stepper currentStep={currentStep} steps={steps} />
           </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8 min-h-[350px] flex flex-col justify-center">
                {currentStep === 0 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-500">
                        <Label className="text-lg font-medium text-center block">Which service do you need?</Label>
                         <Select required value={service} onValueChange={setService}>
                            <SelectTrigger className="h-12 text-base max-w-sm mx-auto">
                                <SelectValue placeholder="Select a department or specialty" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                {currentStep === 1 && (
                     <div className="space-y-4 animate-in fade-in-50 duration-500">
                        <Label className="text-lg font-medium text-center block">Choose your preferred doctor</Label>
                        <Select required value={doctor} onValueChange={setDoctor}>
                            <SelectTrigger className="h-12 text-base max-w-sm mx-auto">
                                <SelectValue placeholder="Select a doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                {doctors.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-500 max-w-sm mx-auto w-full">
                        <Label className="text-lg font-medium text-center block">Select a date and time</Label>
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="space-y-2">
                                    <Label>Year</Label>
                                    <Select value={year?.toString()} onValueChange={(v) => setYear(Number(v))}>
                                        <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                                        <SelectContent>
                                            {years.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Month</Label>
                                     <Select value={month?.toString()} onValueChange={(v) => setMonth(Number(v))}>
                                        <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
                                        <SelectContent>
                                            {months.map(m => <SelectItem key={m.value} value={m.value.toString()}>{m.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Day</Label>
                                     <Select value={day?.toString()} onValueChange={(v) => setDay(Number(v))}>
                                        <SelectTrigger><SelectValue placeholder="Day" /></SelectTrigger>
                                        <SelectContent>
                                            {days.map(d => <SelectItem key={d} value={d.toString()}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Available Slots</Label>
                                <Select required value={timeSlot} onValueChange={setTimeSlot}>
                                    <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )}
                 {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-500 max-w-lg mx-auto w-full">
                        <Label className="text-lg font-medium text-center block">Confirm Your Appointment Details</Label>
                        
                        <Card className="bg-muted/50">
                            <CardContent className="pt-6 space-y-4 text-sm">
                                <div className="flex items-center gap-4">
                                    <Briefcase className="h-5 w-5 text-primary"/>
                                    <p><span className="font-semibold">Service:</span> {getLabel(services, service)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Stethoscope className="h-5 w-5 text-primary"/>
                                    <p><span className="font-semibold">Doctor:</span> {getLabel(doctors, doctor)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Calendar className="h-5 w-5 text-primary"/>
                                    <p><span className="font-semibold">Date:</span> {date ? format(date, "MMMM dd, yyyy") : 'Not selected'}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Clock className="h-5 w-5 text-primary"/>
                                    <p><span className="font-semibold">Time:</span> {getLabel(timeSlots, timeSlot)}</p>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Separator />
                        
                         <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes / Reason for Visit (Optional)</Label>
                            <Textarea 
                                id="notes" 
                                placeholder="Briefly describe your symptoms or reason for the visit..." 
                                className="min-h-[100px] text-base"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
            {currentStep > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4"/> Previous
                </Button>
            ) : (
                <div></div>
            )}
            
            {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4"/>
                </Button>
            ) : (
                <Button type="submit">
                    <Check className="mr-2 h-4 w-4"/> Submit Request
                </Button>
            )}
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}

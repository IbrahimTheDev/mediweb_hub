
"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Briefcase, Calendar, Clock } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useDoctorStore } from "@/store/doctor";
import { useRouter } from "next/navigation";

export default function DoctorRegistrationPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { user } = useUserStore();
    const { addDoctor } = useDoctorStore();
    
    const [name, setName] = React.useState(user.name);
    const [avatar, setAvatar] = React.useState<string | null>(null);
    const [specialty, setSpecialty] = React.useState("");
    const [experience, setExperience] = React.useState("");
    const [availability, setAvailability] = React.useState("");

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !specialty || !experience || !availability) {
            toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill out all mandatory fields.",
            });
            return;
        }

        const newDoctor = {
            name,
            specialty,
            experience,
            availability,
            imageUrl: avatar,
        };
        addDoctor(newDoctor);

        toast({
            title: "Registration Complete",
            description: "Your professional details have been saved.",
        });
        router.push("/doctor/dashboard");
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                toast({
                    title: "Picture Uploaded",
                    description: "Your new profile picture is ready.",
                });
            };
            reader.readAsDataURL(file);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-2xl">
            <CardHeader>
            <CardTitle className="font-headline text-2xl">Doctor Registration</CardTitle>
            <CardDescription>
                Complete your professional profile. This information will be visible to patients.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                     <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed">
                                {avatar ? (
                                    <Image src={avatar} alt="Profile picture" width={96} height={96} className="object-cover w-full h-full" />
                                ) : (
                                    <User className="w-12 h-12 text-muted-foreground" />
                                )}
                            </div>
                            <Input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleAvatarChange}
                                accept="image/png, image/jpeg, image/jpg"
                            />
                            <Button 
                                size="icon" 
                                variant="outline" 
                                type="button"
                                className="absolute bottom-0 -right-1 rounded-full h-8 w-8 bg-background"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-4 w-4"/>
                                <span className="sr-only">Upload picture</span>
                            </Button>
                        </div>
                        <div className="flex-1 space-y-2">
                             <Label htmlFor="name">Full Name</Label>
                             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g., Dr. Jane Doe"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="specialty">Specialization</Label>
                             <div className="relative flex items-center">
                                <Briefcase className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <Input id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required placeholder="e.g., Cardiologist" className="pl-10"/>
                             </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Experience</Label>
                             <div className="relative flex items-center">
                                <Calendar className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                                <Input id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} required placeholder="e.g., 12+ years" className="pl-10"/>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="availability">Availability / Time Slot</Label>
                         <div className="relative flex items-center">
                            <Clock className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                            <Input id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)} required placeholder="e.g., Mon - Fri, 9am - 5pm" className="pl-10"/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6 flex justify-end">
                    <Button size="lg" type="submit">Complete Registration</Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  );
}

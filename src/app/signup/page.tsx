import Link from "next/link";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Tabs defaultValue="patient" className="w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <Logo />
            <h1 className="text-xl font-bold font-headline">MediWeb Hub</h1>
          </Link>
        </div>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="patient">Patient Signup</TabsTrigger>
          <TabsTrigger value="doctor">Doctor Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="patient">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Create a Patient Account</CardTitle>
              <CardDescription>
                Join us to manage your health journey with ease.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-name">Full Name</Label>
                <Input id="patient-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-email-signup">Email</Label>
                <Input id="patient-email-signup" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-password-signup">Password</Label>
                <Input id="patient-password-signup" type="password" required />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/patient/dashboard">Sign Up as Patient</Link>
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="doctor">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Join Our Professional Team</CardTitle>
              <CardDescription>
                Register to access our advanced healthcare provider tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="doctor-name">Full Name</Label>
                <Input id="doctor-name" placeholder="Dr. Jane Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor-specialty">Specialty</Label>
                <Input id="doctor-specialty" placeholder="e.g., Cardiology" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor-email-signup">Work Email</Label>
                <Input id="doctor-email-signup" type="email" placeholder="doctor@mediweb.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor-password-signup">Password</Label>
                <Input id="doctor-password-signup" type="password" required />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/doctor/dashboard">Sign Up as Doctor</Link>
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

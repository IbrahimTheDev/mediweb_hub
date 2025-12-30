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

export default function LoginPage() {
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
          <TabsTrigger value="patient">Patient Login</TabsTrigger>
          <TabsTrigger value="doctor">Doctor Login</TabsTrigger>
        </TabsList>
        <TabsContent value="patient">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Patient Login</CardTitle>
              <CardDescription>
                Access your patient dashboard to manage your health.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-email">Email</Label>
                <Input id="patient-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patient-password">Password</Label>
                <Input id="patient-password" type="password" required />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/patient/dashboard">Login as Patient</Link>
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="doctor">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Doctor Login</CardTitle>
              <CardDescription>
                Access your professional dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-email">Email</Label>
                <Input id="doctor-email" type="email" placeholder="doctor@mediweb.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor-password">Password</Label>
                <Input id="doctor-password" type="password" required />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/doctor/dashboard">Login as Doctor</Link>
              </Button>
               <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

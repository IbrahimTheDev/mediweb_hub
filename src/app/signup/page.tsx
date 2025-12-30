import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
    const signupImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
     <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
       <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm">
           <CardHeader className="text-center">
             <Link href="/" className="flex items-center gap-2 text-foreground justify-center mb-4">
              <Logo />
              <h1 className="text-3xl font-bold font-headline">MediWeb Hub</h1>
            </Link>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
               <div className="flex gap-2">
                    <Button type="submit" className="w-full" asChild>
                        <Link href="/patient/dashboard">Sign up as Patient</Link>
                    </Button>
                    <Button type="submit" variant="secondary" className="w-full" asChild>
                        <Link href="/doctor/dashboard">Sign up as Doctor</Link>
                    </Button>
                </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {signupImage && (
             <Image
              src={signupImage.imageUrl}
              alt={signupImage.description}
              fill
              className="object-cover"
              data-ai-hint={signupImage.imageHint}
            />
        )}
      </div>
    </div>
  );
}

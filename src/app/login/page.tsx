
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(p => p.id === 'hero-image');

  return (
    <div className="relative w-full h-screen">
      {loginImage && (
        <Image
          src={loginImage.imageUrl}
          alt={loginImage.description}
          fill
          className="object-cover"
          data-ai-hint={loginImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <Button asChild variant="ghost" className="absolute top-4 left-4 z-20 text-white hover:bg-white/10 hover:text-white">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
        </Link>
      </Button>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl">
          <div className="grid gap-2 text-center text-white">
             <Link href="/" className="flex items-center gap-2 text-white justify-center mb-4">
              <Logo />
              <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
            </Link>
            <p className="text-balance text-white/80">
              Enter your credentials to access your account.
            </p>
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
               <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:ring-primary"
                />
               </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password"  className="text-white/80">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
               <div className="relative">
                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                 <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:ring-primary"
                    placeholder="••••••••"
                 />
               </div>
            </div>
            <div className="flex gap-2 pt-2">
                 <Button type="submit" className="w-full bg-primary hover:bg-primary/90" asChild>
                    <Link href="/patient/dashboard">Login as Patient</Link>
                </Button>
                <Button type="submit" variant="secondary" className="w-full" asChild>
                    <Link href="/doctor/dashboard">Login as Doctor</Link>
                </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-white/80">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-primary font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

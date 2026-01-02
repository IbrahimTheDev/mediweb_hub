"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find((p) => p.id === "hero-image");
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Authenticate
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw new Error(authError.message);

      // 2. Check Profile Role & Status
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*") // Get all fields to check if doctor details are filled
        .eq("id", authData.user.id)
        .single();

      if (profileError) throw new Error("Could not fetch user profile.");

      const role = profile?.role || "patient";

      // 3. Conditional Routing
      if (role === 'patient') {
         router.push('/patient/dashboard');
      } 
      else if (role === 'doctor') {
         // CHECK: Has the doctor filled their mandatory details?
         if (!profile.specialty || !profile.experience) {
            toast({ title: "Incomplete Profile", description: "Please complete your registration." });
            router.push('/doctor/registration');
         } else {
            router.push('/doctor/dashboard');
         }
      }

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {loginImage && (
        <Image
          src={loginImage.imageUrl}
          alt={loginImage.description}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <Button
        asChild
        variant="ghost"
        className="absolute top-4 left-4 z-20 text-white hover:bg-white/10 hover:text-white"
      >
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

          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:ring-primary"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:ring-primary"
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4"/> : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-white/80">
             Don&apos;t have an account? <Link href="/signup" className="underline text-primary">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
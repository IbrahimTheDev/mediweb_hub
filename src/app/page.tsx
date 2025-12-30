import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Stethoscope, HeartPulse, Pill, Microscope, Calendar, Clock } from "lucide-react";
import { Logo } from "@/components/logo";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
const doctors = [
  { name: "Dr. Emily Carter", specialty: "Cardiologist", imageId: "doctor-1", experience: "12+ years", availability: "Mon - Fri, 9am - 5pm" },
  { name: "Dr. Ben Adams", specialty: "Neurologist", imageId: "doctor-2", experience: "15+ years", availability: "Tue - Sat, 10am - 6pm" },
  { name: "Dr. Olivia Chen", specialty: "Pediatrician", imageId: "doctor-3", experience: "8+ years", availability: "Mon, Wed, Fri, 8am - 4pm" },
  { name: "Dr. James Wilson", specialty: "Orthopedist", imageId: "doctor-5", experience: "9+ years", availability: "Mon - Thu, 8am - 5pm" },
];

const services = [
  { icon: HeartPulse, name: "Cardiology", description: "Expert care for your heart." },
  { icon: Stethoscope, name: "Primary Care", description: "Comprehensive health services." },
  { icon: Pill, name: "Pharmacy", description: "On-site pharmacy for your convenience." },
  { icon: Microscope, name: "Diagnostics", description: "Advanced lab and imaging." },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold sm:inline-block font-headline">MediWeb Hub</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MediWeb Hub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4 text-white">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-md">
              Your Trusted Partner in Health
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-sm">
              Providing compassionate and high-quality medical care for you and your family.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Book an Appointment</Link>
            </Button>
          </div>
        </section>
        
        <section id="services" className="py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Services</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                A wide range of specialized medical services to meet your health needs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="mt-4 font-headline">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="doctors" className="bg-muted py-16 lg:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Meet Our Doctors</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Our team of experienced and dedicated medical professionals.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => {
                const image = PlaceHolderImages.find(p => p.id === doctor.imageId);
                return (
                  <Card key={doctor.name} className="overflow-hidden group flex flex-col">
                    {image && (
                      <div className="relative h-80 w-full">
                         <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={image.imageHint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline">{doctor.name}</CardTitle>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{doctor.experience} experience</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{doctor.availability}</span>
                        </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to take control of your health?</h2>
            <p className="text-lg text-muted-foreground mt-2 mb-8 max-w-2xl mx-auto">
              Join MediWeb Hub today to manage your appointments, records, and more.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Patient Login</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

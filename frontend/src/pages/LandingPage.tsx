import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Syringe, Baby, Calendar, Search, Shield, ArrowRight } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Syringe className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">VMIS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Track Vaccinations <br />
            <span className="text-primary">Save Lives</span>
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, efficient system for tracking child vaccination schedules. 
            Never miss a vaccine dose again.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Baby,
                title: "Baby Management",
                description: "Register and manage all babies in your clinic with complete profiles.",
              },
              {
                icon: Syringe,
                title: "Vaccine Tracking",
                description: "Record vaccines given and track vaccination history easily.",
              },
              {
                icon: Calendar,
                title: "Schedule Alerts",
                description: "Get notified about upcoming and overdue vaccinations.",
              },
              {
                icon: Search,
                title: "Quick Search",
                description: "Find any baby instantly by name or phone number.",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-8 lg:p-12 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Secure & Reliable
              </h2>
              <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
                Your data is protected with enterprise-grade security. 
                Role-based access ensures only authorized staff can manage records.
              </p>
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Get Started Today
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 VMIS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
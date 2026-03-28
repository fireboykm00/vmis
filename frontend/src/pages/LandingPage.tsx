import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Syringe, Baby, Calendar, Search, Shield, ArrowRight, LayoutDashboard, User, LogOut } from "lucide-react";

export function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Syringe className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">VMIS</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
              <Link to="/" className="text-sm font-medium hover:text-primary">Features</Link>
              <Link to="/" className="text-sm font-medium hover:text-primary">About</Link>
              <Link to="/" className="text-sm font-medium hover:text-primary">Contact</Link>
            </nav>

            <div className="flex items-center gap-4">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(user.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline">{user.fullName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1">
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/babies" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Babies
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
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
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="gap-2">
                {isAuthenticated ? "Go to Dashboard" : "Start Free"} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                {isAuthenticated ? "View Babies" : "Sign In"}
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
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button variant="secondary" size="lg">
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Syringe className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">VMIS</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Vaccine Management Information System - Tracking child vaccinations efficiently and reliably.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary">Features</Link></li>
                <li><Link to="/" className="hover:text-primary">Pricing</Link></li>
                <li><Link to="/" className="hover:text-primary">Security</Link></li>
                <li><Link to="/" className="hover:text-primary">Roadmap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/" className="hover:text-primary">Careers</Link></li>
                <li><Link to="/" className="hover:text-primary">Blog</Link></li>
                <li><Link to="/" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="/" className="hover:text-primary">Cookie Policy</Link></li>
                <li><Link to="/" className="hover:text-primary">GDPR</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} VMIS. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
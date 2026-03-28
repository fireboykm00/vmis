import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardService } from "@/services/dashboardService";
import type { DashboardStats } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Syringe, Calendar, AlertCircle, WifiOff, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (err) {
      if (axios.isAxiosError(err) && !err.response) {
        setError("server");
      } else {
        setError("unknown");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error === "server") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your vaccination system</p>
          </div>
        </div>

        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <WifiOff className="h-16 w-16 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Cannot Connect to Server</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Unable to connect to the backend server. Please ensure the server is running on port 8080.
            </p>
            <div className="flex gap-4">
              <Button onClick={loadStats} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Retry Connection
              </Button>
              <Link to="/">
                <Button variant="outline">Go to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Babies",
      value: stats?.totalBabies || 0,
      icon: Baby,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Vaccines Given",
      value: stats?.totalVaccinesGiven || 0,
      icon: Syringe,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Overdue",
      value: stats?.overdueVaccines || 0,
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      title: "Upcoming (7 days)",
      value: stats?.upcomingVaccines || 0,
      icon: Calendar,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your vaccination system</p>
        </div>
        <Link to="/babies/new">
          <Button>+ Add Baby</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className={stat.bg + " p-3 rounded-full"}>
                  <stat.icon className={stat.color + " h-6 w-6"} />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/babies/new" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Baby className="mr-2 h-4 w-4" />
                Register New Baby
              </Button>
            </Link>
            <Link to="/babies" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Syringe className="mr-2 h-4 w-4" />
                View All Babies
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">New Registrations</span>
              <span className="font-bold">{stats?.registeredThisMonth || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Vaccines Given</span>
              <span className="font-bold">{stats?.thisMonthVaccines || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Today&apos;s Vaccines</span>
              <span className="font-bold">{stats?.todayVaccines || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {(stats?.overdueVaccines || 0) > 0 && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Attention Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 dark:text-red-400">
              {stats?.overdueVaccines} baby(ies) have overdue vaccinations. 
              Review their records immediately.
            </p>
            <Link to="/babies">
              <Button variant="destructive" className="mt-4">
                View Overdue Cases
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
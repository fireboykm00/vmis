import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { babyService } from "@/services/babyService";
import { vaccineService } from "@/services/vaccineService";
import type { Baby, VaccineRecord, VaccineRequest } from "@/types";
import { getVaccineOptions } from "@/lib/vaccines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Syringe,
  Search,
  Calendar,
  AlertCircle,
  WifiOff,
  RefreshCw,
  Loader2,
  Plus,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function VaccinesPage() {
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([]);
  const [babies, setBabies] = useState<Baby[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBabyId, setSelectedBabyId] = useState<string>("");
  const [vaccineForm, setVaccineForm] = useState<VaccineRequest>({
    vaccineName: "",
    dateGiven: "",
    nextDueDate: "",
    batchNumber: "",
    notes: "",
    administeredBy: "",
  });

  const vaccineOptions = getVaccineOptions();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const babiesData = await babyService.getAll();
      setBabies(babiesData);
      
      const allVaccines: VaccineRecord[] = [];
      for (const baby of babiesData) {
        try {
          const babyVaccines = await vaccineService.getByBabyId(baby.id);
          allVaccines.push(...babyVaccines);
        } catch {
          // No vaccines for this baby
        }
      }
      setVaccines(allVaccines);
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

  const handleRecordVaccine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBabyId) return;
    
    setIsSubmitting(true);
    try {
      await vaccineService.create(parseInt(selectedBabyId), vaccineForm);
      toast.success("Vaccine recorded successfully");
      setIsDialogOpen(false);
      setSelectedBabyId("");
      setVaccineForm({
        vaccineName: "",
        dateGiven: "",
        nextDueDate: "",
        batchNumber: "",
        notes: "",
        administeredBy: "",
      });
      loadData();
    } catch (err) {
      if (axios.isAxiosError(err) && !err.response) {
        toast.error("Cannot connect to server");
      } else {
        toast.error("Failed to record vaccine");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredVaccines = vaccines.filter(v => 
    v.vaccineName.toLowerCase().includes(filter.toLowerCase()) ||
    v.babyName.toLowerCase().includes(filter.toLowerCase())
  );

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
        <div><h1 className="text-3xl font-bold">Vaccines</h1></div>
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <WifiOff className="h-16 w-16 text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Cannot Connect to Server</h2>
            <Button onClick={loadData} className="gap-2"><RefreshCw className="h-4 w-4" />Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Vaccines</h1>
          <p className="text-muted-foreground">All vaccination records</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Record Vaccine</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>Record New Vaccine</DialogTitle></DialogHeader>
            <form onSubmit={handleRecordVaccine} className="space-y-4">
              <div className="space-y-2">
                <Label>Select Baby *</Label>
                <Select value={selectedBabyId} onValueChange={setSelectedBabyId} required>
                  <SelectTrigger><SelectValue placeholder="Choose baby" /></SelectTrigger>
                  <SelectContent>
                    {babies.map(b => (
                      <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vaccine Type *</Label>
                <Select value={vaccineForm.vaccineName} onValueChange={v => setVaccineForm({...vaccineForm, vaccineName: v})} required>
                  <SelectTrigger><SelectValue placeholder="Select vaccine" /></SelectTrigger>
                  <SelectContent>
                    {vaccineOptions.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Given *</Label>
                <Input type="date" value={vaccineForm.dateGiven} onChange={e => setVaccineForm({...vaccineForm, dateGiven: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Next Due Date</Label>
                <Input type="date" value={vaccineForm.nextDueDate || ""} onChange={e => setVaccineForm({...vaccineForm, nextDueDate: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Administered By</Label>
                <Input placeholder="Nurse/Doctor" value={vaccineForm.administeredBy || ""} onChange={e => setVaccineForm({...vaccineForm, administeredBy: e.target.value})} />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Record Vaccine"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search vaccines..." value={filter} onChange={e => setFilter(e.target.value)} className="pl-9" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All Vaccines ({filteredVaccines.length})</CardTitle></CardHeader>
        <CardContent>
          {filteredVaccines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Syringe className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No vaccines found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Baby</TableHead>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Date Given</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVaccines.map(v => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">
                      <Link to={`/babies/${v.babyId}`} className="text-primary hover:underline">
                        {v.babyName}
                      </Link>
                    </TableCell>
                    <TableCell>{v.vaccineName}</TableCell>
                    <TableCell>{v.dateGiven}</TableCell>
                    <TableCell>{v.nextDueDate || <span className="text-muted">-</span>}</TableCell>
                    <TableCell>
                      {v.overdue ? <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" />Overdue</Badge>
                      : v.upcoming ? <Badge className="bg-yellow-500 gap-1"><Calendar className="h-3 w-3" />Due Soon</Badge>
                      : <Badge variant="secondary">Completed</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/babies/${v.babyId}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:underline">
                          View Baby
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
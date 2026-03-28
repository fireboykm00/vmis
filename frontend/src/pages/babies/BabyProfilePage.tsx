import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { babyService } from "@/services/babyService";
import { vaccineService } from "@/services/vaccineService";
import type { Baby, VaccineRecord, VaccineRequest } from "@/types";
import { getVaccineOptions } from "@/lib/vaccines";
import { Baby as BabyIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Phone,
  Calendar,
  Edit,
  Plus,
  Syringe,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

export function BabyProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [baby, setBaby] = useState<Baby | null>(null);
  const [vaccines, setVaccines] = useState<VaccineRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<VaccineRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<number | null>(null);

  const [vaccineForm, setVaccineForm] = useState<VaccineRequest>({
    vaccineName: "",
    dateGiven: "",
    nextDueDate: "",
    batchNumber: "",
    notes: "",
    administeredBy: "",
  });

  const [editForm, setEditForm] = useState<VaccineRequest>({
    vaccineName: "",
    dateGiven: "",
    nextDueDate: "",
    batchNumber: "",
    notes: "",
    administeredBy: "",
  });

  const vaccineOptions = getVaccineOptions();

  useEffect(() => {
    if (id) {
      loadData(parseInt(id));
    }
  }, [id]);

  const loadData = async (babyId: number) => {
    try {
      const [babyData, vaccinesData] = await Promise.all([
        babyService.getById(babyId),
        vaccineService.getByBabyId(babyId),
      ]);
      setBaby(babyData);
      setVaccines(vaccinesData);
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        toast.error("Cannot connect to server");
      } else {
        toast.error("Failed to load baby profile");
      }
      navigate("/babies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVaccineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await vaccineService.create(parseInt(id), vaccineForm);
      toast.success("Vaccine recorded successfully");
      setIsDialogOpen(false);
      setVaccineForm({
        vaccineName: "",
        dateGiven: "",
        nextDueDate: "",
        batchNumber: "",
        notes: "",
        administeredBy: "",
      });
      loadData(parseInt(id));
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        toast.error("Cannot connect to server");
      } else {
        toast.error("Failed to record vaccine");
      }
    }
  };

  const handleEditClick = (vaccine: VaccineRecord) => {
    setEditingVaccine(vaccine);
    setEditForm({
      vaccineName: vaccine.vaccineName,
      dateGiven: vaccine.dateGiven,
      nextDueDate: vaccine.nextDueDate || "",
      batchNumber: vaccine.batchNumber || "",
      notes: vaccine.notes || "",
      administeredBy: vaccine.administeredBy || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVaccine) return;
    try {
      await vaccineService.update(editingVaccine.id, editForm);
      toast.success("Vaccine updated successfully");
      setIsEditDialogOpen(false);
      setEditingVaccine(null);
      if (id) loadData(parseInt(id));
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        toast.error("Cannot connect to server");
      } else {
        toast.error("Failed to update vaccine");
      }
    }
  };

  const handleDeleteVaccine = async (vaccineId: number) => {
    if (!confirm("Are you sure you want to delete this vaccine record?")) return;
    setIsDeleteLoading(vaccineId);
    try {
      await vaccineService.delete(vaccineId);
      toast.success("Vaccine record deleted");
      if (id) loadData(parseInt(id));
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        toast.error("Cannot connect to server");
      } else {
        toast.error("Failed to delete vaccine record");
      }
    } finally {
      setIsDeleteLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!baby) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/babies">
          <Button variant="ghost" size="icon">
            &larr;
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{baby.name}</h1>
          <p className="text-muted-foreground">Baby Profile</p>
        </div>
        <Link to={`/babies/${baby.id}/edit`}>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <BabyIcon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{baby.age}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{baby.dateOfBirth}</p>
              </div>
            </div>
            <div>
              <Badge variant="outline">{baby.gender}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Guardian Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Guardian Name</p>
              <p className="font-medium">{baby.guardianName}</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{baby.phoneNumber}</p>
              </div>
            </div>
            {baby.address && (
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{baby.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold">{baby.vaccineCount}</p>
              <p className="text-muted-foreground">Vaccines Recorded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vaccination History</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Vaccine
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Record New Vaccine</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleVaccineSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Vaccine Type *</Label>
                  <Select
                    value={vaccineForm.vaccineName}
                    onValueChange={(value) => setVaccineForm({ ...vaccineForm, vaccineName: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vaccine type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vaccineOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateGiven">Date Given *</Label>
                  <Input
                    id="dateGiven"
                    type="date"
                    value={vaccineForm.dateGiven}
                    onChange={(e) =>
                      setVaccineForm({ ...vaccineForm, dateGiven: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextDueDate">Next Due Date</Label>
                  <Input
                    id="nextDueDate"
                    type="date"
                    value={vaccineForm.nextDueDate || ""}
                    onChange={(e) =>
                      setVaccineForm({ ...vaccineForm, nextDueDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="administeredBy">Administered By</Label>
                  <Input
                    id="administeredBy"
                    placeholder="Nurse/Doctor name"
                    value={vaccineForm.administeredBy || ""}
                    onChange={(e) =>
                      setVaccineForm({ ...vaccineForm, administeredBy: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Additional notes"
                    value={vaccineForm.notes || ""}
                    onChange={(e) =>
                      setVaccineForm({ ...vaccineForm, notes: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Record Vaccine
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {vaccines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Syringe className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No vaccines recorded</h3>
              <p className="text-muted-foreground">
                Record the first vaccine for this baby
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vaccine</TableHead>
                  <TableHead>Date Given</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Administered By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccines.map((vaccine) => (
                  <TableRow key={vaccine.id}>
                    <TableCell className="font-medium">{vaccine.vaccineName}</TableCell>
                    <TableCell>{vaccine.dateGiven}</TableCell>
                    <TableCell>
                      {vaccine.nextDueDate || <span className="text-muted">-</span>}
                    </TableCell>
                    <TableCell>{vaccine.administeredBy || "-"}</TableCell>
                    <TableCell>
                      {vaccine.overdue ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Overdue
                        </Badge>
                      ) : vaccine.upcoming ? (
                        <Badge className="bg-yellow-500 gap-1">
                          <Calendar className="h-3 w-3" />
                          Due Soon
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Completed</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(vaccine)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteVaccine(vaccine.id)}
                          disabled={isDeleteLoading === vaccine.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Vaccine Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Vaccine Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Vaccine Type *</Label>
              <Select
                value={editForm.vaccineName}
                onValueChange={(value) => setEditForm({ ...editForm, vaccineName: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vaccine type" />
                </SelectTrigger>
                <SelectContent>
                  {vaccineOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDateGiven">Date Given *</Label>
              <Input
                id="editDateGiven"
                type="date"
                value={editForm.dateGiven}
                onChange={(e) =>
                  setEditForm({ ...editForm, dateGiven: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editNextDueDate">Next Due Date</Label>
              <Input
                id="editNextDueDate"
                type="date"
                value={editForm.nextDueDate || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, nextDueDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editAdministeredBy">Administered By</Label>
              <Input
                id="editAdministeredBy"
                placeholder="Nurse/Doctor name"
                value={editForm.administeredBy || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, administeredBy: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editNotes">Notes</Label>
              <Input
                id="editNotes"
                placeholder="Additional notes"
                value={editForm.notes || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Update Vaccine
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
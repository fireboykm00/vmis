import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { babyService } from "@/services/babyService";
import type { BabyRequest, Gender } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export function BabyFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<BabyRequest>({
    name: "",
    dateOfBirth: "",
    gender: "MALE" as Gender,
    guardianName: "",
    phoneNumber: "",
    address: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      loadBaby(parseInt(id));
    }
  }, [id]);

  const loadBaby = async (babyId: number) => {
    setIsLoading(true);
    try {
      const baby = await babyService.getById(babyId);
      setFormData({
        name: baby.name,
        dateOfBirth: baby.dateOfBirth,
        gender: baby.gender,
        guardianName: baby.guardianName,
        phoneNumber: baby.phoneNumber,
        address: baby.address || "",
        notes: baby.notes || "",
      });
    } catch (error) {
      toast.error("Failed to load baby");
      navigate("/babies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setFormData({ ...formData, gender: value as Gender });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (isEditing && id) {
        await babyService.update(parseInt(id), formData);
        toast.success("Baby updated successfully");
      } else {
        await babyService.create(formData);
        toast.success("Baby registered successfully");
      }
      navigate("/babies");
    } catch (error) {
      toast.error(isEditing ? "Failed to update baby" : "Failed to register baby");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/babies">
          <Button variant="ghost" size="icon">
            &larr;
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Baby" : "Register New Baby"}</h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update baby information" : "Fill in the baby details"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Baby Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Baby Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter baby's full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={handleGenderChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianName">Guardian Name *</Label>
                <Input
                  id="guardianName"
                  name="guardianName"
                  placeholder="Parent/guardian name"
                  value={formData.guardianName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Contact phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Full address (optional)"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                name="notes"
                placeholder="Any additional notes (optional)"
                value={formData.notes || ""}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-end mt-6">
          <Button type="button" variant="outline" onClick={() => navigate("/babies")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : isEditing ? "Update Baby" : "Register Baby"}
          </Button>
        </div>
      </form>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { babyService } from "@/services/babyService";
import type { Baby } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Baby as BabyIcon, Search, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function BabiesPage() {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadBabies();
  }, []);

  const loadBabies = async () => {
    try {
      const data = await babyService.getAll();
      setBabies(data);
    } catch (error) {
      toast.error("Failed to load babies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadBabies();
      return;
    }
    setIsSearching(true);
    try {
      const data = await babyService.search(searchQuery);
      setBabies(data);
    } catch (error) {
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this baby?")) return;
    try {
      await babyService.delete(id);
      toast.success("Baby deleted successfully");
      loadBabies();
    } catch (error) {
      toast.error("Failed to delete baby");
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Babies</h1>
          <p className="text-muted-foreground">Manage all registered babies</p>
        </div>
        <Link to="/babies/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Baby
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit" variant="secondary" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setSearchQuery("");
                  loadBabies();
                }}
              >
                Clear
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {babies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BabyIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No babies found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Get started by adding your first baby"}
            </p>
            {!searchQuery && (
              <Link to="/babies/new">
                <Button>Add Baby</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Baby Records ({babies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Vaccines</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {babies.map((baby) => (
                  <TableRow key={baby.id}>
                    <TableCell className="font-medium">
                      <Link to={`/babies/${baby.id}`} className="hover:underline">
                        {baby.name}
                      </Link>
                    </TableCell>
                    <TableCell>{baby.age}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{baby.gender}</Badge>
                    </TableCell>
                    <TableCell>{baby.guardianName}</TableCell>
                    <TableCell>{baby.phoneNumber}</TableCell>
                    <TableCell>
                      <Badge>{baby.vaccineCount} vaccines</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/babies/${baby.id}`}>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(baby.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
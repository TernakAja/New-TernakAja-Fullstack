"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  Download,
  Filter,
  Heart,
  MoreHorizontal,
  Plus,
  Search,
  Thermometer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { SensorDataWithLivestock } from "@/model/dataSchemas";
import { LivestockWithSensorData } from "@/model/livestock_sensor";

function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

export default function LivestockList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [livestock, setLivestock] = useState<LivestockWithSensorData[]>([]);

  const filteredLivestock = livestock.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.species
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || animal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    async function fetchLivestock() {
      try {
        const response = await fetch("/api/livestock/sensor");
        const result = await response.json();

        if (response.ok) {
          console.log("Fetched livestock data:", result.data);
          setLivestock(result.data);
        } else {
          console.error("Failed to fetch livestock:", result.error);
        }
      } catch (error) {
        console.error("Error fetching livestock:", error);
      }
    }

    fetchLivestock();
  }, []);

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Livestock List
          </h1>
          <p className="text-muted-foreground">
            Monitor, manage, and track your livestock health data.
          </p>
        </div>

        <Button
          className="bg-primary text-primary-foreground hover:opacity-90"
          onClick={() => router.push("/dashboard/livestock/add")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Livestock
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Healthy
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {livestock.filter((a) => a.status === "Healthy").length}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-destructive/10 p-2 rounded-full">
                <Heart className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  Unhealthy
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {livestock.filter((a) => a.status === "Unhealthy").length}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <CardTitle>Livestock Inventory</CardTitle>
            <CardDescription className="text-muted-foreground">
              View and manage all livestock records in your farm.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search livestock by name or species..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      Filter by Status
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Healthy")}>
                      Healthy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Unhealthy")}>
                      Unhealthy
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Animal</TableHead>
                    <TableHead>Species / Breed</TableHead>
                    <TableHead>Gender / Birth Date</TableHead>
                    <TableHead>Status</TableHead>
                    {/* <TableHead>Location</TableHead> */}
                    <TableHead>Vital Signs</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredLivestock.map((animal) => (
                    <TableRow
                      key={animal.id}
                      onClick={() => router.push(`/dashboard/livestock/${animal.id}`)}
                    >
                      <TableCell>{animal.id}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={animal.photo_url || "/placeholder.svg"} />
                            <AvatarFallback>
                              {animal.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">
                            {animal.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>{animal.species}</div>
                        <div className="text-sm text-muted-foreground">
                          {animal.breed}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>{animal.gender}</div>
                        <div className="text-sm text-muted-foreground">
                          {animal.birth_date}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={
                            animal.status === "Healthy"
                              ? "bg-primary text-primary-foreground"
                              : "bg-destructive text-destructive-foreground"
                          }
                        >
                          {animal.status}
                        </Badge>
                      </TableCell>

                      {/* <TableCell>
                        {`Farm ${animal.farmId}`}
                      </TableCell> */}

                      <TableCell>
                        {animal.sensor_id ? (
                          <>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-destructive" />
                              {roundToTwoDecimals(animal.heart_rate??0) ?? "N/A"}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Thermometer className="h-4 w-4 text-accent" />
                              {roundToTwoDecimals(animal.temperature ?? 0) ?? "N/A"}
                            </div>
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            No sensor data
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {animal?.timestamp
                          ? new Date(animal.timestamp).toLocaleDateString()
                          : "N/A"}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit record
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Health history
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
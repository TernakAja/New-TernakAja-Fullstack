"use client";

import { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { SensorDataWithLivestock } from "@/model/dataSchemas";

function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

export default function LivestockList() {
  const { t } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [livestock, setLivestock] = useState<SensorDataWithLivestock[]>([]);

  const filteredLivestock = livestock.filter((animal) => {
    const matchesSearch =
      animal.livestock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.livestock.species
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || animal.livestock.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t("dashboard.livestock.list.livestockList.header.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("dashboard.livestock.list.livestockList.header.subtitle")}
          </p>
        </div>

        <Button
          className="bg-primary text-primary-foreground hover:opacity-90"
          onClick={() => router.push("/dashboard/livestock/add")}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t("dashboard.livestock.list.livestockList.addLivestockButton")}
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
                  {t("dashboard.livestock.list.livestockList.statusCards.healthy.label")}
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {livestock.filter((a) => a.livestock.status === "Healthy").length}
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
                  {t("dashboard.livestock.list.livestockList.statusCards.unhealthy.label")}
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {livestock.filter((a) => a.livestock.status === "Unhealthy").length}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <CardTitle>
              {t("dashboard.livestock.list.livestockList.inventory.title")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("dashboard.livestock.list.livestockList.inventory.description")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("dashboard.livestock.list.livestockList.inventory.searchPlaceholder")}
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
                      {t("dashboard.livestock.list.livestockList.inventory.filterButton")}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {t("dashboard.livestock.list.livestockList.inventory.filterByStatusLabel")}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      {t("dashboard.livestock.list.livestockList.inventory.statusOptions.all")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Healthy")}>
                      {t("dashboard.livestock.list.livestockList.inventory.statusOptions.healthy")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Unhealthy")}>
                      {t("dashboard.livestock.list.livestockList.inventory.statusOptions.unhealthy")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  {t("dashboard.livestock.list.livestockList.inventory.exportButton")}
                </Button>
              </div>
            </div>

            <div className="rounded-md border border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>{t("dashboard.livestock.list.livestockList.tableHeaders.animal")}</TableHead>
                    <TableHead>{t("dashboard.livestock.list.livestockList.tableHeaders.speciesBreed")}</TableHead>
                    <TableHead>{t("dashboard.livestock.list.livestockList.tableHeaders.genderAge")}</TableHead>
                    <TableHead>{t("dashboard.livestock.list.livestockList.tableHeaders.status")}</TableHead>
                    <TableHead>{t("dashboard.livestock.list.livestockList.tableHeaders.location")}</TableHead>
                    <TableHead>{t("dashboard.livestock.list.livestockList.tableHeaders.vitalSigns")}</TableHead>
                    <TableHead>{t("dashboard.livestock.list.livestockList.tableHeaders.lastUpdated")}</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredLivestock.map((animal) => (
                    <TableRow
                      key={animal.livestock.id}
                      onClick={() => router.push(`/dashboard/livestock/${animal.livestock.id}`)}
                    >
                      <TableCell>{animal.livestock.id}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={animal.livestock.photoUrl || "/placeholder.svg"} />
                            <AvatarFallback>
                              {animal.livestock.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-foreground">
                            {animal.livestock.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>{animal.livestock.species}</div>
                        <div className="text-sm text-muted-foreground">
                          {animal.livestock.breed}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>{animal.livestock.gender}</div>
                        <div className="text-sm text-muted-foreground">
                          {animal.livestock.birthDate}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={
                            animal.livestock.status === "Healthy"
                              ? "bg-primary text-primary-foreground"
                              : "bg-destructive text-destructive-foreground"
                          }
                        >
                          {animal.livestock.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        {t("dashboard.livestock.list.livestockList.locationText", {
                          farmId: animal.livestock.farmId,
                        })}
                      </TableCell>

                      <TableCell>
                        {animal.sensor_data ? (
                          <>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4 text-destructive" />
                              {roundToTwoDecimals(animal.sensor_data.heartRate) ?? "N/A"}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Thermometer className="h-4 w-4 text-accent" />
                              {roundToTwoDecimals(animal.sensor_data.temperature) ?? "N/A"}
                            </div>
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            {t("dashboard.livestock.list.livestockList.noSensorData")}
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {animal.sensor_data?.timestamp
                          ? new Date(animal.sensor_data.timestamp).toLocaleDateString()
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
                              {t("dashboard.livestock.list.livestockList.tableActions.viewDetails")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {t("dashboard.livestock.list.livestockList.tableActions.editRecord")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {t("dashboard.livestock.list.livestockList.tableActions.healthHistory")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              {t("dashboard.livestock.list.livestockList.tableActions.archive")}
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
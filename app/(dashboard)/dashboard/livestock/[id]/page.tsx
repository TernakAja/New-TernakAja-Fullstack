"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  MilkIcon as Cow,
  Download,
  Edit,
  FileText,
  Heart,
  History,
  Info,
  Leaf,
  MapPin,
  MoreHorizontal,
  Ruler,
  Scale,
  Thermometer,
  Utensils,
  Weight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useParams } from "next/navigation"; // Adjusted for Next.js
import { LivestockWithSensorData } from "@/model/livestock_sensor";
import { DailySensorStats } from "@/model/dataSchemas";
import { getLiveStockWithSensorDataById } from "@/lib/services/livestock";
import Link from "next/link";
import { getLivestockAge, getTimeSince, roundToTwoDecimals } from "@/lib/helpers/util";
import { LineChart } from "@/components/dashboard/charts";

const defaultSensorDataWithLivestockAndAnomaly: LivestockWithSensorData = {
    id: 0,
    sensor_id: 0,
    temperature: 0,
    heart_rate: 0,
    sp02: 0,
    timestamp: new Date().toISOString(),
    user_id: "00000000-0000-0000-0000-000000000000",
    name: "",
    species: "",
    breed: "",
    gender: "male",
    birth_date: new Date().toISOString(),
    photo_url: "",
    status: "",
    height: 0,
    weight: 0,
    body_condition_score: 0,
    notes: "",
    recorded_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export default function LivestockDetail() {
  const params = useParams();
  const id = params?.id as string;
  
  const [livestock, setLivestock] = useState<LivestockWithSensorData>(
    defaultSensorDataWithLivestockAndAnomaly
  );
  const [avgMetrics, setAvgMetrics] = useState<DailySensorStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setActiveTab] = useState("overview");

//   useEffect(() => {
//     const fetchLivestockDetail = async () => {
//       try {
//         if (!id) return;
//         const livestockResponse = await getLiveStockWithSensorDataById(parseInt(id));
//         const metricsResponse = await getSevenDayAverageById(parseInt(id));
        
//         if (livestockResponse.data) setLivestock(livestockResponse.data);
//         if (metricsResponse.data) setAvgMetrics(metricsResponse.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLivestockDetail();
//   }, [id]);

  return (
    <div className="space-y-6 text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/livestock">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            Livestock Details
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1 border-border">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="gap-1 border-border text-primary">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem>Print record</DropdownMenuItem>
              <DropdownMenuItem>Share record</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive font-semibold">
                Archive record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32 ring-4 ring-sidebarprimary/20">
                    <AvatarImage src={livestock.photo_url || "/placeholder.svg"} alt={livestock.name} />
                    <AvatarFallback className="text-4xl bg-muted">{livestock.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute bottom-0 right-0 p-1 rounded-full",
                    livestock.status === "Healthy" ? "bg-sidebaraccent" : 
                    livestock.status === "Attention" ? "bg-accent" : "bg-destructive"
                  )}>
                    {livestock.status === "Healthy" ? <CheckCircle2 className="h-5 w-5 text-sidebaraccent-foreground" /> : <AlertTriangle className="h-5 w-5 text-white" />}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-1 text-foreground">{livestock.name}</h2>
                <div className="text-muted-foreground text-sm mb-2">ID: {livestock.id}</div>
                
                <Badge className={cn(
                  livestock.status === "Healthy" ? "bg-sidebaraccent text-sidebaraccent-foreground" : 
                  livestock.status === "Attention" ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"
                )}>
                  {livestock.status}
                </Badge>

                <div className="w-full mt-6 space-y-4">
                  <DetailRow icon={<Cow className="h-4 w-4" />} label="Species" value={livestock.species} />
                  <DetailRow icon={<Info className="h-4 w-4" />} label="Breed" value={livestock.breed} />
                  <DetailRow icon={<Calendar className="h-4 w-4" />} label="Birth date" value={livestock.birth_date} />
                  <DetailRow icon={<Clock className="h-4 w-4" />} label="Age" value={`${getLivestockAge(livestock.birth_date)} years`} />
                  <DetailRow icon={<Weight className="h-4 w-4" />} label="Weight" value={`${livestock.weight} kg`} />
                </div>

                <div className="w-full border-t border-border mt-6 pt-6 text-xs text-muted-foreground">
                  Last updated {getTimeSince(livestock.timestamp ?? new Date())}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Content */}
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="h-full border-border">
            <CardHeader className="pb-3">
              <Tabs defaultValue="overview" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 bg-muted border border-border">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="production">Production</TabsTrigger>
                  <TabsTrigger value="genetics">Genetics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <VitalCard icon={<Heart className="h-4 w-4 text-destructive" />} title="Heart Rate" value={roundToTwoDecimals(livestock.heart_rate ?? 0)} unit="BPM" />
                    <VitalCard icon={<Thermometer className="h-4 w-4 text-accent" />} title="Temperature" value={roundToTwoDecimals(livestock.temperature ?? 0)} unit="°F" />
                    <VitalCard icon={<Activity className="h-4 w-4 text-blue-500" />} title="Oxygen Saturation" value={roundToTwoDecimals(livestock.sp02 ?? 0)} unit="%" />
                  </div>

                  <Card className="bg-card/50">
                    <CardHeader>
                      <CardTitle>Vital Signs Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                      {avgMetrics.length > 0 ? <LineChart dailySensorStats={avgMetrics} /> : <NoDataPlaceholder />}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Utensils className="h-5 w-5 text-primary" /> Feeding Info</CardTitle></CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Diet:</span> Mixed forage and concentrate</p>
                        <p><span className="text-muted-foreground">Schedule:</span> Twice daily</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Notes</CardTitle></CardHeader>
                      <CardContent className="text-sm text-muted-foreground">{livestock.notes}</CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

    </div>
  );
}

// Sub-components for cleaner code
function DetailRow({ icon, label, value }: { icon: any, label: string, value: any }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon} <span>{label}</span>
      </div>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function VitalCard({ icon, title, value, unit }: { icon: any, title: string, value: any, unit: string }) {
  return (
    <Card className="bg-muted/50 border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium flex items-center gap-2">{icon} {title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold text-foreground">{value} <span className="text-sm font-normal text-muted-foreground">{unit}</span></div>
      </CardContent>
    </Card>
  );
}

function NoDataPlaceholder() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
      <Activity className="h-10 w-10 mb-2 text-primary/40" />
      <p className="font-semibold">No sensor data available</p>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
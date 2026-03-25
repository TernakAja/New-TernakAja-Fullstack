interface SpeciesCount {
  species: string;
  total: number;
}

interface DailySensorStats {
  day: string;
  avg_temperature: number;
  avg_heart_rate: number;
}

interface RecentAvgSensorData {
  avgHeartRate: string;
  avgTemperature: number;
  avgSp02: number;
}
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { WeatherChart } from "@/components/weather/WeatherChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type WeatherData = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  windDir: number;
  hourlyrainin: number;
  dailyrainin: number;
  weeklyrainin: number;
  monthlyrainin: number;
  feelsLike: number;
  dewPoint: number;
  lastRain: string;
};

export default function Weather() {
  const { data, isLoading } = useQuery<WeatherData>({
    queryKey: ["/api/weather"],
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const metrics = data ? [
    {
      label: "Temperature",
      value: data.temperature,
      unit: "°F",
      icon: "temperature"
    },
    {
      label: "Feels Like",
      value: data.feelsLike,
      unit: "°F",
      icon: "temperature"
    },
    {
      label: "Humidity",
      value: data.humidity,
      unit: "%",
      icon: "humidity"
    },
    {
      label: "Wind Speed",
      value: data.windSpeed,
      unit: "mph",
      icon: "wind"
    },
    {
      label: "Pressure",
      value: data.pressure,
      unit: "inHg",
      icon: "pressure"
    },
    {
      label: "Dew Point",
      value: data.dewPoint,
      unit: "°F",
      icon: "temperature"
    }
  ] : [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Weather Station</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Conditions</TabsTrigger>
          <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <WeatherCard key={metric.label} metric={metric} />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>24-Hour Temperature Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precipitation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <WeatherCard
              metric={{
                label: "Hourly Rain",
                value: data?.hourlyrainin || 0,
                unit: "in",
                icon: "rain"
              }}
            />
            <WeatherCard
              metric={{
                label: "Daily Rain",
                value: data?.dailyrainin || 0,
                unit: "in",
                icon: "rain"
              }}
            />
            <WeatherCard
              metric={{
                label: "Weekly Rain",
                value: data?.weeklyrainin || 0,
                unit: "in",
                icon: "rain"
              }}
            />
            <WeatherCard
              metric={{
                label: "Monthly Rain",
                value: data?.monthlyrainin || 0,
                unit: "in",
                icon: "rain"
              }}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rainfall History</CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherChart type="precipitation" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
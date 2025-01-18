import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to My Site</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore my blog posts, gallery items, and check out real-time weather data
          from my personal weather station.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Blog</h2>
            <p className="text-muted-foreground">
              Read my latest thoughts and articles on various topics.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Gallery</h2>
            <p className="text-muted-foreground">
              Browse through my collection of interesting images and content.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Weather Station</h2>
            <p className="text-muted-foreground">
              View real-time data from my personal weather station.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

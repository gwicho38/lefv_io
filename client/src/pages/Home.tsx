import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative -mx-4 -mt-8 flex items-center justify-center min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://www.lefv.io/assets/backgrounds/vbg.webm"
              type="video/webm"
            />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative text-center space-y-4 text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Welcome to My Site
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore my blog posts, gallery items, and check out real-time weather data
            from my personal weather station.
          </p>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/blog">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-2">Blog</h2>
                <p className="text-muted-foreground">
                  Read my latest thoughts and articles on various topics.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/gallery">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-2">Gallery</h2>
                <p className="text-muted-foreground">
                  Browse through my collection of interesting images and content.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/weather">
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-2">Weather Station</h2>
                <p className="text-muted-foreground">
                  View real-time data from my personal weather station.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
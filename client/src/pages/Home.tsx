import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative -mx-4 -mt-8 flex items-center justify-center min-h-[60vh] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            src="https://www.lexaloffle.com/bbs/widget.php?pid=picochill"
            allowFullScreen
            className="w-full h-full"
            style={{ maxWidth: '800px', maxHeight: '600px' }}
          ></iframe>
        </div>

        <div className="relative text-center space-y-4 text-white px-4 mt-[400px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            lefv.io
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
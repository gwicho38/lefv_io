import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <section className="relative -mx-4 -mt-8 flex items-center justify-center h-full bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe
            src="https://www.lexaloffle.com/bbs/widget.php?pid=picochill"
            allowFullScreen
            className="w-full h-full"
            style={{ maxWidth: '800px', maxHeight: '600px' }}
          ></iframe>
        </div>

        <div className="relative text-center text-white px-4 mt-[400px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            lefv.io
          </h1>
        </div>
      </section>
    </div>
  );
}
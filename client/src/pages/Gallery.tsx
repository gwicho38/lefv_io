import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Urban Exploration",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
    description: "City lights and urban landscapes"
  },
  {
    id: 2,
    title: "Night Photography",
    imageUrl: "https://images.unsplash.com/photo-1507643179773-3e975d7ac515",
    description: "Long exposure cityscapes"
  },
  {
    id: 3,
    title: "Community",
    imageUrl: "https://images.unsplash.com/photo-1658314756268-3552b9ba2784",
    description: "People and connections"
  },
  {
    id: 4,
    title: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1534103704502-96e3a4ed093b",
    description: "Modern architectural designs"
  }
];

export default function Gallery() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["/api/gallery"],
    initialData: GALLERY_ITEMS
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

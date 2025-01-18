import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type GalleryItem = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
};

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedItem(item)}
          >
            <AspectRatio ratio={16/9}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </AspectRatio>
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedItem.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <AspectRatio ratio={16/9}>
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="object-cover w-full h-full rounded-md"
                />
              </AspectRatio>
              <p className="text-muted-foreground">
                {selectedItem.description}
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

export default GalleryGrid;

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Tag = {
  id: number;
  name: string;
};

type TagCloudProps = {
  selectedTags: string[];
  onTagClick: (tagName: string) => void;
};

export function TagCloud({ selectedTags, onTagClick }: TagCloudProps) {
  const { data: tags, isLoading } = useQuery<Tag[]>({
    queryKey: ["/api/tags"],
  });

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-16" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => (
        <Badge
          key={tag.id}
          variant={selectedTags.includes(tag.name) ? "default" : "secondary"}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onTagClick(tag.name)}
        >
          {tag.name}
          {selectedTags.includes(tag.name) && (
            <span className="ml-1 text-xs">×</span>
          )}
        </Badge>
      ))}
    </div>
  );
}

export default TagCloud;

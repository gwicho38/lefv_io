import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BlogPost } from "@/components/blog/BlogPost";
import { TagCloud } from "@/components/blog/TagCloud";

type Tag = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  tags: Tag[];
};

export default function Blog() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const handleTagClick = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  const filteredPosts = posts?.filter(post => 
    selectedTags.length === 0 || 
    post.tags?.some(tag => selectedTags.includes(tag.name))
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-40" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
      </div>

      <div className="space-y-4">
        <TagCloud
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />

        <div className="space-y-6">
          {filteredPosts?.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}

          {filteredPosts?.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No posts found for the selected tags.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
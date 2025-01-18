import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Tag = {
  id: number;
  name: string;
};

type BlogPostProps = {
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    tags?: Tag[];
  };
};

export function BlogPost({ post }: BlogPostProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {format(new Date(post.createdAt), "MMMM d, yyyy")}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogPost;

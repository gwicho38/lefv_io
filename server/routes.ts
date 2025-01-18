import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { posts, tags, postTags, galleries } from "@db/schema";
import { eq, desc, and } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Blog routes
  app.get("/api/posts", async (req, res) => {
    const allPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      with: {
        postTags: {
          with: {
            tag: true
          }
        }
      }
    });

    // Transform the data to match the expected format
    const transformedPosts = allPosts.map(post => ({
      ...post,
      tags: post.postTags.map(pt => pt.tag)
    }));

    res.json(transformedPosts);
  });

  app.post("/api/posts", async (req, res) => {
    const { title, content, tags: tagNames } = req.body;
    const post = await db.insert(posts).values({ title, content }).returning();

    if (tagNames?.length) {
      for (const tagName of tagNames) {
        // Insert or get existing tag
        const [tag] = await db.insert(tags)
          .values({ name: tagName })
          .onConflictDoUpdate({ target: tags.name, set: { name: tagName } })
          .returning();

        // Create post-tag relationship
        await db.insert(postTags)
          .values({ postId: post[0].id, tagId: tag.id });
      }
    }

    res.json(post[0]);
  });

  app.get("/api/tags", async (req, res) => {
    const allTags = await db.query.tags.findMany();
    res.json(allTags);
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    const items = await db.query.galleries.findMany({
      orderBy: [desc(galleries.createdAt)]
    });
    res.json(items);
  });

  app.post("/api/gallery", async (req, res) => {
    const { title, imageUrl, description } = req.body;
    const item = await db.insert(galleries)
      .values({ title, imageUrl, description })
      .returning();
    res.json(item[0]);
  });

  // Weather route
  app.get("/api/weather", async (req, res) => {
    try {
      if (!process.env.AMBIENT_API_KEY || !process.env.AMBIENT_APP_KEY) {
        return res.status(500).json({ error: "Weather API keys not configured" });
      }

      const response = await fetch(
        `https://api.ambientweather.net/v1/devices?apiKey=${process.env.AMBIENT_API_KEY}&applicationKey=${process.env.AMBIENT_APP_KEY}`
      );

      if (!response.ok) {
        throw new Error('Weather API request failed');
      }

      const data = await response.json();
      res.json(data[0]?.lastData || {
        temperature: 0,
        humidity: 0,
        windSpeed: 0,
        pressure: 0
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
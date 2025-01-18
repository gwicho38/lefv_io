import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { posts, tags, postTags, galleries } from "@db/schema";
import { eq, desc, and } from "drizzle-orm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chokidar from "chokidar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const POSTS_DIRECTORY = path.join(__dirname, "../content/blog");

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIRECTORY)) {
  fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
}

// Watch for file changes in the posts directory
const watcher = chokidar.watch(POSTS_DIRECTORY, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

// Function to process markdown files and update database
async function processMarkdownFile(filePath: string) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const html = marked(content);

    // Insert or update post in database
    const [post] = await db.insert(posts).values({
      title: data.title || path.basename(filePath, '.md'),
      content: html,
      createdAt: data.date ? new Date(data.date) : new Date(),
      updatedAt: new Date()
    }).onConflictDoUpdate({
      target: posts.title,
      set: {
        content: html,
        updatedAt: new Date()
      }
    }).returning();

    // Process tags if present
    if (data.tags && Array.isArray(data.tags)) {
      // First remove existing tags for this post
      await db.delete(postTags).where(eq(postTags.postId, post.id));

      // Add new tags
      for (const tagName of data.tags) {
        const [tag] = await db.insert(tags)
          .values({ name: tagName })
          .onConflictDoUpdate({ target: tags.name, set: { name: tagName } })
          .returning();

        await db.insert(postTags)
          .values({ postId: post.id, tagId: tag.id });
      }
    }
  } catch (error) {
    console.error(`Error processing markdown file: ${filePath}`, error);
  }
}

// Watch for changes in markdown files
watcher
  .on('add', processMarkdownFile)
  .on('change', processMarkdownFile)
  .on('unlink', async (filePath) => {
    const fileName = path.basename(filePath, '.md');
    await db.delete(posts).where(eq(posts.title, fileName));
  });

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

  // Enhanced weather route with more data points
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
      const lastData = data[0]?.lastData;

      if (!lastData) {
        return res.status(404).json({ error: "No weather data available" });
      }

      res.json({
        temperature: lastData.tempf || 0,
        humidity: lastData.humidity || 0,
        windSpeed: lastData.windspeedmph || 0,
        pressure: lastData.baromrelin || 0,
        windDir: lastData.winddir || 0,
        hourlyrainin: lastData.hourlyrainin || 0,
        dailyrainin: lastData.dailyrainin || 0,
        weeklyrainin: lastData.weeklyrainin || 0,
        monthlyrainin: lastData.monthlyrainin || 0,
        feelsLike: lastData.feelsLike || lastData.tempf || 0,
        dewPoint: lastData.dewPoint || 0,
        lastRain: lastData.lastRain || null
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  app.get("/api/weather/history/:type", async (req, res) => {
    try {
      if (!process.env.AMBIENT_API_KEY || !process.env.AMBIENT_APP_KEY || !process.env.AMBIENT_MAC_ADDRESS) {
        return res.status(500).json({ error: "Weather API keys or MAC address not configured" });
      }

      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

      const response = await fetch(
        `https://api.ambientweather.net/v1/devices/${process.env.AMBIENT_MAC_ADDRESS}/data?` +
        `apiKey=${process.env.AMBIENT_API_KEY}&` +
        `applicationKey=${process.env.AMBIENT_APP_KEY}&` +
        `endDate=${endDate.toISOString()}&` +
        `startDate=${startDate.toISOString()}`
      );

      if (!response.ok) {
        throw new Error('Weather history API request failed');
      }

      const data = await response.json();
      const transformedData = data.map((point: any) => ({
        timestamp: new Date(point.dateutc).getTime(),
        [req.params.type === 'temperature' ? 'temperature' : 'precipitation']:
          req.params.type === 'temperature' ? point.tempf : point.hourlyrainin
      }));

      res.json(transformedData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch historical weather data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
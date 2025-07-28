import { component$ } from "@builder.io/qwik";
import { Card } from "../Card";
import { Button } from "../../button/Button";

/**
 * MediaCardExample - Cards with images/videos using noPadding
 * 
 * This example demonstrates:
 * - Full-width media content using noPadding
 * - Image and video integration
 * - Mixed content layouts
 * - Media-focused card designs
 */
export const MediaCardExample = component$(() => {
  return (
    <div class="space-y-6 p-4">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Media Card Examples</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Showcase cards with full-width images, videos, and mixed media content using the noPadding prop.
      </p>

      {/* Image Cards with Different Layouts */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full-width image card */}
        <Card variant="elevated" noPadding>
          {/* Image header */}
          <div class="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-6xl mb-2">📸</div>
              <p class="text-lg font-medium">Beautiful Landscape</p>
            </div>
          </div>
          
          {/* Content with padding */}
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2">Mountain Photography</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Captured during a sunrise hike in the Rocky Mountains. The perfect blend of natural
              lighting and stunning scenery creates an unforgettable image.
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <span class="text-sm text-gray-600 dark:text-gray-400">John Photographer</span>
              </div>
              <Button size="sm" variant="outline">View Gallery</Button>
            </div>
          </div>
        </Card>

        {/* Video card */}
        <Card variant="elevated" noPadding>
          {/* Video placeholder */}
          <div class="aspect-video bg-black flex items-center justify-center relative">
            <div class="text-white text-center">
              <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p class="text-lg font-medium">Product Demo</p>
            </div>
            <div class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              LIVE
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-2">Live Product Demonstration</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Watch our expert demonstrate the key features and benefits of our latest product
              in this interactive live session.
            </p>
            <div class="flex items-center gap-4">
              <Button variant="primary">Join Stream</Button>
              <span class="text-sm text-gray-500 dark:text-gray-400">1,234 viewers</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Article Cards with Featured Images */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            id: 1,
            title: "The Future of Web Development",
            excerpt: "Exploring emerging trends and technologies that will shape the web development landscape in the coming years.",
            category: "Technology",
            readTime: "5 min read",
            color: "from-green-400 to-blue-500",
            icon: "💻"
          },
          {
            id: 2,
            title: "Design Systems Best Practices",
            excerpt: "Learn how to create and maintain scalable design systems that improve development efficiency.",
            category: "Design",
            readTime: "8 min read",
            color: "from-purple-400 to-pink-500",
            icon: "🎨"
          },
          {
            id: 3,
            title: "Performance Optimization Tips",
            excerpt: "Practical strategies to improve your application's performance and user experience.",
            category: "Performance",
            readTime: "6 min read",
            color: "from-orange-400 to-red-500",
            icon: "⚡"
          }
        ].map((article) => (
          <Card key={article.id} variant="elevated" noPadding class="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            {/* Featured image with overlay */}
            <div class={`aspect-[4/3] bg-gradient-to-br ${article.color} relative overflow-hidden`}>
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-6xl text-white/80">{article.icon}</div>
              </div>
              <div class="absolute top-4 left-4">
                <span class="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {article.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{article.readTime}</span>
                <button class="text-primary-600 dark:text-primary-400 hover:underline">
                  Read More
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Profile Card with Background */}
      <Card variant="gradient" noPadding>
        <div class="relative">
          {/* Background pattern */}
          <div class="absolute inset-0 opacity-10">
            <div 
              class="w-full h-full bg-repeat" 
              style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
              }}
            ></div>
          </div>
          
          <div class="relative p-8">
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span class="text-3xl">👨‍💼</span>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-white mb-1">Alex Johnson</h3>
                <p class="text-white/90 mb-2">Senior Product Manager</p>
                <p class="text-white/80 text-sm">
                  Leading product strategy and innovation for next-generation applications
                </p>
              </div>
            </div>
            
            <div class="mt-6 flex gap-4">
              <Button variant="secondary" size="sm">
                Connect
              </Button>
              <Button variant="outline" size="sm" class="border-white/30 text-white hover:bg-white/10">
                Message
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Gallery Card */}
      <Card variant="bordered" hasHeader noPadding>
        <div q:slot="header" class="px-6">
          <h3 class="font-semibold">Photo Gallery</h3>
        </div>
        
        {/* Image grid */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            "from-red-400 to-pink-500",
            "from-blue-400 to-purple-500",
            "from-green-400 to-teal-500",
            "from-yellow-400 to-orange-500",
            "from-indigo-400 to-purple-500",
            "from-pink-400 to-red-500",
            "from-teal-400 to-green-500",
            "from-orange-400 to-yellow-500"
          ].map((gradient, index) => (
            <div
              key={index}
              class={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity`}
            >
              <span class="text-white text-2xl">{index + 1}</span>
            </div>
          ))}
        </div>
        
        <div class="p-6">
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
            A collection of stunning photographs from our recent photography workshop.
            Click on any image to view in full resolution.
          </p>
          <Button variant="primary" fullWidth>
            View All Photos
          </Button>
        </div>
      </Card>

      {/* Usage Tips */}
      <Card variant="info" hasHeader>
        <div q:slot="header">
          <h3 class="font-semibold">Media Card Best Practices</h3>
        </div>
        
        <ul class="space-y-2 text-sm">
          <li class="flex items-start gap-2">
            <span class="text-info-600 dark:text-info-400 mt-0.5">•</span>
            <span>
              Use <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">noPadding</code> for full-width media content
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-info-600 dark:text-info-400 mt-0.5">•</span>
            <span>Add padding back to content sections that need it</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-info-600 dark:text-info-400 mt-0.5">•</span>
            <span>Consider aspect ratios for consistent layouts (aspect-video, aspect-square)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-info-600 dark:text-info-400 mt-0.5">•</span>
            <span>Use overlay techniques for text on images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-info-600 dark:text-info-400 mt-0.5">•</span>
            <span>Implement hover effects to enhance interactivity</span>
          </li>
        </ul>
      </Card>
    </div>
  );
});
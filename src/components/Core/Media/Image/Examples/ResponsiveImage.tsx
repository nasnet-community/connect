import { component$ } from "@builder.io/qwik";
import { Image } from "../Image";

export const ResponsiveImage = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Responsive with srcset</h3>
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
          alt="Code on screen"
          srcset="
            https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400 400w,
            https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800 800w,
            https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200 1200w
          "
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
          class="w-full"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Picture Element with Sources</h3>
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
          alt="Laptop workspace"
          sources={[
            {
              src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&fm=webp",
              type: "image/webp",
              media: "(min-width: 1024px)",
            },
            {
              src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&fm=webp",
              type: "image/webp",
              media: "(min-width: 640px)",
            },
            {
              src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&fm=webp",
              type: "image/webp",
            },
          ]}
          class="w-full"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Error Handling with Fallback</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="mb-2 text-sm">Broken Image with Retry</p>
            <Image
              src="https://broken-url.example.com/image.jpg"
              alt="Broken image"
              fallbackSrc="https://via.placeholder.com/400x300/cccccc/666666?text=Fallback+Image"
              fallbackAlt="Fallback placeholder"
              width={400}
              height={300}
              retryOnError
              maxRetries={2}
              class="w-full"
            />
          </div>
          <div>
            <p class="mb-2 text-sm">Working Image</p>
            <Image
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400"
              alt="Coding"
              width={400}
              height={300}
              class="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

import { component$ } from "@builder.io/qwik";
import { Image } from "../Image";

export const LazyLoadingImage = component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="mb-4 text-lg font-semibold">Lazy Loading with Skeleton</h3>
        <p class="mb-4 text-sm text-gray-600">
          Scroll down to see images load lazily
        </p>

        <div class="space-y-4">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
            alt="Mountains"
            width={800}
            height={400}
            loading="lazy"
            placeholder="skeleton"
            class="w-full"
          />
          <div class="h-96" /> {/* Spacer */}
          <Image
            src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800"
            alt="Forest"
            width={800}
            height={400}
            loading="lazy"
            placeholder="skeleton"
            class="w-full"
          />
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Lazy Loading with Spinner</h3>
        <Image
          src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800"
          alt="Beach sunset"
          width={800}
          height={400}
          loading="lazy"
          placeholder="spinner"
          spinnerSize="lg"
          class="w-full"
        />
      </div>

      <div>
        <h3 class="mb-4 text-lg font-semibold">Priority Loading (No Lazy)</h3>
        <Image
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800"
          alt="Landscape"
          width={800}
          height={400}
          priority
          placeholder="blur"
          placeholderSrc="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
          class="w-full"
        />
      </div>
    </div>
  );
});

import { component$ } from "@builder.io/qwik";
import { AspectRatio } from "..";

/**
 * Video and iframe AspectRatio examples demonstrating media content usage
 */
export const VideoAspectRatioExamples = component$(() => {
  return (
    <div class="space-y-8 p-4">
      <h2 class="mb-4 text-2xl font-bold">
        Video & Media AspectRatio Examples
      </h2>

      {/* Video Element Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">HTML5 Video Elements</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Standard Video */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Standard Video (16:9)</h4>
            <AspectRatio ratio="video">
              <video
                controls
                class="h-full w-full"
                poster="https://via.placeholder.com/1920x1080/1e40af/ffffff?text=Video+Poster"
              >
                <source src="movie.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>

          {/* Ultrawide Video */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Cinematic Video (21:9)</h4>
            <AspectRatio ratio="ultrawide" bgColor="#000">
              <video
                controls
                class="h-full w-full"
                poster="https://via.placeholder.com/2100x900/dc2626/ffffff?text=Cinematic+Video"
              >
                <source src="cinematic.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>

          {/* Square Video for Social Media */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Social Media Video (1:1)</h4>
            <AspectRatio ratio="square" maxWidth="400px">
              <video
                controls
                class="h-full w-full"
                poster="https://via.placeholder.com/1080x1080/7c3aed/ffffff?text=Square+Video"
              >
                <source src="social.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>

          {/* Portrait Video */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Mobile Video (9:16)</h4>
            <AspectRatio ratio="portrait" maxWidth="300px">
              <video
                controls
                class="h-full w-full"
                poster="https://via.placeholder.com/1080x1920/059669/ffffff?text=Mobile+Video"
              >
                <source src="mobile.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* YouTube Embed Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">YouTube Embeds</h3>
        <div class="space-y-6">
          {/* Standard YouTube Embed */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Standard YouTube Video</h4>
            <AspectRatio ratio="video" maxWidth="800px">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullscreen={true}
                class="h-full w-full"
              />
            </AspectRatio>
          </div>

          {/* YouTube Playlist */}
          <div>
            <h4 class="mb-2 text-sm font-medium">YouTube Playlist</h4>
            <AspectRatio ratio="video" maxWidth="600px">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf"
                title="YouTube playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullscreen={true}
                class="h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Vimeo Embed Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Vimeo Embeds</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Standard Vimeo */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Vimeo Video</h4>
            <AspectRatio ratio="video">
              <iframe
                src="https://player.vimeo.com/video/76979871?h=8272103f6e"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullscreen={true}
                class="h-full w-full"
              />
            </AspectRatio>
          </div>

          {/* Vimeo with Background */}
          <div>
            <h4 class="mb-2 text-sm font-medium">
              Vimeo with Custom Background
            </h4>
            <AspectRatio ratio="video" bgColor="#1a1a1a">
              <iframe
                src="https://player.vimeo.com/video/76979871?h=8272103f6e&color=ffffff"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullscreen={true}
                class="h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Other Media Embeds */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Other Media Embeds</h3>
        <div class="space-y-6">
          {/* Google Maps */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Google Maps Embed</h4>
            <AspectRatio ratio="landscape" maxWidth="700px">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.361676931492!2d-74.00601798459418!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1644262070385!5m2!1sen!2sus"
                width="600"
                height="450"
                style="border:0;"
                allowFullscreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                class="h-full w-full"
              />
            </AspectRatio>
          </div>

          {/* CodePen Embed */}
          <div>
            <h4 class="mb-2 text-sm font-medium">CodePen Embed</h4>
            <AspectRatio ratio="landscape" maxWidth="600px">
              <iframe
                height="300"
                style="width: 100%;"
                scrolling="no"
                title="CSS Animation"
                src="https://codepen.io/team/codepen/embed/preview/PNaGbb"
                frameBorder="no"
                loading="lazy"
                allowTransparency={true}
                allowFullscreen={true}
                class="h-full w-full"
              />
            </AspectRatio>
          </div>

          {/* Spotify Embed */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Spotify Playlist</h4>
            <AspectRatio customRatio={1} maxWidth="400px">
              <iframe
                style="border-radius:12px"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullscreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                class="h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Video with Overlay Examples */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Videos with Overlays</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Video with Play Button Overlay */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Video with Play Overlay</h4>
            <AspectRatio ratio="video">
              <div class="relative h-full w-full">
                <img
                  src="https://via.placeholder.com/1920x1080/4b5563/ffffff?text=Video+Thumbnail"
                  alt="Video thumbnail"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <button class="flex h-20 w-20 items-center justify-center rounded-full bg-white bg-opacity-90 transition-all hover:bg-opacity-100">
                    <svg
                      class="ml-1 h-8 w-8 text-gray-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
              </div>
            </AspectRatio>
          </div>

          {/* Video with Title Overlay */}
          <div>
            <h4 class="mb-2 text-sm font-medium">Video with Title Overlay</h4>
            <AspectRatio ratio="video">
              <div class="relative h-full w-full">
                <video
                  class="h-full w-full object-cover"
                  poster="https://via.placeholder.com/1920x1080/1e293b/ffffff?text=Video+Background"
                  muted
                  loop
                >
                  <source src="background.mp4" type="video/mp4" />
                </video>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 class="mb-2 text-2xl font-bold">Video Title</h3>
                    <p class="text-sm opacity-90">
                      Duration: 3:45 | Views: 1.2M
                    </p>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Responsive Video Gallery */}
      <section>
        <h3 class="mb-3 text-xl font-semibold">Responsive Video Gallery</h3>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num}>
              <AspectRatio
                ratio="video"
                class="transition-shadow hover:shadow-lg"
              >
                <div class="group relative h-full w-full cursor-pointer">
                  <img
                    src={`https://via.placeholder.com/640x360/random?text=Video+${num}`}
                    alt={`Video ${num}`}
                    class="h-full w-full object-cover"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all group-hover:bg-opacity-40">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100">
                      <svg
                        class="ml-0.5 h-5 w-5 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

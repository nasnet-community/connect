import { component$, useSignal, $ } from "@builder.io/qwik";
import { PromoBanner } from "../PromoBanner";

/**
 * Responsive PromoBanner examples showing different layouts and mobile optimizations
 */
export const ResponsivePromoBanner = component$(() => {
  const showHorizontal = useSignal(true);
  const showVertical = useSignal(true);
  const showResponsive = useSignal(true);
  const showThemed = useSignal(true);

  const mockCredentials = $((provider: string) => ({
    server: `${provider.toLowerCase()}.vpn.com`,
    username: "demo_user",
    password: "demo_pass_123",
  }));

  return (
    <div class="space-y-8 p-4">
      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Layout Variations</h3>
        
        {/* Horizontal Layout */}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">Horizontal Layout (Desktop Style)</h4>
            <button
              onClick$={() => showHorizontal.value = !showHorizontal.value}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showHorizontal.value ? "Hide" : "Show"}
            </button>
          </div>
          {showHorizontal.value && (
            <PromoBanner
              title="ExpressVPN Premium Access"
              description="Get 30 days of premium VPN service with unlimited bandwidth and access to servers worldwide."
              provider="ExpressVPN"
              imageUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop&crop=center"
              layout="horizontal"
              size="md"
              dismissible={true}
              onDismiss$={() => showHorizontal.value = false}
              imageAspectRatio="wide"
              touchOptimized={true}
              onCredentialsReceived$={async () => mockCredentials("ExpressVPN")}
            />
          )}
        </div>

        {/* Vertical Layout */}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">Vertical Layout (Mobile Style)</h4>
            <button
              onClick$={() => showVertical.value = !showVertical.value}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showVertical.value ? "Hide" : "Show"}
            </button>
          </div>
          {showVertical.value && (
            <PromoBanner
              title="NordVPN Security Suite"
              description="Advanced security features including double VPN, onion over VPN, and threat protection."
              provider="NordVPN"
              imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&crop=center"
              layout="vertical"
              size="lg"
              dismissible={true}
              onDismiss$={() => showVertical.value = false}
              imageAspectRatio="square"
              touchOptimized={true}
              onCredentialsReceived$={async () => mockCredentials("NordVPN")}
            />
          )}
        </div>

        {/* Responsive Layout */}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">Responsive Layout (Adaptive)</h4>
            <button
              onClick$={() => showResponsive.value = !showResponsive.value}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showResponsive.value ? "Hide" : "Show"}
            </button>
          </div>
          {showResponsive.value && (
            <PromoBanner
              title="Surfshark Unlimited Devices"
              description="Connect unlimited devices with one account. Perfect for families and small businesses."
              provider="Surfshark"
              imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center"
              layout="responsive"
              size="md"
              dismissible={true}
              onDismiss$={() => showResponsive.value = false}
              imageAspectRatio="wide"
              touchOptimized={true}
              surfaceElevation="elevated"
              onCredentialsReceived$={async () => mockCredentials("Surfshark")}
            />
          )}
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Theme Colors & Variants</h3>
        
        {/* Theme-colored banners */}
        <div class="space-y-4">
          <PromoBanner
            title="Special Gaming VPN Offer"
            description="Optimized servers for gaming with ultra-low latency and DDoS protection."
            provider="Gaming VPN"
            layout="responsive"
            size="sm"
            themeColors={true}
            colorVariant="success"
            surfaceElevation="elevated"
            touchOptimized={true}
            onCredentialsReceived$={async () => mockCredentials("GameVPN")}
          />

          <PromoBanner
            title="Security Alert: Upgrade Now"
            description="Your current connection may be vulnerable. Upgrade to premium protection."
            provider="Security Pro"
            layout="responsive"
            size="md"
            themeColors={true}
            colorVariant="warning"
            dismissible={true}
            onDismiss$={() => {}}
            touchOptimized={true}
          />

          <PromoBanner
            title="Enterprise VPN Solution"
            description="Advanced business features with dedicated IPs and 24/7 support."
            provider="Enterprise VPN"
            layout="responsive"
            size="lg"
            themeColors={true}
            colorVariant="info"
            surfaceElevation="elevated"
            touchOptimized={true}
            onCredentialsReceived$={async () => mockCredentials("EnterpriseVPN")}
          />
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Image Aspect Ratios</h3>
        
        <div class="grid gap-4 md:grid-cols-2">
          {/* Square Images */}
          <PromoBanner
            title="Square Format"
            description="Perfect for profile or logo display"
            provider="Square VPN"
            imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=300&fit=crop&crop=center"
            layout="vertical"
            size="sm"
            imageAspectRatio="square"
            touchOptimized={true}
          />

          {/* Portrait Images */}
          <PromoBanner
            title="Portrait Format"
            description="Great for mobile-first designs"
            provider="Portrait VPN"
            imageUrl="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=400&fit=crop&crop=center"
            layout="vertical"
            size="sm"
            imageAspectRatio="portrait"
            touchOptimized={true}
          />
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="text-lg font-semibold">Mobile-Optimized Features</h3>
        
        {/* Touch-optimized banner */}
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">Touch-Optimized Banner</h4>
            <button
              onClick$={() => showThemed.value = !showThemed.value}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              {showThemed.value ? "Hide" : "Show"}
            </button>
          </div>
          {showThemed.value && (
            <PromoBanner
              title="Mobile VPN App"
              description="Download our mobile app for seamless VPN protection on the go with one-tap connect."
              provider="Mobile VPN"
              imageUrl="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center"
              layout="responsive"
              size="lg"
              dismissible={true}
              onDismiss$={() => showThemed.value = false}
              touchOptimized={true}
              surfaceElevation="elevated"
              themeColors={true}
              colorVariant="info"
              onCredentialsReceived$={async () => mockCredentials("MobileVPN")}
            />
          )}
        </div>

        {/* Compact mobile banner */}
        <PromoBanner
          title="Quick Setup"
          description="5-minute setup with automatic configuration"
          provider="QuickVPN"
          layout="horizontal"
          size="sm"
          themeColors={true}
          colorVariant="success"
          touchOptimized={true}
          onCredentialsReceived$={async () => mockCredentials("QuickVPN")}
        />
      </div>

      <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h4 class="font-semibold text-blue-800 dark:text-blue-200">
          Responsive Behavior Features
        </h4>
        <ul class="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li>• <strong>Responsive Layout:</strong> Vertical on mobile, horizontal on desktop</li>
          <li>• <strong>Image Optimization:</strong> Proper aspect ratios and lazy loading</li>
          <li>• <strong>Touch Targets:</strong> Buttons sized for mobile interaction</li>
          <li>• <strong>Theme Integration:</strong> Consistent colors across components</li>
          <li>• <strong>Surface Elevation:</strong> Visual depth on supported devices</li>
          <li>• <strong>Dismissible:</strong> Touch-friendly dismiss buttons</li>
          <li>• <strong>Adaptive Sizing:</strong> Text and spacing adapt to screen size</li>
        </ul>
      </div>
    </div>
  );
});
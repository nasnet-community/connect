import { component$ } from "@builder.io/qwik";
import { Button } from "../Button";
import {
  HiArrowRightOutline,
  HiSparklesOutline,
  HiBoltOutline,
  HiRocketLaunchOutline,
} from "@qwikest/icons/heroicons";

export const CTAButtonExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <Button variant="cta" size="lg" rightIcon>
        Get Started Now
        <span q:slot="rightIcon">
          <HiArrowRightOutline />
        </span>
      </Button>
      <Button variant="cta" size="md" leftIcon pulse>
        <span q:slot="leftIcon">
          <HiRocketLaunchOutline />
        </span>
        Launch Your Project
      </Button>
      <Button variant="cta" radius="full" shadow>
        Try Free Trial
      </Button>
    </div>
  );
});

export const GradientButtonExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <Button variant="gradient" gradientDirection="to-r">
        Gradient Right
      </Button>
      <Button variant="gradient" gradientDirection="to-br" leftIcon>
        <span q:slot="leftIcon">
          <HiSparklesOutline />
        </span>
        Diagonal Gradient
      </Button>
      <Button variant="gradient" gradientDirection="to-t" size="lg" shadow>
        Gradient Up
      </Button>
      <Button variant="gradient" gradientDirection="to-l" radius="full">
        Circular Gradient
      </Button>
    </div>
  );
});

export const GlowButtonExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4 p-6 bg-gray-900 rounded-lg">
      <Button variant="glow" size="lg">
        Glowing Button
      </Button>
      <Button variant="glow" leftIcon>
        <span q:slot="leftIcon">
          <HiBoltOutline />
        </span>
        Power Mode
      </Button>
      <Button variant="glow" radius="full" rightIcon>
        Activate
        <span q:slot="rightIcon">
          <HiArrowRightOutline />
        </span>
      </Button>
    </div>
  );
});

export const GlassButtonExample = component$(() => {
  return (
    <div
      class="flex flex-wrap gap-4 p-6 rounded-lg"
      style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
    >
      <Button variant="glass" size="lg">
        Glass Effect
      </Button>
      <Button variant="glass" leftIcon>
        <span q:slot="leftIcon">
          <HiSparklesOutline />
        </span>
        Glassmorphism
      </Button>
      <Button variant="glass" radius="full" shadow>
        Transparent Beauty
      </Button>
    </div>
  );
});

export const ButtonSizesShowcase = component$(() => {
  return (
    <div class="space-y-4">
      <div class="flex flex-wrap items-center gap-4">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <Button variant="cta" size="xs">
          XS CTA
        </Button>
        <Button variant="cta" size="sm">
          SM CTA
        </Button>
        <Button variant="cta" size="md">
          MD CTA
        </Button>
        <Button variant="cta" size="lg">
          LG CTA
        </Button>
        <Button variant="cta" size="xl">
          XL CTA
        </Button>
      </div>
    </div>
  );
});

export const ButtonRadiusShowcase = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button radius="none">No Radius</Button>
      <Button radius="sm">Small Radius</Button>
      <Button radius="md">Medium Radius</Button>
      <Button radius="lg">Large Radius</Button>
      <Button radius="full">Full Radius</Button>
    </div>
  );
});

export const MotionButtonExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <Button variant="motion" size="lg">
        Premium Access
      </Button>
      <Button variant="motion" leftIcon>
        <span q:slot="leftIcon">
          <HiSparklesOutline />
        </span>
        Enterprise Solution
      </Button>
      <Button variant="motion" radius="lg" rightIcon>
        Get Started
        <span q:slot="rightIcon">
          <HiArrowRightOutline />
        </span>
      </Button>
      <Button variant="motion" size="xl" shadow>
        Professional Plan
      </Button>
    </div>
  );
});

export const PremiumButtonExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <Button variant="premium" size="lg">
        Premium Plan
      </Button>
      <Button variant="premium" leftIcon>
        <span q:slot="leftIcon">
          <HiSparklesOutline />
        </span>
        Exclusive Access
      </Button>
      <Button variant="premium" radius="full" rightIcon>
        Upgrade Now
        <span q:slot="rightIcon">
          <HiArrowRightOutline />
        </span>
      </Button>
    </div>
  );
});

export const InteractiveButtonExample = component$(() => {
  return (
    <div class="space-y-6">
      <div class="flex flex-wrap gap-4">
        <Button variant="primary" shadow pulse>
          Pulse Animation
        </Button>
        <Button variant="cta" shadow loading>
          Loading State
        </Button>
        <Button variant="gradient" disabled>
          Disabled Gradient
        </Button>
      </div>
      <div class="flex flex-wrap gap-4">
        <Button fullWidth variant="cta" size="lg" shadow>
          Full Width CTA Button
        </Button>
      </div>
      <div class="flex flex-wrap gap-4">
        <Button responsive variant="gradient" size="lg">
          Responsive Button
        </Button>
      </div>
    </div>
  );
});
import { component$ } from '@builder.io/qwik';
import { ProgressBar } from '~/components/Core/DataDisplay/Progress';

export const ProgressBarVariants = component$(() => {
  return (
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-sm font-medium mb-2">Color Variants</h3>
        <div class="space-y-4">
          <ProgressBar value={70} color="primary" showValue />
          <ProgressBar value={70} color="secondary" showValue />
          <ProgressBar value={70} color="success" showValue />
          <ProgressBar value={70} color="warning" showValue />
          <ProgressBar value={70} color="error" showValue />
          <ProgressBar value={70} color="info" showValue />
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Size Variants</h3>
        <div class="space-y-4">
          <ProgressBar value={80} size="xs" showValue />
          <ProgressBar value={80} size="sm" showValue />
          <ProgressBar value={80} size="md" showValue />
          <ProgressBar value={80} size="lg" showValue />
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Visual Variants</h3>
        <div class="space-y-4">
          <ProgressBar value={65} variant="solid" label="Solid Variant" showValue />
          <ProgressBar value={65} variant="gradient" label="Gradient Variant" showValue />
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Shape Variants</h3>
        <div class="space-y-4">
          <ProgressBar value={75} shape="flat" label="Flat Shape" showValue />
          <ProgressBar value={75} shape="rounded" label="Rounded Shape" showValue />
          <ProgressBar value={75} shape="pill" label="Pill Shape" showValue />
        </div>
      </div>
    </div>
  );
});

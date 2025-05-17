import { component$ } from '@builder.io/qwik';
import { Button } from '../Button';
import { HiArrowRightOutline, HiCheckOutline } from "@qwikest/icons/heroicons";

export const BasicButtonExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
});

export const ButtonSizesExample = component$(() => {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
});

export const ButtonStateExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  );
});

export const ButtonIconExample = component$(() => {
  return (
    <div class="flex flex-wrap gap-4">
      <Button leftIcon>
        <span q:slot="leftIcon"><HiCheckOutline class="h-4 w-4" /></span>
        Left Icon
      </Button>
      
      <Button rightIcon>
        Right Icon
        <span q:slot="rightIcon"><HiArrowRightOutline class="h-4 w-4" /></span>
      </Button>
      
      <Button variant="outline" leftIcon rightIcon>
        <span q:slot="leftIcon"><HiCheckOutline class="h-4 w-4" /></span>
        Both Icons
        <span q:slot="rightIcon"><HiArrowRightOutline class="h-4 w-4" /></span>
      </Button>
    </div>
  );
}); 
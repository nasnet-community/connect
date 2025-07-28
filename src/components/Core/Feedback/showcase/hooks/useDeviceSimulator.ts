import { useSignal, $ } from "@builder.io/qwik";
import { DEVICE_CONFIGS } from "../constants";
import type { DeviceSize, DeviceConfig } from "../types";

export const useDeviceSimulator = () => {
  const currentDevice = useSignal<DeviceSize>("desktop");
  
  const setDevice = $((device: DeviceSize) => {
    currentDevice.value = device;
    
    // Apply device-specific styles to viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    const deviceConfig = DEVICE_CONFIGS[device];
    
    if (viewport && deviceConfig) {
      const content = deviceConfig.touchEnabled 
        ? "width=device-width, initial-scale=1, user-scalable=no"
        : "width=device-width, initial-scale=1";
      viewport.setAttribute("content", content);
    }
  });

  const cycleDevice = $(() => {
    const devices: DeviceSize[] = ["mobile", "tablet", "desktop"];
    const currentIndex = devices.indexOf(currentDevice.value);
    const nextIndex = (currentIndex + 1) % devices.length;
    setDevice(devices[nextIndex]);
  });

  const getDeviceConfig = $((device?: DeviceSize): DeviceConfig => {
    return DEVICE_CONFIGS[device || currentDevice.value];
  });

  const isTouch = $(() => {
    return DEVICE_CONFIGS[currentDevice.value].touchEnabled;
  });

  const getViewportClasses = $(() => {
    const device = currentDevice.value;
    
    return {
      mobile: "max-w-sm mx-auto border-2 border-gray-800 rounded-[2.5rem] shadow-xl",
      tablet: "max-w-4xl mx-auto border-2 border-gray-700 rounded-[1.5rem] shadow-lg",
      desktop: "w-full max-w-none",
    }[device];
  });

  const getScaleFactor = $(() => {
    const config = DEVICE_CONFIGS[currentDevice.value];
    const viewportWidth = window.innerWidth;
    
    if (currentDevice.value === "mobile") {
      return Math.min(1, (viewportWidth - 40) / config.width);
    }
    if (currentDevice.value === "tablet") {
      return Math.min(1, (viewportWidth - 80) / config.width);
    }
    return 1;
  });

  return {
    device: currentDevice,
    setDevice,
    cycleDevice,
    getDeviceConfig,
    isTouch,
    getViewportClasses,
    getScaleFactor,
  };
};
import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { PerformanceMetrics } from "../types";
import { PERFORMANCE_THRESHOLDS } from "../constants";

export const usePerformanceMonitor = () => {
  const metrics = useSignal<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    interactionLatency: 0,
    componentCount: 0,
  });

  const isMonitoring = useSignal(false);

  useVisibleTask$(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrame: number;

    const measureFPS = () => {
      if (!isMonitoring.value) {
        animationFrame = requestAnimationFrame(measureFPS);
        return;
      }

      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        metrics.value = {
          ...metrics.value,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
        };
        
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrame = requestAnimationFrame(measureFPS);
    };

    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        metrics.value = {
          ...metrics.value,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        };
      }
    };

    const measureComponents = () => {
      const componentCount = document.querySelectorAll('[data-qwik-component]').length;
      metrics.value = {
        ...metrics.value,
        componentCount,
      };
    };

    const measureRenderTime = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const renderTimes = entries
          .filter(entry => entry.entryType === 'measure')
          .map(entry => entry.duration);
        
        if (renderTimes.length > 0) {
          const avgRenderTime = renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;
          metrics.value = {
            ...metrics.value,
            renderTime: Math.round(avgRenderTime * 100) / 100,
          };
        }
      });

      observer.observe({ entryTypes: ['measure'] });
      
      return () => observer.disconnect();
    };

    measureFPS();
    const memoryInterval = setInterval(measureMemory, 1000);
    const componentInterval = setInterval(measureComponents, 2000);
    const renderCleanup = measureRenderTime();

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(memoryInterval);
      clearInterval(componentInterval);
      renderCleanup();
    };
  });

  const startMonitoring = () => {
    isMonitoring.value = true;
  };

  const stopMonitoring = () => {
    isMonitoring.value = false;
  };

  const getStatus = (metric: keyof PerformanceMetrics) => {
    const value = metrics.value[metric];
    const thresholds = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS];
    
    if (!thresholds) return "good";
    
    if (value <= thresholds.good) return "good";
    if (value <= thresholds.warning) return "warning";
    return "critical";
  };

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getStatus,
  };
};
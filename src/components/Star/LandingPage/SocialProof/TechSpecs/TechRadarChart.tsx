import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface RadarData {
  axis: string;
  value: number;
  maxValue: number;
}

export const TechRadarChart = component$(() => {
  const isAnimated = useSignal(false);
  const hoveredAxis = useSignal<string | null>(null);

  const data: RadarData[] = [
    { axis: $localize`Performance`, value: 95, maxValue: 100 },
    { axis: $localize`Security`, value: 98, maxValue: 100 },
    { axis: $localize`Scalability`, value: 92, maxValue: 100 },
    { axis: $localize`Reliability`, value: 99, maxValue: 100 },
    { axis: $localize`Flexibility`, value: 90, maxValue: 100 },
    { axis: $localize`Innovation`, value: 94, maxValue: 100 },
  ];

  useVisibleTask$(() => {
    setTimeout(() => {
      isAnimated.value = true;
    }, 100);
  });

  const numberOfAxes = data.length;
  const angleStep = (Math.PI * 2) / numberOfAxes;
  const centerX = 200;
  const centerY = 200;
  const maxRadius = 150;

  // Generate polygon points for the radar chart
  const generatePolygonPoints = (values: number[], scale = 1) => {
    return values
      .map((value, index) => {
        const angle = angleStep * index - Math.PI / 2;
        const radius = (value / 100) * maxRadius * scale;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        return `${x},${y}`;
      })
      .join(' ');
  };

  const dataPoints = generatePolygonPoints(data.map(d => isAnimated.value ? d.value : 0));
  const maxPoints = generatePolygonPoints(data.map(() => 100));

  return (
    <div class="relative">
      <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-white mb-4">
          <span class="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {$localize`Technology Capabilities`}
          </span>
        </h3>
        <p class="text-gray-400">{$localize`Comprehensive analysis of our technical strengths`}</p>
      </div>

      <div class="flex justify-center">
        <div class="relative">
          {/* Background Glow */}
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />

          {/* SVG Radar Chart */}
          <svg
            width="400"
            height="400"
            class="relative"
            viewBox="0 0 400 400"
          >
            {/* Grid Circles */}
            {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
              <circle
                key={index}
                cx={centerX}
                cy={centerY}
                r={maxRadius * scale}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                stroke-width="1"
                class="animate-pulse"
                style={`animation-delay: ${index * 0.1}s`}
              />
            ))}

            {/* Grid Lines */}
            {data.map((_, index) => {
              const angle = angleStep * index - Math.PI / 2;
              const x = centerX + Math.cos(angle) * maxRadius;
              const y = centerY + Math.sin(angle) * maxRadius;
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.1)"
                  stroke-width="1"
                />
              );
            })}

            {/* Background Shape */}
            <polygon
              points={maxPoints}
              fill="none"
              stroke="rgba(100, 200, 255, 0.2)"
              stroke-width="2"
            />

            {/* Data Shape with Animation */}
            <polygon
              points={dataPoints}
              fill="url(#radarGradient)"
              fill-opacity="0.3"
              stroke="url(#radarStrokeGradient)"
              stroke-width="2"
              class="transition-all duration-1000 ease-out"
            />

            {/* Data Points */}
            {data.map((item, index) => {
              const angle = angleStep * index - Math.PI / 2;
              const radius = (item.value / 100) * maxRadius * (isAnimated.value ? 1 : 0);
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius;

              return (
                <g key={index}>
                  {/* Pulse Effect */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="rgba(6, 182, 212, 0.3)"
                    class="animate-ping"
                  />
                  {/* Data Point */}
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="url(#pointGradient)"
                    stroke="white"
                    stroke-width="2"
                    class="cursor-pointer transition-all duration-300 hover:r-7"
                    onMouseEnter$={() => hoveredAxis.value = item.axis}
                    onMouseLeave$={() => hoveredAxis.value = null}
                  />
                </g>
              );
            })}

            {/* Axis Labels */}
            {data.map((item, index) => {
              const angle = angleStep * index - Math.PI / 2;
              const labelRadius = maxRadius + 30;
              const x = centerX + Math.cos(angle) * labelRadius;
              const y = centerY + Math.sin(angle) * labelRadius;

              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  text-anchor="middle"
                  dominant-baseline="middle"
                  class={`fill-current transition-all duration-300 ${
                    hoveredAxis.value === item.axis
                      ? 'text-cyan-400 font-bold text-sm'
                      : 'text-gray-400 text-xs'
                  }`}
                >
                  {item.axis}
                </text>
              );
            })}

            {/* Value Labels on Hover */}
            {hoveredAxis.value && data.map((item, index) => {
              if (item.axis !== hoveredAxis.value) return null;
              const angle = angleStep * index - Math.PI / 2;
              const radius = (item.value / 100) * maxRadius;
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius;

              return (
                <text
                  key={index}
                  x={x}
                  y={y - 15}
                  text-anchor="middle"
                  class="fill-white font-bold text-lg"
                >
                  {item.value}%
                </text>
              );
            })}

            {/* Gradients */}
            <defs>
              <radialGradient id="radarGradient">
                <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
              </radialGradient>
              <linearGradient id="radarStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#06b6d4" />
                <stop offset="100%" style="stop-color:#8b5cf6" />
              </linearGradient>
              <radialGradient id="pointGradient">
                <stop offset="0%" style="stop-color:#ffffff" />
                <stop offset="100%" style="stop-color:#06b6d4" />
              </radialGradient>
            </defs>
          </svg>

          {/* Legend */}
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-6 text-xs text-gray-400">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
              <span>{$localize`Current Performance`}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full border border-gray-400" />
              <span>{$localize`Maximum Potential`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            class={`p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border transition-all duration-300 ${
              hoveredAxis.value === item.axis
                ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
                : 'border-white/20'
            }`}
            onMouseEnter$={() => hoveredAxis.value = item.axis}
            onMouseLeave$={() => hoveredAxis.value = null}
          >
            <div class="text-xs text-gray-400 mb-1">{item.axis}</div>
            <div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {item.value}%
            </div>
            <div class="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-1000"
                style={{
                  width: isAnimated.value ? `${item.value}%` : '0%',
                  transitionDelay: `${index * 100}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
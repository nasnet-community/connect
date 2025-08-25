import { component$ } from "@builder.io/qwik";
import { type RouterData } from "./Constants";

interface NetworkTopologyDiagramProps {
  router: RouterData;
}

export const NetworkTopologyDiagram = component$<NetworkTopologyDiagramProps>((props) => {
  const { router } = props;
  
  // Determine network setup based on router capabilities
  const hasWAN = router.canBeMaster;
  const hasLTE = router.isLTE;
  const hasWiFi = router.isWireless;
  const hasSFP = router.isSFP;
  const hasVPN = router.networkCapabilities?.vpnProtocols && router.networkCapabilities.vpnProtocols.length > 0;
  
  return (
    <div class="relative w-full">
      <svg 
        viewBox="0 0 600 300" 
        class="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.5" class="text-border/10 dark:text-border-dark/10"/>
          </pattern>
          
          {/* Gradient definitions */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(59, 130, 246);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(147, 51, 234);stop-opacity:1" />
          </linearGradient>
          
          <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:rgb(236, 72, 153);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(239, 68, 68);stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <rect width="600" height="300" fill="url(#grid)" />
        
        {/* Router in center */}
        <g transform="translate(300, 150)">
          {/* Router box */}
          <rect 
            x="-40" 
            y="-25" 
            width="80" 
            height="50" 
            rx="5" 
            fill="url(#primaryGradient)"
            opacity="0.9"
          />
          <text 
            x="0" 
            y="5" 
            text-anchor="middle" 
            fill="white" 
            font-size="12" 
            font-weight="bold"
          >
            {router.model.length > 12 ? 'Router' : router.model}
          </text>
        </g>
        
        {/* WAN Connection (top) */}
        {hasWAN && (
          <g>
            {/* Line from router to internet */}
            <line 
              x1="300" 
              y1="125" 
              x2="300" 
              y2="50" 
              stroke="url(#primaryGradient)" 
              stroke-width="2"
              stroke-dasharray="5,5"
              class="animate-pulse"
            />
            {/* Internet cloud */}
            <g transform="translate(300, 40)">
              <circle r="25" fill="url(#secondaryGradient)" opacity="0.2"/>
              <circle r="20" fill="url(#secondaryGradient)" opacity="0.3"/>
              <text 
                x="0" 
                y="5" 
                text-anchor="middle" 
                fill="currentColor" 
                font-size="10" 
                class="text-text dark:text-text-dark-default"
              >
                Internet
              </text>
            </g>
          </g>
        )}
        
        {/* LTE Connection (top-right) */}
        {hasLTE && (
          <g>
            <line 
              x1="340" 
              y1="130" 
              x2="400" 
              y2="70" 
              stroke="url(#primaryGradient)" 
              stroke-width="2"
              stroke-dasharray="3,3"
            />
            <g transform="translate(400, 60)">
              <rect 
                x="-20" 
                y="-15" 
                width="40" 
                height="30" 
                rx="3" 
                fill="rgb(239, 68, 68)" 
                opacity="0.8"
              />
              <text 
                x="0" 
                y="5" 
                text-anchor="middle" 
                fill="white" 
                font-size="10"
              >
                LTE/5G
              </text>
            </g>
          </g>
        )}
        
        {/* WiFi Clients (left) */}
        {hasWiFi && (
          <g>
            <line 
              x1="260" 
              y1="150" 
              x2="150" 
              y2="100" 
              stroke="url(#primaryGradient)" 
              stroke-width="2"
            />
            <line 
              x1="260" 
              y1="150" 
              x2="150" 
              y2="150" 
              stroke="url(#primaryGradient)" 
              stroke-width="2"
            />
            <line 
              x1="260" 
              y1="150" 
              x2="150" 
              y2="200" 
              stroke="url(#primaryGradient)" 
              stroke-width="2"
            />
            
            {/* WiFi devices */}
            {[100, 150, 200].map((y, i) => (
              <g key={i} transform={`translate(150, ${y})`}>
                <circle r="15" fill="rgb(34, 197, 94)" opacity="0.3"/>
                <text 
                  x="0" 
                  y="5" 
                  text-anchor="middle" 
                  fill="currentColor" 
                  font-size="9" 
                  class="text-text dark:text-text-dark-default"
                >
                  WiFi
                </text>
              </g>
            ))}
          </g>
        )}
        
        {/* Ethernet Clients (right) */}
        <g>
          <line 
            x1="340" 
            y1="150" 
            x2="450" 
            y2="120" 
            stroke="url(#primaryGradient)" 
            stroke-width="2"
          />
          <line 
            x1="340" 
            y1="150" 
            x2="450" 
            y2="150" 
            stroke="url(#primaryGradient)" 
            stroke-width="2"
          />
          <line 
            x1="340" 
            y1="150" 
            x2="450" 
            y2="180" 
            stroke="url(#primaryGradient)" 
            stroke-width="2"
          />
          
          {/* Ethernet devices */}
          {[120, 150, 180].map((y, i) => (
            <g key={i} transform={`translate(450, ${y})`}>
              <rect 
                x="-15" 
                y="-10" 
                width="30" 
                height="20" 
                rx="2" 
                fill="rgb(59, 130, 246)" 
                opacity="0.5"
              />
              <text 
                x="0" 
                y="4" 
                text-anchor="middle" 
                fill="white" 
                font-size="8"
              >
                LAN
              </text>
            </g>
          ))}
        </g>
        
        {/* SFP Connection (bottom-right) */}
        {hasSFP && (
          <g>
            <line 
              x1="340" 
              y1="170" 
              x2="400" 
              y2="230" 
              stroke="url(#secondaryGradient)" 
              stroke-width="2"
              stroke-dasharray="10,2"
            />
            <g transform="translate(400, 240)">
              <rect 
                x="-25" 
                y="-15" 
                width="50" 
                height="30" 
                rx="3" 
                fill="rgb(251, 146, 60)" 
                opacity="0.8"
              />
              <text 
                x="0" 
                y="5" 
                text-anchor="middle" 
                fill="white" 
                font-size="10"
              >
                SFP+
              </text>
            </g>
          </g>
        )}
        
        {/* VPN Tunnel (bottom) */}
        {hasVPN && (
          <g>
            <line 
              x1="300" 
              y1="175" 
              x2="300" 
              y2="250" 
              stroke="url(#secondaryGradient)" 
              stroke-width="2"
              stroke-dasharray="8,4"
              opacity="0.7"
            />
            <g transform="translate(300, 260)">
              <rect 
                x="-30" 
                y="-15" 
                width="60" 
                height="30" 
                rx="3" 
                fill="rgb(147, 51, 234)" 
                opacity="0.7"
              />
              <text 
                x="0" 
                y="5" 
                text-anchor="middle" 
                fill="white" 
                font-size="10"
              >
                VPN
              </text>
            </g>
          </g>
        )}
        
        {/* Network capabilities text */}
        <text 
          x="300" 
          y="290" 
          text-anchor="middle" 
          fill="currentColor" 
          font-size="11" 
          class="text-text-secondary dark:text-text-dark-secondary"
        >
          {router.networkCapabilities?.throughput || 'N/A'} Throughput • {router.networkCapabilities?.maxConnections || 'N/A'} Max Connections
        </text>
      </svg>
    </div>
  );
});
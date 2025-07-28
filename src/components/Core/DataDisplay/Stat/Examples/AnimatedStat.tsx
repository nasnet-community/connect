import { component$, useSignal, $ } from "@builder.io/qwik";
import {
  Stat,
  StatNumber,
  StatLabel,
  StatIcon,
  StatTrend,
  StatGroup,
} from "../index";

export const AnimatedStatExample = component$(() => {
  const refreshTrigger = useSignal(0);

  const triggerAnimation = $(() => {
    refreshTrigger.value += 1;
  });

  return (
    <div style="padding: 2rem; background: var(--bg-primary);">
      <h2 style="margin-bottom: 2rem; color: var(--text-primary);">
        Animated Stat Components
      </h2>

      <div style="margin-bottom: 2rem;">
        <button
          onClick$={triggerAnimation}
          style="
            padding: 0.5rem 1rem;
            background: var(--color-primary);
            color: white;
            border: none;
            border-radius: var(--radius-md);
            cursor: pointer;
            font-weight: 500;
          "
        >
          Trigger Animation
        </button>
      </div>

      {/* Basic animated numbers */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Basic Animated Numbers
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat
            variant="bordered"
            animate
            key={`stat1-${refreshTrigger.value}`}
          >
            <StatIcon>👥</StatIcon>
            <StatNumber value={1234} animate animationDuration={1000} />
            <StatLabel>Users</StatLabel>
          </Stat>
          <Stat
            variant="bordered"
            animate
            key={`stat2-${refreshTrigger.value}`}
          >
            <StatIcon>💰</StatIcon>
            <StatNumber
              value={56789}
              format="currency"
              currency="USD"
              animate
              animationDuration={1500}
            />
            <StatLabel>Revenue</StatLabel>
          </Stat>
          <Stat
            variant="bordered"
            animate
            key={`stat3-${refreshTrigger.value}`}
          >
            <StatIcon>📦</StatIcon>
            <StatNumber value={847} animate animationDuration={800} />
            <StatLabel>Orders</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Different animation speeds */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Different Animation Speeds
        </h3>
        <StatGroup columns={4} gap="md">
          <Stat variant="elevated" key={`fast-${refreshTrigger.value}`}>
            <StatNumber value={42} animate animationDuration={500} />
            <StatLabel>Fast (500ms)</StatLabel>
          </Stat>
          <Stat variant="elevated" key={`normal-${refreshTrigger.value}`}>
            <StatNumber value={84} animate animationDuration={1000} />
            <StatLabel>Normal (1s)</StatLabel>
          </Stat>
          <Stat variant="elevated" key={`slow-${refreshTrigger.value}`}>
            <StatNumber value={126} animate animationDuration={2000} />
            <StatLabel>Slow (2s)</StatLabel>
          </Stat>
          <Stat variant="elevated" key={`very-slow-${refreshTrigger.value}`}>
            <StatNumber value={168} animate animationDuration={3000} />
            <StatLabel>Very Slow (3s)</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Animated percentages and decimals */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Animated Percentages and Decimals
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat variant="bordered" key={`percent-${refreshTrigger.value}`}>
            <StatIcon>🎯</StatIcon>
            <StatNumber
              value={87.5}
              suffix="%"
              animate
              animationDuration={1200}
              decimals={1}
            />
            <StatLabel>Success Rate</StatLabel>
            <StatTrend value={5.2} />
          </Stat>
          <Stat variant="bordered" key={`decimal-${refreshTrigger.value}`}>
            <StatIcon>⭐</StatIcon>
            <StatNumber
              value={4.73}
              animate
              animationDuration={1000}
              decimals={2}
            />
            <StatLabel>Rating</StatLabel>
            <StatTrend value={0.23} format="number" decimals={2} />
          </Stat>
          <Stat variant="bordered" key={`currency-${refreshTrigger.value}`}>
            <StatIcon>💵</StatIcon>
            <StatNumber
              value={1234.56}
              format="currency"
              currency="USD"
              animate
              animationDuration={1500}
            />
            <StatLabel>Daily Revenue</StatLabel>
            <StatTrend value={15.8} />
          </Stat>
        </StatGroup>
      </div>

      {/* Large numbers with formatting */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Large Animated Numbers
        </h3>
        <StatGroup columns={2} gap="lg">
          <Stat
            variant="elevated"
            size="lg"
            key={`large1-${refreshTrigger.value}`}
          >
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <StatIcon position="left">📈</StatIcon>
              <StatTrend value={28.6} />
            </div>
            <StatNumber value={1247856} animate animationDuration={2000} />
            <StatLabel>Total Page Views</StatLabel>
            <StatLabel secondary>This month</StatLabel>
          </Stat>

          <Stat
            variant="elevated"
            size="lg"
            key={`large2-${refreshTrigger.value}`}
          >
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <StatIcon position="left">🌍</StatIcon>
              <StatTrend value={12.3} />
            </div>
            <StatNumber value={347892} animate animationDuration={1800} />
            <StatLabel>Unique Visitors</StatLabel>
            <StatLabel secondary>From 127 countries</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Custom prefix/suffix animated */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Custom Prefix/Suffix
        </h3>
        <StatGroup columns={4} gap="md">
          <Stat variant="bordered" key={`prefix1-${refreshTrigger.value}`}>
            <StatNumber
              value={42}
              prefix="+"
              animate
              animationDuration={1000}
            />
            <StatLabel>New Today</StatLabel>
          </Stat>
          <Stat variant="bordered" key={`suffix1-${refreshTrigger.value}`}>
            <StatNumber
              value={2.4}
              suffix="x"
              animate
              animationDuration={1000}
              decimals={1}
            />
            <StatLabel>Growth Factor</StatLabel>
          </Stat>
          <Stat variant="bordered" key={`time-${refreshTrigger.value}`}>
            <StatNumber
              value={125}
              suffix="ms"
              animate
              animationDuration={1000}
            />
            <StatLabel>Response Time</StatLabel>
          </Stat>
          <Stat variant="bordered" key={`storage-${refreshTrigger.value}`}>
            <StatNumber
              value={1.7}
              suffix="GB"
              animate
              animationDuration={1000}
              decimals={1}
            />
            <StatLabel>Storage Used</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Dashboard with staggered animations */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Staggered Dashboard Animation
        </h3>
        <StatGroup columns={4} gap="md">
          <Stat
            variant="elevated"
            align="center"
            key={`dash1-${refreshTrigger.value}`}
          >
            <StatIcon>🔥</StatIcon>
            <StatNumber
              value={15678}
              format="currency"
              currency="USD"
              animate
              animationDuration={1000}
            />
            <StatLabel>Revenue</StatLabel>
            <StatTrend value={23.1} />
          </Stat>
          <Stat
            variant="elevated"
            align="center"
            key={`dash2-${refreshTrigger.value}`}
          >
            <StatIcon>👥</StatIcon>
            <StatNumber value={2847} animate animationDuration={1200} />
            <StatLabel>Users</StatLabel>
            <StatTrend value={18.7} />
          </Stat>
          <Stat
            variant="elevated"
            align="center"
            key={`dash3-${refreshTrigger.value}`}
          >
            <StatIcon>📦</StatIcon>
            <StatNumber value={456} animate animationDuration={1400} />
            <StatLabel>Orders</StatLabel>
            <StatTrend value={-2.1} />
          </Stat>
          <Stat
            variant="elevated"
            align="center"
            key={`dash4-${refreshTrigger.value}`}
          >
            <StatIcon>⭐</StatIcon>
            <StatNumber
              value={4.8}
              animate
              animationDuration={1600}
              decimals={1}
            />
            <StatLabel>Rating</StatLabel>
            <StatTrend value={0.3} format="number" decimals={1} />
          </Stat>
        </StatGroup>
      </div>

      {/* Non-animated comparison */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Non-animated (for comparison)
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat variant="bordered">
            <StatIcon>🚀</StatIcon>
            <StatNumber value={1234} animate={false} />
            <StatLabel>Static Number</StatLabel>
          </Stat>
          <Stat variant="bordered">
            <StatIcon>💎</StatIcon>
            <StatNumber
              value={5678}
              format="currency"
              currency="USD"
              animate={false}
            />
            <StatLabel>No Animation</StatLabel>
          </Stat>
          <Stat variant="bordered">
            <StatIcon>⚡</StatIcon>
            <StatNumber value={91.2} suffix="%" animate={false} decimals={1} />
            <StatLabel>Instant Display</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
        <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
          <strong>Note:</strong> Click "Trigger Animation" to see the number
          animations in action. Each stat component can have different animation
          durations and will animate from 0 to the target value.
        </p>
      </div>
    </div>
  );
});

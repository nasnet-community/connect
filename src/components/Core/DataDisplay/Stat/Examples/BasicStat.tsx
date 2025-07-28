import { component$ } from "@builder.io/qwik";
import { Stat, StatNumber, StatLabel, StatIcon, StatGroup } from "../index";

export const BasicStatExample = component$(() => {
  return (
    <div style="padding: 2rem; background: var(--bg-primary);">
      <h2 style="margin-bottom: 2rem; color: var(--text-primary);">
        Basic Stat Components
      </h2>

      {/* Simple stat */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Simple Stat
        </h3>
        <Stat>
          <StatNumber value={42} />
          <StatLabel>Total Users</StatLabel>
        </Stat>
      </div>

      {/* Stat with icon */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Stat with Icon
        </h3>
        <Stat variant="bordered">
          <StatIcon>👥</StatIcon>
          <StatNumber value={1234} format="number" />
          <StatLabel>Active Users</StatLabel>
        </Stat>
      </div>

      {/* Different sizes */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Different Sizes
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat size="sm" variant="elevated">
            <StatNumber value={89} suffix="%" />
            <StatLabel>Small Size</StatLabel>
          </Stat>
          <Stat size="md" variant="elevated">
            <StatNumber value={89} suffix="%" />
            <StatLabel>Medium Size</StatLabel>
          </Stat>
          <Stat size="lg" variant="elevated">
            <StatNumber value={89} suffix="%" />
            <StatLabel>Large Size</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Different variants */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Different Variants
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat variant="default">
            <StatNumber value={256} />
            <StatLabel>Default</StatLabel>
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={512} />
            <StatLabel>Bordered</StatLabel>
          </Stat>
          <Stat variant="elevated">
            <StatNumber value={1024} />
            <StatLabel>Elevated</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Different alignments */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Different Alignments
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat align="left" variant="bordered">
            <StatNumber value={789} />
            <StatLabel>Left Aligned</StatLabel>
          </Stat>
          <Stat align="center" variant="bordered">
            <StatNumber value={789} />
            <StatLabel>Center Aligned</StatLabel>
          </Stat>
          <Stat align="right" variant="bordered">
            <StatNumber value={789} />
            <StatLabel>Right Aligned</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Number formatting */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Number Formatting
        </h3>
        <StatGroup columns={4} gap="md">
          <Stat variant="elevated">
            <StatNumber value={1234.56} format="number" decimals={2} />
            <StatLabel>Number</StatLabel>
          </Stat>
          <Stat variant="elevated">
            <StatNumber value={1234.56} format="currency" currency="USD" />
            <StatLabel>Currency</StatLabel>
          </Stat>
          <Stat variant="elevated">
            <StatNumber value={0.856} format="percent" decimals={1} />
            <StatLabel>Percentage</StatLabel>
          </Stat>
          <Stat variant="elevated">
            <StatNumber value={42} prefix="+" suffix=" items" />
            <StatLabel>Custom</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Loading state */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Loading State
        </h3>
        <Stat variant="bordered" loading>
          <StatNumber value={0} />
          <StatLabel>Loading...</StatLabel>
        </Stat>
      </div>
    </div>
  );
});

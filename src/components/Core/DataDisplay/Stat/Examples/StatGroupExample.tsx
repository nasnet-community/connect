import { component$ } from "@builder.io/qwik";
import {
  Stat,
  StatNumber,
  StatLabel,
  StatIcon,
  StatTrend,
  StatGroup,
} from "../index";

export const StatGroupExample = component$(() => {
  return (
    <div style="padding: 2rem; background: var(--bg-primary);">
      <h2 style="margin-bottom: 2rem; color: var(--text-primary);">
        Stat Group Layouts
      </h2>

      {/* Different column layouts */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Different Column Layouts
        </h3>

        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
            2 Columns
          </h4>
          <StatGroup columns={2} gap="md">
            <Stat variant="bordered">
              <StatIcon>👥</StatIcon>
              <StatNumber value={1234} />
              <StatLabel>Users</StatLabel>
              <StatTrend value={12.5} />
            </Stat>
            <Stat variant="bordered">
              <StatIcon>💰</StatIcon>
              <StatNumber value={56789} format="currency" currency="USD" />
              <StatLabel>Revenue</StatLabel>
              <StatTrend value={8.3} />
            </Stat>
          </StatGroup>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
            3 Columns
          </h4>
          <StatGroup columns={3} gap="md">
            <Stat variant="elevated">
              <StatNumber value={45} suffix="%" />
              <StatLabel>Conversion Rate</StatLabel>
            </Stat>
            <Stat variant="elevated">
              <StatNumber value={2.3} suffix="s" />
              <StatLabel>Load Time</StatLabel>
            </Stat>
            <Stat variant="elevated">
              <StatNumber value={98.7} suffix="%" />
              <StatLabel>Uptime</StatLabel>
            </Stat>
          </StatGroup>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
            4 Columns
          </h4>
          <StatGroup columns={4} gap="sm">
            <Stat variant="default">
              <StatNumber value={847} />
              <StatLabel>Orders</StatLabel>
            </Stat>
            <Stat variant="default">
              <StatNumber value={23} />
              <StatLabel>Products</StatLabel>
            </Stat>
            <Stat variant="default">
              <StatNumber value={156} />
              <StatLabel>Customers</StatLabel>
            </Stat>
            <Stat variant="default">
              <StatNumber value={89} />
              <StatLabel>Reviews</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </div>

      {/* Different gap sizes */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Different Gap Sizes
        </h3>

        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
            Small Gap
          </h4>
          <StatGroup columns={3} gap="sm">
            <Stat variant="bordered">
              <StatNumber value={123} />
              <StatLabel>Small Gap</StatLabel>
            </Stat>
            <Stat variant="bordered">
              <StatNumber value={456} />
              <StatLabel>Small Gap</StatLabel>
            </Stat>
            <Stat variant="bordered">
              <StatNumber value={789} />
              <StatLabel>Small Gap</StatLabel>
            </Stat>
          </StatGroup>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
            Large Gap
          </h4>
          <StatGroup columns={3} gap="lg">
            <Stat variant="elevated">
              <StatNumber value={321} />
              <StatLabel>Large Gap</StatLabel>
            </Stat>
            <Stat variant="elevated">
              <StatNumber value={654} />
              <StatLabel>Large Gap</StatLabel>
            </Stat>
            <Stat variant="elevated">
              <StatNumber value={987} />
              <StatLabel>Large Gap</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </div>

      {/* Responsive behavior (try resizing) */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Responsive Layout (try resizing window)
        </h3>
        <StatGroup columns={4} gap="md" responsive>
          <Stat variant="bordered" align="center">
            <StatIcon>📈</StatIcon>
            <StatNumber value={25647} />
            <StatLabel>Page Views</StatLabel>
            <StatTrend value={15.2} />
          </Stat>
          <Stat variant="bordered" align="center">
            <StatIcon>👥</StatIcon>
            <StatNumber value={3456} />
            <StatLabel>Unique Visitors</StatLabel>
            <StatTrend value={-2.1} />
          </Stat>
          <Stat variant="bordered" align="center">
            <StatIcon>⏱️</StatIcon>
            <StatNumber value={2.47} suffix=" min" />
            <StatLabel>Avg. Session</StatLabel>
            <StatTrend value={8.7} />
          </Stat>
          <Stat variant="bordered" align="center">
            <StatIcon>🔄</StatIcon>
            <StatNumber value={34.2} suffix="%" />
            <StatLabel>Bounce Rate</StatLabel>
            <StatTrend value={-5.3} />
          </Stat>
        </StatGroup>
      </div>

      {/* Mixed sizes within group */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Mixed Sizes
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat variant="elevated" size="sm">
            <StatNumber value={42} />
            <StatLabel>Small</StatLabel>
          </Stat>
          <Stat variant="elevated" size="md">
            <StatNumber value={84} />
            <StatLabel>Medium</StatLabel>
          </Stat>
          <Stat variant="elevated" size="lg">
            <StatNumber value={126} />
            <StatLabel>Large</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Dashboard-style layout */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Dashboard Layout
        </h3>
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          {/* Top row - key metrics */}
          <StatGroup columns={4} gap="md">
            <Stat variant="elevated" align="center">
              <StatIcon>💵</StatIcon>
              <StatNumber value={125847} format="currency" currency="USD" />
              <StatLabel>Total Revenue</StatLabel>
              <StatTrend value={23.1} label="vs last month" />
            </Stat>
            <Stat variant="elevated" align="center">
              <StatIcon>🛒</StatIcon>
              <StatNumber value={1847} />
              <StatLabel>Orders</StatLabel>
              <StatTrend value={12.5} label="vs last month" />
            </Stat>
            <Stat variant="elevated" align="center">
              <StatIcon>👥</StatIcon>
              <StatNumber value={25634} />
              <StatLabel>Customers</StatLabel>
              <StatTrend value={8.7} label="vs last month" />
            </Stat>
            <Stat variant="elevated" align="center">
              <StatIcon>📦</StatIcon>
              <StatNumber value={456} />
              <StatLabel>Products</StatLabel>
              <StatTrend value={-2.1} label="vs last month" />
            </Stat>
          </StatGroup>

          {/* Bottom row - performance metrics */}
          <StatGroup columns={3} gap="lg">
            <Stat variant="bordered" size="lg">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <StatIcon position="left">⚡</StatIcon>
                <StatTrend value={-15.2} />
              </div>
              <StatNumber value={1.24} suffix="s" decimals={2} />
              <StatLabel>Avg Load Time</StatLabel>
              <StatLabel secondary>Target: &lt; 2s</StatLabel>
            </Stat>
            <Stat variant="bordered" size="lg">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <StatIcon position="left">🎯</StatIcon>
                <StatTrend value={5.8} />
              </div>
              <StatNumber value={4.7} suffix="/5" decimals={1} />
              <StatLabel>Customer Rating</StatLabel>
              <StatLabel secondary>Based on 1,247 reviews</StatLabel>
            </Stat>
            <Stat variant="bordered" size="lg">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <StatIcon position="left">📊</StatIcon>
                <StatTrend value={18.3} />
              </div>
              <StatNumber value={68.4} suffix="%" decimals={1} />
              <StatLabel>Conversion Rate</StatLabel>
              <StatLabel secondary>Industry avg: 52.3%</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </div>

      {/* Non-responsive fixed layout */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Fixed Layout (Non-responsive)
        </h3>
        <StatGroup columns={5} gap="sm" responsive={false}>
          <Stat variant="default" size="sm">
            <StatNumber value={12} />
            <StatLabel>Fixed</StatLabel>
          </Stat>
          <Stat variant="default" size="sm">
            <StatNumber value={34} />
            <StatLabel>Layout</StatLabel>
          </Stat>
          <Stat variant="default" size="sm">
            <StatNumber value={56} />
            <StatLabel>Won't</StatLabel>
          </Stat>
          <Stat variant="default" size="sm">
            <StatNumber value={78} />
            <StatLabel>Change</StatLabel>
          </Stat>
          <Stat variant="default" size="sm">
            <StatNumber value={90} />
            <StatLabel>Size</StatLabel>
          </Stat>
        </StatGroup>
      </div>
    </div>
  );
});

import { component$ } from "@builder.io/qwik";
import {
  Stat,
  StatNumber,
  StatLabel,
  StatIcon,
  StatTrend,
  StatGroup,
} from "../index";

export const StatWithTrendExample = component$(() => {
  return (
    <div style="padding: 2rem; background: var(--bg-primary);">
      <h2 style="margin-bottom: 2rem; color: var(--text-primary);">
        Stat Components with Trends
      </h2>

      {/* Basic trend indicators */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Basic Trends
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat variant="bordered">
            <StatNumber value={1234} />
            <StatLabel>Revenue</StatLabel>
            <StatTrend value={12.5} direction="up" />
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={867} />
            <StatLabel>Orders</StatLabel>
            <StatTrend value={-3.2} direction="down" />
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={543} />
            <StatLabel>Visitors</StatLabel>
            <StatTrend value={0} direction="neutral" />
          </Stat>
        </StatGroup>
      </div>

      {/* Trends with custom labels */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Trends with Labels
        </h3>
        <StatGroup columns={2} gap="lg">
          <Stat variant="elevated">
            <StatIcon>📈</StatIcon>
            <StatNumber value={45678} format="currency" currency="USD" />
            <StatLabel>Monthly Revenue</StatLabel>
            <StatTrend value={15.3} direction="up" label="vs last month" />
          </Stat>
          <Stat variant="elevated">
            <StatIcon>👥</StatIcon>
            <StatNumber value={2348} />
            <StatLabel>New Users</StatLabel>
            <StatTrend value={-5.7} direction="down" label="vs last week" />
          </Stat>
        </StatGroup>
      </div>

      {/* Different trend formats */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Different Trend Formats
        </h3>
        <StatGroup columns={4} gap="md">
          <Stat variant="bordered">
            <StatNumber value={89.5} suffix="%" />
            <StatLabel>Conversion Rate</StatLabel>
            <StatTrend value={2.3} format="percent" decimals={1} />
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={156} />
            <StatLabel>Support Tickets</StatLabel>
            <StatTrend value={23} format="number" decimals={0} />
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={4.8} decimals={1} />
            <StatLabel>Avg Rating</StatLabel>
            <StatTrend
              value={0.2}
              format="number"
              decimals={1}
              showIcon={false}
            />
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={12.4} suffix="s" />
            <StatLabel>Load Time</StatLabel>
            <StatTrend value={-1.2} format="number" decimals={1} />
          </Stat>
        </StatGroup>
      </div>

      {/* Complex stats with multiple data points */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Complex Stats
        </h3>
        <StatGroup columns={2} gap="lg">
          <Stat variant="elevated" size="lg">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <div>
                <StatIcon position="left">🛒</StatIcon>
              </div>
              <div style="text-align: right;">
                <StatTrend value={28.6} direction="up" />
              </div>
            </div>
            <StatNumber value={147856} format="currency" currency="USD" />
            <StatLabel>Total Sales</StatLabel>
            <StatLabel secondary>Last 30 days</StatLabel>
          </Stat>

          <Stat variant="elevated" size="lg">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <div>
                <StatIcon position="left">⏱️</StatIcon>
              </div>
              <div style="text-align: right;">
                <StatTrend value={-12.3} direction="down" />
              </div>
            </div>
            <StatNumber value={2.47} suffix=" min" decimals={2} />
            <StatLabel>Avg Session Duration</StatLabel>
            <StatLabel secondary>Bounce rate: 32.1%</StatLabel>
          </Stat>
        </StatGroup>
      </div>

      {/* Trends without icons */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Trends without Icons
        </h3>
        <StatGroup columns={3} gap="md">
          <Stat variant="bordered">
            <StatNumber value={98.7} suffix="%" />
            <StatLabel>Uptime</StatLabel>
            <StatTrend value={0.3} showIcon={false} />
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={1.2} suffix="TB" />
            <StatLabel>Data Usage</StatLabel>
            <StatTrend value={15.8} showIcon={false} />
          </Stat>
          <Stat variant="bordered">
            <StatNumber value={847} />
            <StatLabel>API Calls</StatLabel>
            <StatTrend value={-22} showIcon={false} format="number" />
          </Stat>
        </StatGroup>
      </div>

      {/* Mixed layouts */}
      <div style="margin-bottom: 3rem;">
        <h3 style="margin-bottom: 1rem; color: var(--text-secondary);">
          Mixed Layouts
        </h3>
        <StatGroup columns={1} gap="lg">
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
            <Stat variant="elevated" align="center">
              <StatIcon>🎯</StatIcon>
              <StatNumber value={87.3} suffix="%" />
              <StatLabel>Goal Achievement</StatLabel>
              <StatTrend value={5.2} />
            </Stat>
            <Stat variant="elevated" align="center">
              <StatIcon>📊</StatIcon>
              <StatNumber value={2.4} suffix="x" />
              <StatLabel>Growth Rate</StatLabel>
              <StatTrend value={0.3} format="number" decimals={1} />
            </Stat>
            <Stat variant="elevated" align="center">
              <StatIcon>💰</StatIcon>
              <StatNumber value={15678} format="currency" currency="USD" />
              <StatLabel>Daily Revenue</StatLabel>
              <StatTrend value={18.7} />
            </Stat>
            <Stat variant="elevated" align="center">
              <StatIcon>📈</StatIcon>
              <StatNumber value={342} />
              <StatLabel>New Leads</StatLabel>
              <StatTrend value={-8.1} />
            </Stat>
          </div>
        </StatGroup>
      </div>
    </div>
  );
});

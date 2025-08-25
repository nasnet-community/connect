import { describe, it, expect } from "vitest";
import type { RouterConfig } from "../ConfigGenerator";
import {
  formatRouterConfig,
  SchedulerGenerator,
  ScriptGenerator,
  OneTimeScript,
  type SchedulerGenerator as SchedulerGeneratorType,
  type ScriptGenerator as ScriptGeneratorType,
  type OneTimeScript as OneTimeScriptType,
} from "./ScriptSchedule";

describe("ScriptSchedule Utils", () => {
  describe("formatRouterConfig", () => {
    it("should convert simple RouterConfig to script format", () => {
      const input: RouterConfig = {
        "/ip address": ["add address=192.168.1.1/24 interface=ether1"],
        "/ip route": ["add dst-address=0.0.0.0/0 gateway=192.168.1.254"],
      };

      const result = testWithGenericOutput(
        "formatRouterConfig",
        "Simple RouterConfig conversion",
        { routerConfig: input },
        () => formatRouterConfig(input),
      );

      expect(result).toContain("/ip address");
      expect(result).toContain("add address=192.168.1.1/24 interface=ether1");
      expect(result).toContain("/ip route");
      expect(result).toContain(
        "add dst-address=0.0.0.0/0 gateway=192.168.1.254",
      );
    });

    it("should handle empty sections and commands", () => {
      const input: RouterConfig = {
        "": ["# Comment at top"],
        "/ip address": [],
        "/ip route": ["add dst-address=0.0.0.0/0 gateway=192.168.1.254", ""],
      };

      const result = testWithGenericOutput(
        "formatRouterConfig",
        "RouterConfig with empty sections",
        { routerConfig: input },
        () => formatRouterConfig(input),
      );

      expect(result).toContain("# Comment at top");
      expect(result).toContain("/ip route");
    });
  });

  describe("formatRouterConfig with escaping", () => {
    it("should escape special characters properly", () => {
      const input: RouterConfig = {
        "/log": ['info "Hello World"'],
      };

      const result = testWithGenericOutput(
        "formatRouterConfig",
        "Content with quotes and backslashes",
        { content: input, escapeForScript: true },
        () => formatRouterConfig(input, { escapeForScript: true }),
      );

      expect(result).toContain('\\"');
    });

    it("should handle line breaks correctly", () => {
      const input: RouterConfig = {
        "/log": ['info "line1\\r\\nline2\\nline3"'],
      };

      const result = testWithGenericOutput(
        "formatRouterConfig",
        "Content with different line breaks",
        { content: input, escapeForScript: true },
        () => formatRouterConfig(input, { escapeForScript: true }),
      );

      expect(result).toContain("\\\\r\\\\n");
    });
  });

  describe("SchedulerGenerator", () => {
    it("should create a basic scheduler configuration", () => {
      const input: SchedulerGeneratorType = {
        Name: "daily-backup",
        content: {
          "/system backup": ["save name=daily-backup"],
          "/log": ['info "Backup completed successfully"'],
        },
        interval: "1d",
        startTime: "03:00:00",
      };

      const result = testWithOutput(
        "SchedulerGenerator",
        "Daily backup scheduler",
        {
          Name: input.Name,
          content: input.content,
          interval: input.interval,
          startTime: input.startTime,
        },
        () => SchedulerGenerator(input),
      );

      validateRouterConfig(result, ["/system scheduler"]);
      expect(result["/system scheduler"][0]).toContain("name=daily-backup");
      expect(result["/system scheduler"][0]).toContain("interval=1d");
      expect(result["/system scheduler"][0]).toContain("start-time=03:00:00");
    });

    it("should handle startup scheduler", () => {
      const input: SchedulerGeneratorType = {
        Name: "startup-config",
        content: {
          "/interface ethernet": ["set ether1 name=WAN"],
        },
        startTime: "startup",
      };

      const result = testWithOutput(
        "SchedulerGenerator",
        "Startup scheduler configuration",
        {
          Name: input.Name,
          content: input.content,
          startTime: input.startTime,
        },
        () => SchedulerGenerator(input),
      );

      validateRouterConfig(result, ["/system scheduler"]);
      expect(result["/system scheduler"][0]).toContain("start-time=startup");
      expect(result["/system scheduler"][0]).toContain("interval=00:00:00");
    });

    it("should handle complex multi-section content", () => {
      const input: SchedulerGeneratorType = {
        Name: "network-maintenance",
        content: {
          "/ip firewall filter": [
            "add chain=input action=accept protocol=icmp",
            "add chain=input action=drop",
          ],
          "/ip route": ["add dst-address=10.0.0.0/8 gateway=192.168.1.1"],
          "/log": ['info "Network maintenance completed"'],
        },
        interval: "7d",
        startTime: "02:30:00",
      };

      const result = testWithOutput(
        "SchedulerGenerator",
        "Complex network maintenance scheduler",
        {
          Name: input.Name,
          content: input.content,
          interval: input.interval,
          startTime: input.startTime,
        },
        () => SchedulerGenerator(input),
      );

      validateRouterConfig(result, ["/system scheduler"]);
      expect(result["/system scheduler"][0]).toContain(
        "name=network-maintenance",
      );
      expect(result["/system scheduler"][0]).toContain("interval=7d");
    });
  });

  describe("ScriptGenerator", () => {
    it("should create a basic script configuration", () => {
      const input: ScriptGeneratorType = {
        ScriptContent: {
          "/system resource": ["print"],
          "/log": ['info "System resources checked"'],
        },
        scriptName: "resource-monitor",
      };

      const result = testWithOutput(
        "ScriptGenerator",
        "Basic resource monitor script",
        {
          ScriptContent: input.ScriptContent,
          scriptName: input.scriptName,
        },
        () => ScriptGenerator(input),
      );

      validateRouterConfig(result, ["/system script"]);
      expect(result["/system script"][0]).toContain("name=resource-monitor");
      expect(result["/system script"][0]).toContain("owner=admin");
      expect(result["/system script"][0]).toContain("source=");
    });

    it("should handle complex script with multiple sections", () => {
      const input: ScriptGeneratorType = {
        ScriptContent: {
          "": [
            "# VPN Connection Monitor Script",
            "# Checks VPN tunnel status and reconnects if needed",
          ],
          "/interface l2tp-client": [
            ":if ([get [find name=vpn-tunnel] running] = false) do={",
            "  enable vpn-tunnel",
            '  :log info "VPN tunnel reconnected"',
            "}",
          ],
          "/ip route": ["add dst-address=10.0.0.0/8 gateway=vpn-tunnel"],
        },
        scriptName: "vpn-monitor",
      };

      const result = testWithOutput(
        "ScriptGenerator",
        "Complex VPN monitor script",
        {
          ScriptContent: input.ScriptContent,
          scriptName: input.scriptName,
        },
        () => ScriptGenerator(input),
      );

      validateRouterConfig(result, ["/system script"]);
      expect(result["/system script"][0]).toContain("name=vpn-monitor");
    });
  });

  describe("OneTimeScript", () => {
    it("should create a complete one-time script setup", () => {
      const input: OneTimeScriptType = {
        ScriptContent: {
          "/ip address": ["add address=192.168.100.1/24 interface=ether2"],
          "/ip pool": [
            "add name=dhcp-pool ranges=192.168.100.100-192.168.100.200",
          ],
          "/ip dhcp-server": [
            "add address-pool=dhcp-pool interface=ether2 name=dhcp-server",
          ],
        },
        name: "initial-setup",
        startTime: "startup",
      };

      const result = testWithOutput(
        "OneTimeScript",
        "Complete initial setup one-time script",
        {
          ScriptContent: input.ScriptContent,
          name: input.name,
          startTime: input.startTime,
        },
        () => OneTimeScript(input),
      );

      validateRouterConfig(result, ["/system script", "/system scheduler"]);

      // Should contain both script and scheduler
      expect(result["/system script"]).toBeDefined();
      expect(result["/system scheduler"]).toBeDefined();

      // Should contain cleanup command in script
      const scriptCommand = result["/system script"][0];
      expect(scriptCommand).toContain("name=initial-setup");

      // Should contain scheduler that runs the script
      const schedulerCommand = result["/system scheduler"][0];
      expect(schedulerCommand).toContain("name=initial-setup");
      expect(schedulerCommand).toContain("start-time=startup");

      // Should have explanatory comments
      expect(result[""]).toBeDefined();
      expect(result[""][0]).toContain("One-Time Script Setup");
    });

    it("should create timed one-time script with custom interval", () => {
      const input: OneTimeScriptType = {
        ScriptContent: {
          "/tool fetch": [
            'url="https://example.com/config.rsc" dst-path=downloaded-config.rsc',
          ],
          "/import": ["downloaded-config.rsc"],
          "/file": ["remove downloaded-config.rsc"],
        },
        name: "config-import",
        interval: "00:05:00",
        startTime: "12:00:00",
      };

      const result = testWithOutput(
        "OneTimeScript",
        "Timed configuration import script",
        {
          ScriptContent: input.ScriptContent,
          name: input.name,
          interval: input.interval,
          startTime: input.startTime,
        },
        () => OneTimeScript(input),
      );

      validateRouterConfig(result, ["/system script", "/system scheduler"]);

      const schedulerCommand = result["/system scheduler"][0];
      expect(schedulerCommand).toContain("interval=00:05:00");
      expect(schedulerCommand).toContain("start-time=12:00:00");
      expect(schedulerCommand).toContain("name=config-import");
    });

    it("should handle complex one-time script with network reconfiguration", () => {
      const input: OneTimeScriptType = {
        ScriptContent: {
          "": [
            "# Emergency network reconfiguration",
            "# Reconfigures network settings for maintenance mode",
          ],
          "/ip address": [
            "remove [find interface=ether1]",
            "add address=10.10.10.1/24 interface=ether1",
          ],
          "/ip firewall filter": [
            "add chain=input action=accept src-address=10.10.10.0/24",
            "add chain=input action=drop",
          ],
          "/ip service": ["enable ssh", "set ssh port=2222"],
          "/log": ['warning "Emergency network reconfiguration completed"'],
        },
        name: "emergency-reconfig",
        startTime: "startup",
      };

      const result = testWithOutput(
        "OneTimeScript",
        "Emergency network reconfiguration",
        {
          ScriptContent: input.ScriptContent,
          name: input.name,
          startTime: input.startTime,
        },
        () => OneTimeScript(input),
      );

      validateRouterConfig(result, ["/system script", "/system scheduler"]);

      // Verify the script contains all original content plus cleanup
      const scriptSource = result["/system script"][0];
      expect(scriptSource).toContain("name=emergency-reconfig");

      // Verify comments are included in the output
      expect(result[""]).toBeDefined();
      expect(
        result[""].some((line) => line.includes("One-Time Script Setup")),
      ).toBe(true);
    });
  });

  describe("Integration Tests", () => {
    it("should work with real-world router configuration scenario", () => {
      // Test a complete scenario: setting up a guest network with one-time script
      const guestNetworkConfig: RouterConfig = {
        "": [
          "# Guest Network Setup",
          "# Creates isolated guest network with internet access only",
        ],
        "/interface bridge": ["add name=bridge-guest"],
        "/interface bridge port": ["add bridge=bridge-guest interface=ether3"],
        "/ip address": ["add address=192.168.200.1/24 interface=bridge-guest"],
        "/ip pool": [
          "add name=guest-pool ranges=192.168.200.100-192.168.200.200",
        ],
        "/ip dhcp-server": [
          "add address-pool=guest-pool interface=bridge-guest name=guest-dhcp",
        ],
        "/ip dhcp-server network": [
          "add address=192.168.200.0/24 gateway=192.168.200.1 dns-server=8.8.8.8,8.8.4.4",
        ],
        "/ip firewall filter": [
          "add chain=forward action=drop src-address=192.168.200.0/24 dst-address=192.168.1.0/24",
          "add chain=forward action=accept src-address=192.168.200.0/24",
        ],
      };

      const result = testWithOutput(
        "OneTimeScript - Integration Test",
        "Complete guest network setup",
        {
          ScriptContent: guestNetworkConfig,
          name: "guest-network-setup",
          startTime: "startup",
        },
        () =>
          OneTimeScript({
            ScriptContent: guestNetworkConfig,
            name: "guest-network-setup",
            startTime: "startup",
          }),
      );

      validateRouterConfig(result, ["/system script", "/system scheduler"]);

      // Verify it contains all the expected configuration sections
      expect(result[""]).toBeDefined(); // Comments
      expect(result["/system script"]).toBeDefined();
      expect(result["/system scheduler"]).toBeDefined();

      // The script should contain the original content plus cleanup
      const scriptCommand = result["/system script"][0];
      expect(scriptCommand).toContain("guest-network-setup");
    });
  });
});

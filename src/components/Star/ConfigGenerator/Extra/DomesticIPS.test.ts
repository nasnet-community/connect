import { describe, expect, it } from "vitest";
import { generateDomesticIPScript } from "./DomesticIPS";
import { SConfigGenerator } from "../utils/ConfigGeneratorUtil";

// TODO(nice-to-have): these tests only assert substring presence. They would
// not catch e.g. an unbalanced brace in the boot-recovery on-event string,
// because that bug only surfaces when RouterOS parses the .rsc. Followups:
//   - snapshot test of the full SConfigGenerator output
//   - a tiny RouterOS smoke-parser (matched { }, [ ], no orphan `\` continuations)
//   - threshold math tests that exercise minRequired branches

describe("Domestic IP list scheduling", () => {
    it("defaults the IP list updater to bi-weekly", () => {
        const result = generateDomesticIPScript("03:00");
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(2);
        expect(configString).toContain("name=DomesticIPUpdate");
        expect(configString).toContain("interval=14d");
        expect(configString).toContain("name=DomesticIPUpdate-BootCheck");
    });

    it("supports explicit scheduling frequency", () => {
        const result = generateDomesticIPScript("03:00", "Daily");
        const configString = SConfigGenerator(result);

        expect(configString).toContain("name=DomesticIPUpdate");
        expect(configString).toContain("interval=1d");
    });

    it("generates failure-safe import logic", () => {
        const result = generateDomesticIPScript("03:00");
        const scriptCommand = result["/system script"][0];

        expect(scriptCommand).toContain("stagingListName");
        expect(scriptCommand).toContain("domesticIPUpdateRunning");
        expect(scriptCommand).toContain("Validation failed - staged");
    });
});

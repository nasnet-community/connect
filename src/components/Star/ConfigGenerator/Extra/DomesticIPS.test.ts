import { describe, expect, it } from "vitest";
import { generateDomesticIPScript } from "./DomesticIPS";
import { SConfigGenerator } from "../utils/ConfigGeneratorUtil";

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

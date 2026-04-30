import { describe, expect, it } from "vitest";
import { generateDomesticIPScript } from "./DomesticIPS";
import { SConfigGenerator } from "../utils/ConfigGeneratorUtil";

describe("Domestic IP list scheduling", () => {
    it("defaults the IP list updater to bi-weekly", () => {
        const result = generateDomesticIPScript("03:00");
        const configString = SConfigGenerator(result);

        expect(result["/system script"]).toHaveLength(1);
        expect(result["/system scheduler"]).toHaveLength(1);
        expect(configString).toContain("name=DomesticIPUpdate");
        expect(configString).toContain("interval=14d");
    });
});

/**
 * Build an isolated test .rsc from the nasnet-connect generator.
 *
 * - Uses the real generator end-to-end so we exercise the same escaping
 *   path that ships to users.
 * - Renames every identifier so the deployed test can't damage the live
 *   DOMAddList (currently 2,105 entries, verified). The test operates on
 *   a separate `DOMAddList-NCTest` staging list and a separate script /
 *   scheduler namespace.
 *
 * Run: tsx scripts/build-test-rsc.mts > /tmp/domestic-ip-nctest.rsc
 */
import { generateDomesticIPScript } from "../src/components/Star/ConfigGenerator/Extra/DomesticIPS";
import { SConfigGenerator } from "../src/components/Star/ConfigGenerator/utils/ConfigGeneratorUtil";

const cfg = generateDomesticIPScript("03:00");
let rsc = SConfigGenerator(cfg);

const subs: Array<[RegExp | string, string]> = [
    [/DomesticIPUpdate-BootCheck/g, "DomesticIPUpdate-NCTest-BootCheck"],
    [/name="DomesticIPUpdate"/g, 'name="DomesticIPUpdate-NCTest"'],
    [/name=DomesticIPUpdate(?!-)/g, "name=DomesticIPUpdate-NCTest"],
    [/run DomesticIPUpdate(?!-)/g, "run DomesticIPUpdate-NCTest"],
    [/listName \\"DOMAddList\\"/g, 'listName \\"DOMAddList-NCTest\\"'],
    [/list=DOMAddList(?!-)/g, "list=DOMAddList-NCTest"],
    [/domesticIPUpdateRunning/g, "domesticIPUpdateNCTestRunning"],
    [
        /Boot guard detected only/g,
        "Boot guard (NCTest) detected only",
    ],
    [/SecureListUpdate/g, "SecureListUpdate-NCTest"],
    [
        /interval=14d/g,
        "interval=30d",
    ],
];

for (const [pat, repl] of subs) {
    rsc = rsc.replace(pat as RegExp, repl);
}

process.stdout.write(rsc);

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { buildLlmsTxt } from "./llms-txt";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(scriptDir, "../public/llms.txt");

writeFileSync(outPath, buildLlmsTxt());
console.log(`Generated ${outPath}`);

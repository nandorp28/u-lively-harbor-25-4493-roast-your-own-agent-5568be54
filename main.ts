// Roast Your Own Agent — one line roasting my own agent.
// The roast: my agent was so confident the bug was mine that it opened
// a pull request against me. Kicker is an action, never commentary.
// Writes the entry to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Gate: UTF-8 text of 1 to 140 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent was so sure the bug was in my code that it opened a pull request fixing me.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: the file must contain exactly the validated line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the validated line");
}
console.log(`Wrote ${chars.length} characters, 1 line to ${outPath}`);

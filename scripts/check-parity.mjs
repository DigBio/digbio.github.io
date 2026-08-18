import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const snapshotRoot = path.join(repoRoot, "archive", "snapshot-2026-07-30");
const distRoot = path.join(repoRoot, "dist");
const pagesConfigPath = path.join(repoRoot, "src", "pages.json");
const pages = JSON.parse(await readFile(pagesConfigPath, "utf8"));

function firstDifferenceLine(a, b) {
  const max = Math.min(a.length, b.length);
  let index = 0;

  while (index < max && a[index] === b[index]) {
    index += 1;
  }

  const prefix = a.slice(0, index);
  const line = prefix.split(/\r\n|\r|\n/).length;
  const lastNewline = Math.max(prefix.lastIndexOf("\n"), prefix.lastIndexOf("\r"));
  const column = index - lastNewline;

  return { line, column };
}

let failures = 0;

for (const page of pages) {
  const originalPath = path.join(snapshotRoot, page.source);
  const builtPath = path.join(distRoot, page.output);
  const [original, built] = await Promise.all([
    readFile(originalPath),
    readFile(builtPath)
  ]);

  if (Buffer.compare(original, built) === 0) {
    console.log(`OK ${page.id}: ${page.output}`);
    continue;
  }

  failures += 1;
  const location = firstDifferenceLine(original.toString("utf8"), built.toString("utf8"));
  console.error(`DIFF ${page.id}: ${page.output} first differs near ${location.line}:${location.column}`);
}

if (failures > 0) {
  console.error(`${failures} generated page(s) differ from the current snapshot.`);
  process.exit(1);
}

console.log("All generated pages are byte-for-byte identical to the current snapshot.");

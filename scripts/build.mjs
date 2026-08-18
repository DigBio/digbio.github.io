import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const snapshotRoot = path.join(repoRoot, "archive", "snapshot-2026-07-30");
const distRoot = path.join(repoRoot, "dist");
const pagesConfigPath = path.join(repoRoot, "src", "pages.json");
const pages = JSON.parse(await readFile(pagesConfigPath, "utf8"));

function assertInside(parent, child) {
  const relative = path.relative(parent, child);

  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to operate outside repository root: ${child}`);
  }
}

const assetRoots = ["wp-content", "wp-includes"];

async function copySnapshotAssets() {
  for (const assetRoot of assetRoots) {
    const from = path.join(snapshotRoot, assetRoot);
    const to = path.join(distRoot, assetRoot);

    await cp(from, to, { recursive: true });
  }
}

async function buildPage(page) {
  const beforePath = path.join(repoRoot, "src", "shells", `${page.id}.before.html`);
  const pagePath = path.join(repoRoot, "src", "pages", `${page.id}.html`);
  const afterPath = path.join(repoRoot, "src", "shells", `${page.id}.after.html`);
  const outPath = path.join(distRoot, page.output);

  assertInside(distRoot, outPath);

  const [before, content, after] = await Promise.all([
    readFile(beforePath, "utf8"),
    readFile(pagePath, "utf8"),
    readFile(afterPath, "utf8")
  ]);

  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, `${before}${content}${after}`, "utf8");
}

assertInside(repoRoot, distRoot);
assertInside(repoRoot, snapshotRoot);

await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });
await copySnapshotAssets();
await writeFile(path.join(distRoot, ".nojekyll"), "", "utf8");

for (const page of pages) {
  await buildPage(page);
}

console.log(`Built ${pages.length} generated pages into dist/`);

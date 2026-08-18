import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const snapshotRoot = path.join(repoRoot, "archive", "snapshot-2026-07-30");
const force = process.argv.includes("--force");

const pagesConfigPath = path.join(repoRoot, "src", "pages.json");
const pages = JSON.parse(await readFile(pagesConfigPath, "utf8"));

const pagesDir = path.join(repoRoot, "src", "pages");
const shellsDir = path.join(repoRoot, "src", "shells");

await mkdir(pagesDir, { recursive: true });
await mkdir(shellsDir, { recursive: true });

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

function splitAtMain(html, sourcePath) {
  const mainMatch = html.match(/<main\b[^>]*\bid=(["'])content\1[^>]*>/i);

  if (!mainMatch || mainMatch.index === undefined) {
    throw new Error(`Could not find <main id="content"> in ${sourcePath}`);
  }

  const mainStart = mainMatch.index;
  const closeStart = html.indexOf("</main>", mainStart);

  if (closeStart === -1) {
    throw new Error(`Could not find </main> in ${sourcePath}`);
  }

  const mainEnd = closeStart + "</main>".length;

  return {
    before: html.slice(0, mainStart),
    page: html.slice(mainStart, mainEnd),
    after: html.slice(mainEnd)
  };
}

for (const page of pages) {
  const originalPath = path.join(snapshotRoot, page.source);
  const pagePath = path.join(pagesDir, `${page.id}.html`);
  const beforePath = path.join(shellsDir, `${page.id}.before.html`);
  const afterPath = path.join(shellsDir, `${page.id}.after.html`);

  if (!force) {
    const existing = [];

    for (const targetPath of [pagePath, beforePath, afterPath]) {
      if (await exists(targetPath)) {
        existing.push(path.relative(repoRoot, targetPath));
      }
    }

    if (existing.length > 0) {
      throw new Error(
        [
          `Refusing to overwrite existing extracted files for "${page.id}".`,
          `Existing files: ${existing.join(", ")}`,
          "Run `npm run extract:pages -- --force` only when you intentionally want to reset them from the snapshot."
        ].join("\n")
      );
    }
  }

  const html = await readFile(originalPath, "utf8");
  const parts = splitAtMain(html, page.source);

  await writeFile(beforePath, parts.before, "utf8");
  await writeFile(pagePath, parts.page, "utf8");
  await writeFile(afterPath, parts.after, "utf8");

  console.log(`Extracted ${page.id} from ${page.source}`);
}

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("cau hinh Cloudflare co du bindings san xuat", async () => {
  const config = JSON.parse(await readFile(new URL("wrangler.jsonc", root), "utf8"));

  assert.equal(config.main, "worker/index.ts");
  assert.equal(config.assets.binding, "ASSETS");
  assert.equal(config.assets.directory, "dist/client");
  assert.equal(config.assets.run_worker_first, true);
  assert.equal(config.images.binding, "IMAGES");
  assert.ok(
    config.d1_databases.some(
      (database) =>
        database.binding === "DB" &&
        database.database_name === "co-thach-travel-guide-db" &&
        database.migrations_dir === "drizzle",
    ),
  );
  assert.equal(config.vars.AI_API_BASE, "https://gemini.huyvo.uk/v1");
  assert.equal(config.vars.AI_MODEL, "gemini-3.5-flash");
});

test("goi xuat khong ghi cung khoa bi mat", async () => {
  const [config, example, guide] = await Promise.all([
    readFile(new URL("wrangler.jsonc", root), "utf8"),
    readFile(new URL(".dev.vars.example", root), "utf8"),
    readFile(new URL("CLOUDFLARE_DEPLOY.md", root), "utf8"),
  ]);
  const exportedText = `${config}\n${example}\n${guide}`;

  assert.doesNotMatch(exportedText, /\d{8,12}:[A-Za-z0-9_-]{20,}/);
  assert.doesNotMatch(exportedText, /LEADS_ADMIN_TOKEN[ \t]*=[ \t]*\S{8,}/);
  assert.match(guide, /wrangler secret put TELEGRAM_BOT_TOKEN/);
  assert.match(guide, /wrangler secret put LEADS_ADMIN_TOKEN/);
});

import { expect, test } from "@playwright/test";

// Paths are relative ("health", not "/health"), so the suite also works when
// the site lives under a sub-path, like GitHub Pages'
// https://<owner>.github.io/<repo>/ (playwright.config.ts adds the slash).

// Deliberate break for the criterion 5 revert test (M3, GitHub Pages): an
// absolute path ignores the Pages sub-path. The local pre-traffic test
// serves the site at the root, so it passes there; the live checks fail.
test("GET /health returns ok @prod-safe", async ({ request }) => {
  const res = await request.get("/health");
  expect(res.status()).toBe(200);
  const body = (await res.json()) as { status: string; version: string };
  expect(body.status).toBe("ok");
  expect(typeof body.version).toBe("string");
  expect(body.version.length).toBeGreaterThan(0);
});

test("GET / returns hello @prod-safe", async ({ request }) => {
  const res = await request.get("");
  expect(res.status()).toBe(200);
  expect(await res.json()).toEqual({ message: "hello" });
});

test("GET /unknown returns 404 JSON", async ({ request }) => {
  const res = await request.get("unknown");
  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ error: "not found" });
});

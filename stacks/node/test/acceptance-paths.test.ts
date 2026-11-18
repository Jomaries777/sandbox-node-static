import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// GitHub Pages serves the site under a sub-path (https://<owner>.github.io/<repo>/).
// An absolute request path ("/health") skips that sub-path, so it passes the
// local pre-traffic test (served at the root) and fails only live.
describe("acceptance suite", () => {
  it("uses relative request paths only", () => {
    const source = readFileSync(
      new URL("../acceptance/api.spec.ts", import.meta.url),
      "utf8",
    );
    expect(source).not.toMatch(/request\.\w+\(\s*["'`]\//);
  });
});

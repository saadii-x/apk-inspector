import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(appDir, "../..");
const turbopackRoot = existsSync(path.join(workspaceRoot, "package-lock.json"))
  ? workspaceRoot
  : appDir;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: turbopackRoot,
  },
};

export default nextConfig;

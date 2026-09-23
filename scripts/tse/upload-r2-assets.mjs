import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const wrangler = process.env.WRANGLER_JS;
const config = path.join(root, "infra/cloudflare/wrangler.jsonc");
const assetRoot = path.join(root, "public/candidate-photos/2026");
const concurrency = Number(process.env.R2_UPLOAD_CONCURRENCY || 8);

if (!wrangler) throw new Error("Set WRANGLER_JS to the installed Wrangler entrypoint.");

async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(fullPath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".jpg")) files.push(fullPath);
  }
  return files;
}

function objectKey(filePath) {
  const relative = path.relative(assetRoot, filePath).replaceAll(path.sep, "/");
  const [scope, filename] = relative.split("/");
  const prefix = filename.startsWith("FRJ") ? "FRJ" : "FBR";
  const candidateId = filename.slice(prefix.length).replace(/_div\.jpg$/i, "");
  return `candidates/2026/${scope}/${candidateId}.jpg`;
}

function upload(filePath) {
  return new Promise((resolve, reject) => {
    const args = [
      wrangler,
      "r2", "object", "put", `campanha-edson/${objectKey(filePath)}`,
      "--file", filePath,
      "--remote",
      "--config", config,
      "--content-type", "image/jpeg",
      "--cache-control", "public, max-age=86400",
      "-y",
    ];
    const child = spawn(process.execPath, args, { stdio: "ignore" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`Wrangler exited with ${code} for ${filePath}`)));
  });
}

const files = await filesIn(assetRoot);
let next = 0;
let completed = 0;
const failures = [];

async function worker() {
  while (true) {
    const index = next++;
    if (index >= files.length) return;
    try {
      await upload(files[index]);
      completed += 1;
      if (completed % 100 === 0 || completed === files.length) console.log(`Uploaded ${completed}/${files.length}`);
    } catch (error) {
      failures.push({ file: files[index], error: String(error) });
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, files.length) }, worker));
if (failures.length) {
  console.error(JSON.stringify(failures.slice(0, 20), null, 2));
  process.exitCode = 1;
}

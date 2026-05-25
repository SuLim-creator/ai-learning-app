#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const LESSONS_DIR = resolve(ROOT, "content/lessons");

function processFile(path) {
  const lesson = JSON.parse(readFileSync(path, "utf8"));
  const app = lesson.sections.find((s) => s.type === "application");
  if (!app) return false;

  const maxOrder = Math.max(...lesson.sections.map((s) => s.order));
  if (app.order === maxOrder) return false;

  const oldOrder = app.order;
  for (const s of lesson.sections) {
    if (s === app) continue;
    if (s.order > oldOrder) s.order -= 1;
  }
  app.order = maxOrder;

  lesson.sections.sort((a, b) => a.order - b.order);
  writeFileSync(path, JSON.stringify(lesson, null, 2) + "\n");
  return true;
}

let moved = 0;
for (const topic of readdirSync(LESSONS_DIR)) {
  const topicDir = join(LESSONS_DIR, topic);
  for (const file of readdirSync(topicDir)) {
    if (!file.endsWith(".json")) continue;
    const path = join(topicDir, file);
    if (processFile(path)) {
      console.log(`MOVED: ${topic}/${file}`);
      moved += 1;
    }
  }
}
console.log(`\nTotal moved: ${moved}`);

import fs from "fs";
import * as path from "path";

export function getLines(filePath: string): string[] {
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split(/\n/);
  if (lines.at(-1) === "") lines.pop();
  return lines;
}

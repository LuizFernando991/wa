import path from "path";
import fs from "fs";
import { WordsObject } from "../types/WordsObject.types";

export function loadHierarchy(): WordsObject {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'dicts', 'hierarchy.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}
import { IndexedHierarchy } from "../types/IndexHierarchy.types";
import { WordsObject } from "../types/WordsObject.types";

export function indexHierarchyByDepth(obj: WordsObject): IndexedHierarchy {
  const indexed: IndexedHierarchy = {};

  function traverse(currentObj: WordsObject, currentDepth: number): void {
    if (!indexed[currentDepth]) {
      indexed[currentDepth] = [];
    }
    indexed[currentDepth].push(currentObj);

    for (const value of Object.values(currentObj)) {
      if (value && typeof value === 'object') {
        traverse(value, currentDepth + 1);
      }
    }
  }

  traverse(obj, 0);
  return indexed;
}
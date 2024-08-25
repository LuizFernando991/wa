import { HierarchyNode } from "../types/HierarchyNode";

export const transformEmptyObjectsToNull = (obj: HierarchyNode): HierarchyNode => {
  const result: HierarchyNode = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined || Object.keys(value).length === 0) {
      result[key] = null;
    } else {
      result[key] = transformEmptyObjectsToNull(value as HierarchyNode);
    }
  }

  return result;
};
import { IndexedHierarchy } from "../types/IndexHierarchy.types";
import { WordsObject } from "../types/WordsObject.types";

export function countWordsAtDepth(indexed: IndexedHierarchy, depth: number, wordsArray: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  const wordSet = new Set(wordsArray.map(word => word.toLowerCase()));

  const levelItems = indexed[depth] || [];

  // Percorre cada objeto no nível especificado
  for (const currentObj of levelItems) {
    for (const [key, value] of Object.entries(currentObj)) {
      let count = 0;

      // Verifica se a chave atual corresponde a alguma das palavras
      if (wordSet.has(key.toLowerCase())) {
        count++;
      }

      // Verifica se alguma das chaves filhas corresponde a alguma das palavras
      function countWordsInSubtree(subObj: WordsObject | null): void {
        if (subObj) {
          const seen = new Set<string>();

          for (const subKey of Object.keys(subObj)) {
            if (wordSet.has(subKey.toLowerCase()) && !seen.has(subKey.toLowerCase())) {
              count++;
              seen.add(subKey.toLowerCase());
            }

            // Se o valor for um objeto, percorre recursivamente
            const subValue = subObj[subKey];
            if (typeof subValue === 'object' && subValue !== null) {
              countWordsInSubtree(subValue);
            }
          }
        }
      }

      countWordsInSubtree(value);

      if (count > 0) {
        result[key] = count;
      }
    }
  }

  return result;
}

// Direct Count:



// export function countWordsAtDepth(obj: WordsObject, depth: number, wordsArray: string[]): Record<string, number> {
//   const result: Record<string, number> = {};
//   const wordSet = new Set(wordsArray.map(word => word.toLowerCase()));

//   function traverse(currentObj: WordsObject, currentDepth: number): void {
//     if (currentDepth === depth) {
//       Object.keys(currentObj).forEach(key => {
//         const value = currentObj[key];
//         if (value && typeof value === 'object') {
//           let count = 0;
//           function countWordsInSubtree(subObj: WordsObject | null): void {
//             if (subObj) {
//               Object.keys(subObj).forEach(subKey => {
//                 const subValue = subObj[subKey];
//                 if (typeof subValue === 'object' && subValue !== null) {
//                   countWordsInSubtree(subValue);
//                 } else if (wordSet.has(subKey.toLowerCase())) {
//                   count += 1;
//                 }
//               });
//             }
//           }
//           countWordsInSubtree(value);
//           if (count > 0) {
//             result[key] = count;
//           }
//         }
//       });
//     } else if (currentDepth < depth) {
//       Object.keys(currentObj).forEach(key => {
//         const value = currentObj[key];
//         if (value && typeof value === 'object') {
//           traverse(value, currentDepth + 1);
//         }
//       });
//     }
//   }
  
//   traverse(obj, 0);
//   return result;
// };
import { Command } from 'commander';
import { performance } from 'perf_hooks';
import { loadHierarchy } from './utils/loadHierarchy';
import { countWordsAtDepth } from './services/countWordsAtDepth';
import { indexHierarchyByDepth } from './utils/indexHierarchyByDepth';

function main() {
  const program = new Command();
  program
  .command('analyze')
  .description('Analyze a phrase and count words at a specific depth')
  .option('-d, --depth <number>', 'Depth level to search for words', parseInt)
  .option('-v, --verbose', 'Output verbose information')
  .argument('<phrase>', 'Phrase to analyze')
  .action((phrase: string, options) => {
    
    
    const depth = options.depth - 1 || 0;
    
    if (depth < 0) {
      return console.log("Invalid depth")
    }
    
    const startLoadTime = performance.now();
    const hierarchy = loadHierarchy();
    const indexedHierarchy = indexHierarchyByDepth(hierarchy);
    const endLoadTime = performance.now();

    const startCountTime = performance.now();
    const results = countWordsAtDepth(indexedHierarchy, depth, phrase.split(' '));
    const endCountTime = performance.now();
  
    if (Object.keys(results).length === 0) {
        console.log('0');
    } else {
        for (const [key, count] of Object.entries(results)) {
            console.log(`${key} = ${count}`);
        }
    }
  

    if (options.verbose) {
      console.log(`Time to load parameters: ${(endLoadTime - startLoadTime).toFixed(2)}ms`);
      console.log(`Time to analyze phrase: ${(endCountTime - startCountTime).toFixed(2)}ms`);
    }
  })

  program.parse(process.argv);
}

main();


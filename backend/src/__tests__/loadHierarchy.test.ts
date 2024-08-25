import path from 'path';
import fs from 'fs';
import { loadHierarchy } from '../utils/loadHierarchy';

jest.mock('fs');

describe('loadHierarchy', () => {
  it('should load and parse the hierarchy JSON file correctly', () => {
    const mockData = {
      "Animals": {
        "Mammals": {
          "Carnivores": {
            "Cats": null,
            "Dogs": null
          }
        }
      }
    };

    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));

    const result = loadHierarchy();

    expect(result).toEqual(mockData);
  });
});
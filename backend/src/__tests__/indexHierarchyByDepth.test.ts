import { indexHierarchyByDepth } from '../utils/indexHierarchyByDepth';
import { WordsObject } from '../types/WordsObject.types';
import { IndexedHierarchy } from '../types/IndexHierarchy.types';

const mockData: WordsObject = {
  "Animals": {
    "Mammals": {
      "Carnivores": {
        "Cats": null,
        "Dogs": null
      }
    },
    "Birds": {
      "Raptors": {
        "Eagles": null,
        "Hawks": null
      }
    }
  }
};

const expectedResult: IndexedHierarchy = {
  0: [mockData],
  1: [mockData.Animals!],
  2: [
    mockData.Animals!.Mammals!,
    mockData.Animals!.Birds!
  ],
  3: [
    mockData.Animals!.Mammals!.Carnivores!,
    mockData.Animals!.Birds!.Raptors!
  ]
};

describe('indexHierarchyByDepth', () => {
  it('should index the hierarchy by depth correctly', () => {
    const result = indexHierarchyByDepth(mockData);
    console.log(result[4])
    expect(result[0]).toMatchObject(expectedResult[0]);
    expect(result[1]).toMatchObject(expectedResult[1]);
    expect(result[2]).toMatchObject(expectedResult[2]);
    expect(result[3]).toMatchObject(expectedResult[3]);
  });
});
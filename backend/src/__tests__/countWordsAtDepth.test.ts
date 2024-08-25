import { countWordsAtDepth } from '../services/countWordsAtDepth';
import { IndexedHierarchy } from '../types/IndexHierarchy.types';
import { WordsObject } from '../types/WordsObject.types';

const mockHierarchy = {
  Animais: {
    Mamíferos: {
      Carnívoros: {
        Felinos: {
          Leões: null,
          Tigres: null,
          Jaguars: null,
          Leopardos: null,
        },
      },
      Herbívoros: {
        Equídeos: {
          Cavalos: null,
          Zebras: null,
          Asnos: null,
        },
      },
      Bovídeos: {
        Bois: null,
        Búfalos: null,
        Antílopes: null,
        Cabras: null,
      },
      Primatas: {
        Gorilas: null,
        Chimpanzés: null,
        Orangotangos: null,
      },
    },
    Aves: {
      Rapinas: {
        Águias: null,
        Falcões: null,
        Corujas: null,
        Milhafres: null,
      },
      Pássaros: {
        Canários: null,
        Papagaios: null,
        Pardais: null,
        Rouxinóis: null,
      },
    },
  },
};

const indexedHierarchy: IndexedHierarchy = {
  1: [
    { Animais: mockHierarchy.Animais },
  ],
  2: [
    { Mamíferos: mockHierarchy.Animais.Mamíferos },
    { Aves: mockHierarchy.Animais.Aves },
  ],
  3: [
    { Carnívoros: mockHierarchy.Animais.Mamíferos.Carnívoros },
    { Herbívoros: mockHierarchy.Animais.Mamíferos.Herbívoros },
    { Bovídeos: mockHierarchy.Animais.Mamíferos.Bovídeos },
    { Primatas: mockHierarchy.Animais.Mamíferos.Primatas },
    { Rapinas: mockHierarchy.Animais.Aves.Rapinas },
    { Pássaros: mockHierarchy.Animais.Aves.Pássaros },
  ],
  4: [
    { Felinos: mockHierarchy.Animais.Mamíferos.Carnívoros.Felinos },
    { Equídeos: mockHierarchy.Animais.Mamíferos.Herbívoros.Equídeos },
    { Bois: mockHierarchy.Animais.Mamíferos.Bovídeos.Bois },
    { Chimpanzés: mockHierarchy.Animais.Mamíferos.Primatas.Chimpanzés },
  ],
};


describe('countWordsAtDepth', () => {
  it('should count words at a specified depth correctly', () => { 
    const wordsArray = ['Eu', 'vi', 'gorilas', 'e', 'papagaios'];

    const result = countWordsAtDepth(indexedHierarchy, 2, wordsArray);

    expect(result).toEqual({
      Aves: 1,
      Mamíferos: 1
    });
  });

  it('should return an empty object if no words match at the specified depth', () => {

    const wordsArray = ['Gorillas', 'Elephants'];

    const result = countWordsAtDepth(indexedHierarchy, 2, wordsArray);

    expect(result).toEqual({});
  });

  it('should correctly handle nested objects', () => {

    const wordsArray = ['Felinos', 'Leões'];

    const result = countWordsAtDepth(indexedHierarchy, 4, wordsArray);

    expect(result).toEqual({
      Felinos: 2
    });
  });
});

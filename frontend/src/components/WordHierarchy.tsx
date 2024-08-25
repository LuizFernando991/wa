import React, { useState } from 'react';
import Node from './Node';
import { HierarchyNode } from '../types/HierarchyNode';
import { transformEmptyObjectsToNull } from '../utils/transformEmptyObjectsToNull';

const WordHierarchy: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<HierarchyNode>({});
  const [newRootName, setNewRootName] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const addRootNode = (name: string) => {
    if (name.trim() !== '') {
      setHierarchy((prev) => ({ ...prev, [name]: null }));
      setNewRootName('');
    }
  };

  const addChildNode = (path: string[], name: string) => {
    if (name.trim() === '') return;

    const addNodeAtPath = (node: HierarchyNode | null, path: string[], name: string): HierarchyNode => {
      if (node === null) {
        return { [name]: null };
      }

      if (path.length === 0) {
        return { ...node, [name]: null }; // Adiciona o nó como filho
      }

      const [current, ...rest] = path;
      return {
        ...node,
        [current]: addNodeAtPath(node[current] || null, rest, name),
      };
    };

    setHierarchy((prev) => addNodeAtPath(prev, path, name));
    setCurrentPath([]);
  };

  const handleSave = () => {
    const transformedHierarchy = transformEmptyObjectsToNull(hierarchy);
    const jsonString = JSON.stringify(transformedHierarchy, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[90vw]">
      <h1 className="text-2xl font-bold mb-4">Word Hierarchy Builder</h1>
      {Object.keys(hierarchy).map((rootName) => (
        <Node
          key={rootName}
          name={rootName}
          children={hierarchy[rootName] || {}}
          onAddNode={(path, name) => addChildNode(path, name)}
          path={[]}
          setCurrentPath={setCurrentPath}
        />
      ))}
      <div className="mt-4">
        <input
          type="text"
          value={newRootName}
          onChange={(e) => setNewRootName(e.target.value)}
          placeholder="Add root category"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addRootNode(newRootName);
            }
          }}
          className="border-b bg-transparent focus:outline-none p-1 ml-2"
        />
        <button
          onClick={() => addRootNode(newRootName)}
          className="ml-4 px-4 py-1 bg-green-500 text-white rounded"
        >
          Add Root
        </button>
      </div>
      {currentPath.length > 0 && (
        <div className="mt-4">
          <input
            type="text"
            value={newRootName}
            onChange={(e) => setNewRootName(e.target.value)}
            placeholder="Add child category"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addChildNode(currentPath, newRootName);
              }
            }}
            className="border border-gray-300 p-1 rounded"
          />
        </div>
      )}
      <button
        onClick={handleSave}
        className="w-full mt-5 px-4 py-1 bg-green-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
};

export default WordHierarchy;

import React, { useState } from 'react';
import { HierarchyNode } from '../types/HierarchyNode';

interface NodeProps {
  name: string;
  children: HierarchyNode | null; // Permite null
  onAddNode: (path: string[], name: string) => void;
  path: string[]; // O caminho do nó pai
  setCurrentPath: (path: string[]) => void; // Função para atualizar o caminho atual
}

const Node: React.FC<NodeProps> = ({ name, children, onAddNode, path, setCurrentPath }) => {
  const [newNodeName, setNewNodeName] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleAddNode = () => {
    if (newNodeName.trim() !== '') {
      onAddNode([...path, name], newNodeName); // Adiciona o nó como filho do caminho atual
      setNewNodeName('');
    }
  };

  return (
    <div className="ml-4 pl-2 border-l-2 border-dashed border-cyan-50">
      <div className='flex items-center mb-2'>
        <span className='text-lg'>{name}</span>
        <button onClick={() => setExpanded(!expanded)} className="ml-1 w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
          {expanded ? '-' : '+'}
        </button>
      </div>
      {expanded && (
        <div>
          {children && Object.keys(children).map((childName) => (
            <Node
              key={childName}
              name={childName}
              children={children[childName] || null} // Permite null
              onAddNode={onAddNode}
              path={[...path, name]} // Passa o caminho do nó pai
              setCurrentPath={setCurrentPath}
            />
          ))}
          <div className='flex mt-2'>
            <input
              type="text"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              placeholder="Add child node"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddNode();
                }
              }}
              className="py-1 border-b bg-transparent focus:outline-none p-1 ml-2"
            />
            <button
              onClick={handleAddNode}
              className="ml-4 px-5 py-1 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Node;

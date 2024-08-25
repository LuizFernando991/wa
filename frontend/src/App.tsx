import React from 'react';
import WordHierarchy from './components/WordHierarchy';

const App: React.FC = () => {
  return (
    <div className="pl-4 min-h-screen flex items-center justify-center w-full max-w-[100%] overflow-auto">
      <WordHierarchy />
    </div>
  );
};

export default App;
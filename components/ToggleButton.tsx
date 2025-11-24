import React from 'react';
import { ToggleOption } from '../types';

interface ToggleButtonProps {
  active: ToggleOption;
  onChange: (option: ToggleOption) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ active, onChange }) => {
  return (
    <div className="bg-slate-800 p-1 rounded-full inline-flex relative">
      <div 
        className={`absolute h-[calc(100%-8px)] top-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 ease-in-out w-[calc(50%-4px)] ${
          active === 'featured' ? 'left-1' : 'left-[calc(50%+2px)]'
        }`}
      />
      <button
        onClick={() => onChange('featured')}
        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          active === 'featured' ? 'text-white' : 'text-slate-400 hover:text-white'
        }`}
      >
        Featured
      </button>
      <button
        onClick={() => onChange('recent')}
        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          active === 'recent' ? 'text-white' : 'text-slate-400 hover:text-white'
        }`}
      >
        Recent
      </button>
    </div>
  );
};

export default ToggleButton;
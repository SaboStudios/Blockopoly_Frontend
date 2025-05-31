'use client';

import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export default function ToggleSwitch({ checked, onChange, disabled = false }: ToggleSwitchProps) {
  return (
    <div className="relative w-20 h-10 overflow-hidden flex-shrink-0">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className={`
          relative w-full h-full inline-flex items-center rounded-full transition-colors duration-200 ease-in-out 
          focus:outline-none focus:ring-offset-1
          ${checked 
            ? 'bg-transparent border border-[#0ff0fc]' 
            : 'bg-transparent border border-gray-800'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            absolute top-2 left-2 h-6 w-6 transform rounded-full transition-transform duration-200 ease-in-out
            ${checked 
              ? 'translate-x-10 bg-[#0ff0fc]' 
              : 'translate-x-0 bg-gray-400'
            }
          `}
        />
      </button>
    </div>
  );
}




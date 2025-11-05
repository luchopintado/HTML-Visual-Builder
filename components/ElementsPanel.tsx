import React from 'react';
import { ElementButton } from './ElementButton';
import { AVAILABLE_COMPONENTS } from '../constants';
import { ClearAllIcon } from './Icons';

interface ElementsPanelProps {
    onClearAll: () => void;
}

export const ElementsPanel: React.FC<ElementsPanelProps> = ({ onClearAll }) => {
    return (
        <aside className="w-64 bg-slate-800 p-4 border-r border-slate-700 flex flex-col shrink-0">
            <h2 className="text-xl font-bold mb-4 text-white">Elementos</h2>
            <div className="flex-grow overflow-y-auto pr-2 space-y-2">
                {AVAILABLE_COMPONENTS.map((comp, index) => (
                    <ElementButton
                        key={`${comp.name}-${index}`}
                        component={comp}
                    />
                ))}
            </div>
            <button
                onClick={onClearAll}
                className="mt-4 w-full text-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors flex items-center justify-center gap-2">
                <ClearAllIcon />
                Limpiar Todo
            </button>
        </aside>
    );
};

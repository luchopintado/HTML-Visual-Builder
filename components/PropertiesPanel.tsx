import React, { useState, useEffect } from 'react';
import type { ElementNode } from '../types';

interface PropertiesPanelProps {
    element: ElementNode | null;
    onUpdateClasses: (elementId: string, classes: string) => void;
    onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ element, onUpdateClasses, onClose }) => {
    const [classes, setClasses] = useState(element?.classes || '');

    useEffect(() => {
        setClasses(element?.classes || '');
    }, [element]);

    if (!element) {
        return (
            <div className="p-4 h-full flex items-center justify-center">
                <p className="text-slate-400 text-sm text-center">Selecciona un elemento para ver sus propiedades.</p>
            </div>
        );
    }

    const handleApply = () => {
        onUpdateClasses(element.id, classes);
    };

    return (
        <div className="p-4 flex flex-col h-full text-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Propiedades</h3>
                <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="mb-4">
                <span className="font-semibold text-slate-300">Elemento:</span>
                <span className="ml-2 font-mono bg-slate-700 text-cyan-300 px-2 py-1 rounded-md text-xs">{`<${String(element.tag)}>`}</span>
            </div>

            <div className="flex-grow flex flex-col">
                <label htmlFor="classes-editor" className="block text-slate-300 font-semibold mb-2">Clases CSS</label>
                <textarea
                    id="classes-editor"
                    value={classes}
                    onChange={(e) => setClasses(e.target.value)}
                    className="w-full flex-grow bg-slate-900 text-slate-200 p-2 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs resize-none"
                    spellCheck="false"
                />
            </div>

            <button
                onClick={handleApply}
                className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition-colors"
            >
                Aplicar Cambios
            </button>
        </div>
    );
};

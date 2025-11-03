
import React from 'react';
import { useDrag } from 'react-dnd';
import type { AvailableComponent, DragItem } from '../types';
import { ItemTypes } from '../constants';

interface ElementButtonProps {
    component: AvailableComponent;
}

export const ElementButton: React.FC<ElementButtonProps> = ({ component }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ELEMENT,
        item: component,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <button
            ref={drag}
            className="w-full flex items-center gap-3 p-2 rounded-md bg-slate-700 hover:bg-blue-600 transition-colors text-left"
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
        >
            <span className="text-blue-400">{component.icon}</span>
            <span className="font-medium">{component.name}</span>
        </button>
    );
};

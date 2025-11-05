import React from 'react';

interface EmptyContainerProps {
    isOver: boolean;
    canDrop: boolean;
}

export const EmptyContainer: React.FC<EmptyContainerProps> = ({ isOver, canDrop }) => (
    <div className={`flex items-center justify-center h-96 border-2 border-dashed ${isOver && canDrop ? 'border-blue-400' : isOver && !canDrop ? 'border-red-400' : 'border-slate-600'
        } rounded-lg pointer-events-none transition-colors`}>
        <p className="text-slate-400">Arrastra elementos desde el panel izquierdo aquí para comenzar.</p>
    </div>
);

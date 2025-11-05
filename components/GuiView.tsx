import React from 'react';
import { useDrop } from 'react-dnd';
import type { ElementNode, DragItem } from '../types';
import { canDropElement } from '../dnd-rules';
import { ItemTypes } from '../constants';
import { RenderNode } from './gui/RenderNode';

const CAN_EDIT_CONTENT_TAGS: (keyof React.JSX.IntrinsicElements)[] = ['p', 'h1', 'button', 'li'];

interface GuiViewProps {
    domTree: ElementNode[];
    onDropElement: (item: DragItem, parentId: string | null) => void;
    onDeleteElement: (elementId: string) => void;
    onUpdateElementContent: (elementId: string, content: string) => void;
    selectedElementId: string | null;
    onSelectElement: (elementId: string | null) => void;
    dropHandledRef: React.MutableRefObject<boolean>;
}

export const GuiView: React.FC<GuiViewProps> = ({ domTree, onDropElement, onDeleteElement, onUpdateElementContent, selectedElementId, onSelectElement, dropHandledRef }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.ELEMENT,
        canDrop: (item: DragItem) => {
            const childTag = 'id' in item ? item.tag : item.tag;
            return canDropElement('body', String(childTag));
        },
        drop: (item: DragItem) => {
            setTimeout(() => {
                if (!dropHandledRef.current) {
                    onDropElement(item, null);
                }
                dropHandledRef.current = false;
            }, 0);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [onDropElement, dropHandledRef]);

    const getBackgroundColor = () => {
        if (isOver && canDrop) {
            return 'bg-blue-900/10';
        }
        return '';
    };

    return (
        <div
            ref={(node) => {
                drop(node);
            }}
            className={`p-8 min-h-full transition-colors ${getBackgroundColor()}`}
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            onClick={() => onSelectElement(null)}
        >
            <div className="space-y-4">
                {domTree.length > 0 ? (
                    domTree.map(node => <RenderNode key={node.id} node={node} onDropElement={onDropElement} onDeleteElement={onDeleteElement} onUpdateElementContent={onUpdateElementContent} selectedElementId={selectedElementId} onSelectElement={onSelectElement} dropHandledRef={dropHandledRef} />)
                ) : (
                    <div className={`flex items-center justify-center h-96 border-2 border-dashed ${isOver && canDrop ? 'border-blue-400' : isOver && !canDrop ? 'border-red-400' : 'border-slate-600'} rounded-lg pointer-events-none transition-colors`}>
                        <p className="text-slate-400">Arrastra elementos desde el panel izquierdo aquí para comenzar.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

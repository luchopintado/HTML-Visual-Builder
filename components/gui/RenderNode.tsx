import React, { useState, useRef } from 'react';
import { useDrop, useDrag, useDragLayer } from 'react-dnd';
import type { ElementNode, DragItem } from '../../types';
import { canDropElement } from '../../dnd-rules';
import { ItemTypes } from '../../constants';
import { PencilIcon, TrashIcon } from '../Icons';

const CAN_EDIT_CONTENT_TAGS: (keyof React.JSX.IntrinsicElements)[] = ['p', 'h1', 'button', 'li'];

interface RenderNodeProps {
    node: ElementNode;
    onDropElement: (item: DragItem, parentId: string | null) => void;
    onDeleteElement: (elementId: string) => void;
    onUpdateElementContent: (elementId: string, content: string) => void;
    selectedElementId: string | null;
    onSelectElement: (elementId: string) => void;
    dropHandledRef: React.MutableRefObject<boolean>;
}

export const RenderNode: React.FC<RenderNodeProps> = ({ node, onDropElement, onDeleteElement, onUpdateElementContent, selectedElementId, onSelectElement, dropHandledRef }) => {
    const [isHovered, setIsHovered] = useState(false);
    const nodeRef = useRef(node);
    nodeRef.current = node;

    const { isDragging: isGlobalDragging } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
    }));

    const [{ isNodeDragging }, drag] = useDrag(() => ({
        type: ItemTypes.ELEMENT,
        item: node,
        collect: (monitor) => ({
            isNodeDragging: !!monitor.isDragging(),
        }),
    }), [node]);

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.ELEMENT,
        canDrop: (item: DragItem) => {
            const currentNode = nodeRef.current;
            const childTag = 'id' in item ? item.tag : item.tag;
            if ('id' in item && item.id === currentNode.id) return false;
            return canDropElement(String(currentNode.tag), String(childTag));
        },
        drop: (item: DragItem) => {
            dropHandledRef.current = true;
            onDropElement(item, nodeRef.current.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [onDropElement, dropHandledRef]);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newContent = prompt('Editar contenido:', node.content);
        if (newContent !== null) {
            onUpdateElementContent(node.id, newContent);
        }
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDeleteElement(node.id);
    };

    const handleSelect = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectElement(node.id);
    };

    const Tag = node.tag;
    const isContainer = (node.children && node.children.length > 0) || canDropElement(String(node.tag), 'div');
    const isSelected = node.id === selectedElementId;

    let dynamicClasses = '';
    if (isSelected) {
        dynamicClasses = 'outline outline-2 outline-offset-2 outline-blue-500';
    } else if (isHovered && !isGlobalDragging) {
        dynamicClasses = 'shadow-lg shadow-blue-500/20 ring-1 ring-blue-600';
    }

    if (isOver) {
        dynamicClasses = canDrop ? 'outline-2 outline-dashed outline-blue-400' : 'outline-2 outline-dashed outline-red-400';
    }

    const opacity = isNodeDragging ? 0.4 : 1;
    const combinedRef = (el: HTMLElement | null) => {
        drag(el);
        drop(el);
    };


    const childrenToRender = [];

    if (isHovered && !isGlobalDragging) {
        childrenToRender.push(
            <div key="controls" className="absolute -top-3 left-0 flex items-center gap-1 z-10 pointer-events-auto">
                <div className="bg-blue-600 text-white text-xs font-mono px-1.5 py-0.5 rounded">
                    {node.tag}
                </div>
                <div className="flex items-center bg-slate-600 rounded-md p-0.5">
                    {CAN_EDIT_CONTENT_TAGS.includes(node.tag) && (
                        <button onClick={handleEditClick} className="p-1 text-slate-200 hover:text-white hover:bg-slate-500 rounded">
                            <PencilIcon />
                        </button>
                    )}
                    <button onClick={handleDeleteClick} className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-500 rounded">
                        <TrashIcon />
                    </button>
                </div>
            </div>
        );
    }

    if (node.content) {
        childrenToRender.push(node.content);
    }

    if (node.children && node.children.length > 0) {
        childrenToRender.push(
            <div className="pl-4 pt-2 space-y-2" key="children-container">
                {node.children.map(child => (
                    <RenderNode key={child.id} node={child} onDropElement={onDropElement} onDeleteElement={onDeleteElement} onUpdateElementContent={onUpdateElementContent} selectedElementId={selectedElementId} onSelectElement={onSelectElement} dropHandledRef={dropHandledRef} />
                ))}
            </div>
        );
    } else if (isContainer && !node.content) {
        childrenToRender.push(<div className="min-h-[20px]" key="placeholder" />);
    }

    return React.createElement(
        Tag,
        {
            ref: combinedRef,
            className: `${node.classes} ${dynamicClasses} relative transition-all duration-150`,
            'data-id': node.id,
            style: { opacity },
            onMouseEnter: (e: React.MouseEvent) => { e.stopPropagation(); setIsHovered(true); },
            onMouseLeave: (e: React.MouseEvent) => { e.stopPropagation(); setIsHovered(false); },
            onClick: handleSelect,
        },
        ...childrenToRender
    );
};
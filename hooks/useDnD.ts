import React from 'react';
import { useCallback } from 'react';
import { DragItem, ElementNode, AvailableComponent } from '../types';

export const useDragDrop = (setDomTree: React.Dispatch<React.SetStateAction<ElementNode[]>>) => {
    const handleDrop = useCallback((item: DragItem, parentId: string | null) => {
        if (!('id' in item)) {
            const component = item as AvailableComponent;
            const newElement: ElementNode = {
                id: `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                tag: component.tag,
                classes: component.defaultClasses,
                content: component.defaultContent,
                children: [],
            };

            if (parentId === null) {
                setDomTree(prevTree => [...prevTree, newElement]);
                return;
            }

            setDomTree(prevTree => {
                const add = (nodes: ElementNode[]): ElementNode[] => {
                    return nodes.map(node => {
                        if (node.id === parentId) {
                            return {
                                ...node,
                                children: [...(node.children || []), { ...newElement }]
                            };
                        }
                        if (node.children) {
                            return { ...node, children: add(node.children) };
                        }
                        return node;
                    });
                };
                return add(prevTree);
            });
            return;
        }

        // Existing element logic...
        // (mantener el resto del código de handleDrop aquí)
    }, [setDomTree]);

    return { handleDrop };
};
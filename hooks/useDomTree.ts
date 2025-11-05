import { useState, useCallback } from 'react';
import { ElementNode } from '../types';

export const useDomTree = () => {
    const [domTree, setDomTree] = useState<ElementNode[]>([]);

    const handleDeleteElement = useCallback((elementId: string) => {
        const remove = (nodes: ElementNode[]): ElementNode[] => {
            const filtered = nodes.filter(n => n.id !== elementId);
            if (filtered.length < nodes.length) {
                return filtered;
            }
            return nodes.map(n => ({ ...n, children: remove(n.children || []) }));
        };
        setDomTree(prev => remove(prev));
    }, []);

    const handleUpdateElementContent = useCallback((elementId: string, content: string) => {
        const update = (nodes: ElementNode[]): ElementNode[] => {
            return nodes.map(n => {
                if (n.id === elementId) {
                    return { ...n, content };
                }
                return { ...n, children: update(n.children || []) };
            });
        };
        setDomTree(prev => update(prev));
    }, []);

    const handleUpdateElementClasses = useCallback((elementId: string, classes: string) => {
        const update = (nodes: ElementNode[]): ElementNode[] => {
            return nodes.map(n => {
                if (n.id === elementId) {
                    return { ...n, classes };
                }
                return { ...n, children: update(n.children || []) };
            });
        };
        setDomTree(prev => update(prev));
    }, []);

    const handleClearAll = useCallback(() => {
        setDomTree([]);
    }, []);

    return {
        domTree,
        setDomTree,
        handleDeleteElement,
        handleUpdateElementContent,
        handleUpdateElementClasses,
        handleClearAll
    };
};
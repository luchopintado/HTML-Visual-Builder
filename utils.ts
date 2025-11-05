import { ElementNode } from './types';

export const findNode = (nodes: ElementNode[], nodeId: string): ElementNode | null => {
    for (const node of nodes) {
        if (node.id === nodeId) return node;
        const foundInChildren = findNode(node.children || [], nodeId);
        if (foundInChildren) return foundInChildren;
    }
    return null;
};
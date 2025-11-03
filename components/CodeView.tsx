import React, { useMemo } from 'react';
import type { ElementNode } from '../types';

const generateHtmlString = (nodes: ElementNode[], indentLevel = 0): string => {
  const indent = '  '.repeat(indentLevel);
  return nodes.map(node => {
    const classAttr = node.classes ? ` class="${node.classes}"` : '';
    // Fix: Explicitly convert node.tag to a string to avoid implicit conversion errors.
    const tagName = String(node.tag);
    const openingTag = `${indent}<${tagName}${classAttr}>`;
    
    if (node.children && node.children.length > 0) {
      const childrenHtml = generateHtmlString(node.children, indentLevel + 1);
      return `${openingTag}\n${childrenHtml}\n${indent}</${tagName}>`;
    } else {
      const content = node.content || '';
      return `${openingTag}${content}</${tagName}>`;
    }
  }).join('\n');
};

interface CodeViewProps {
  domTree: ElementNode[];
}

export const CodeView: React.FC<CodeViewProps> = ({ domTree }) => {
  const codeString = useMemo(() => generateHtmlString(domTree), [domTree]);

  return (
    <div className="p-4 h-full">
      {domTree.length > 0 ? (
        <pre className="bg-slate-800 text-cyan-300 p-4 rounded-lg overflow-auto h-full text-sm">
          <code>
            {codeString}
          </code>
        </pre>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-slate-400">El código generado aparecerá aquí.</p>
        </div>
      )}
    </div>
  );
};

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { ElementNode, AvailableComponent, DragItem } from './types';
import { AVAILABLE_COMPONENTS } from './constants';
import { GuiView } from './components/GuiView';
import { CodeView } from './components/CodeView';
import { ElementButton } from './components/ElementButton';
import { PropertiesPanel } from './components/PropertiesPanel';


type ActiveTab = 'gui' | 'code';

const findNode = (nodes: ElementNode[], nodeId: string): ElementNode | null => {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    const foundInChildren = findNode(node.children || [], nodeId);
    if (foundInChildren) return foundInChildren;
  }
  return null;
};

function App() {
  const [domTree, setDomTree] = useState<ElementNode[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('gui');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const dropHandledRef = useRef(false);

  const handleDeleteElement = useCallback((elementId: string) => {
    if (selectedElementId === elementId) {
        setSelectedElementId(null);
    }
    const remove = (nodes: ElementNode[]): ElementNode[] => {
      const filtered = nodes.filter(n => n.id !== elementId);
      if (filtered.length < nodes.length) {
        return filtered;
      }
      return nodes.map(n => ({ ...n, children: remove(n.children || []) }));
    };
    setDomTree(prev => remove(prev));
  }, [selectedElementId]);

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


  const handleDrop = useCallback((item: DragItem, parentId: string | null) => {
    // Case 1: Dropping a NEW element from the panel
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
      } else {
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
      }
      return;
    }

    // Case 2: Dropping an EXISTING element (moving it)
    const draggedNode = item as ElementNode;

    if (draggedNode.id === parentId) return;

    setDomTree(currentTree => {
        let foundNode: ElementNode | null = null;

        const removeNode = (nodes: ElementNode[], nodeId: string): ElementNode[] => {
          const remainingNodes = [];
          for (const node of nodes) {
            if (node.id === nodeId) {
              foundNode = node;
            } else {
              const newNode = { ...node };
              if (node.children) {
                newNode.children = removeNode(node.children, nodeId);
              }
              remainingNodes.push(newNode);
            }
          }
          return remainingNodes;
        };

        const treeWithoutNode = removeNode(currentTree, draggedNode.id);

        if (!foundNode) return currentTree;

        const addNode = (nodes: ElementNode[]): ElementNode[] => {
          return nodes.map(node => {
            if (node.id === parentId) {
              return { ...node, children: [...(node.children || []), foundNode!] };
            }
            if (node.children) {
              return { ...node, children: addNode(node.children) };
            }
            return node;
          });
        };

        if (parentId === null) {
            return [...treeWithoutNode, foundNode];
        } else {
            return addNode(treeWithoutNode);
        }
    });

  }, []);

  const handleClearAll = () => {
    setDomTree([]);
    setSelectedElementId(null);
  };

  const selectedElement = useMemo(() => {
    if (!selectedElementId) return null;
    return findNode(domTree, selectedElementId);
  }, [selectedElementId, domTree]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
        {/* Elements Panel */}
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
            onClick={handleClearAll}
            className="mt-4 w-full text-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
            Limpiar Todo
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <header className="bg-slate-800/50 border-b border-slate-700">
            <div className="flex items-center p-2">
              <button
                onClick={() => setActiveTab('gui')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'gui' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'
                }`}
              >
                GUI
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'code' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'
                }`}
              >
                Code
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-slate-900">
            {activeTab === 'gui' ? <GuiView domTree={domTree} onDropElement={handleDrop} onDeleteElement={handleDeleteElement} onUpdateElementContent={handleUpdateElementContent} selectedElementId={selectedElementId} onSelectElement={setSelectedElementId} dropHandledRef={dropHandledRef} /> : <CodeView domTree={domTree} />}
          </div>
        </main>

        {/* Properties Panel */}
        <aside className={`w-80 bg-slate-800 border-l border-slate-700 transition-transform duration-300 ease-in-out ${selectedElement ? 'translate-x-0' : 'translate-x-full'}`}>
          <PropertiesPanel
            key={selectedElement?.id} // Force re-mount on selection change
            element={selectedElement}
            onUpdateClasses={handleUpdateElementClasses}
            onClose={() => setSelectedElementId(null)}
          />
        </aside>
      </div>
    </DndProvider>
  );
}

export default App;
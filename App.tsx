import React, { useState, useMemo, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GuiView } from './components/GuiView';
import { CodeView } from './components/CodeView';
import { PropertiesPanel } from './components/PropertiesPanel';
import { findNode } from './utils';
import { useDomTree } from './hooks/useDomTree';
import { useDragDrop } from './hooks/useDnD';
import { ElementsPanel } from './components/ElementsPanel';
import { Header } from './components/Header';

type ActiveTab = 'gui' | 'code';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('gui');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const dropHandledRef = useRef(false);

  const {
    domTree,
    setDomTree,
    handleDeleteElement,
    handleUpdateElementContent,
    handleUpdateElementClasses,
    handleClearAll
  } = useDomTree();

  const { handleDrop } = useDragDrop(setDomTree);

  const selectedElement = useMemo(() => {
    if (!selectedElementId) return null;
    return findNode(domTree, selectedElementId);
  }, [selectedElementId, domTree]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
        {/* Elements Panel */}
        <ElementsPanel onClearAll={handleClearAll} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 overflow-auto bg-slate-900">
            {activeTab === 'gui'
              ? <GuiView domTree={domTree} onDropElement={handleDrop} onDeleteElement={handleDeleteElement} onUpdateElementContent={handleUpdateElementContent} selectedElementId={selectedElementId} onSelectElement={setSelectedElementId} dropHandledRef={dropHandledRef} />
              : <CodeView domTree={domTree} />}
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
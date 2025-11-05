import React from 'react';

interface HeaderProps {
    activeTab: 'gui' | 'code';
    setActiveTab: (tab: 'gui' | 'code') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    return (
        <header className="bg-slate-800/50 border-b border-slate-700">
            <div className="flex items-center p-2">
                <button
                    onClick={() => setActiveTab('gui')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'gui' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'
                        }`}
                >
                    GUI
                </button>
                <button
                    onClick={() => setActiveTab('code')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'code' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'
                        }`}
                >
                    Code
                </button>
            </div>
        </header>
    );
};

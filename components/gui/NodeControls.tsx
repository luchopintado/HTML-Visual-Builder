import React from "react";
import { PencilIcon, TrashIcon } from "../Icons";

interface NodeControlsProps {
    tag: keyof React.JSX.IntrinsicElements;
    onEdit: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
    canEdit: boolean;
}

export const NodeControls: React.FC<NodeControlsProps> = ({
    tag,
    onEdit,
    onDelete,
    canEdit,
}) => (
    <div className="absolute -top-3 left-0 flex items-center gap-1 z-10 pointer-events-auto">
        <div className="bg-blue-600 text-white text-xs font-mono px-1.5 py-0.5 rounded">
            {tag}
        </div>
        <div className="flex items-center bg-slate-600 rounded-md p-0.5">
            {canEdit && (
                <button
                    onClick={onEdit}
                    className="p-1 text-slate-200 hover:text-white hover:bg-slate-500 rounded"
                >
                    <PencilIcon />
                </button>
            )}
            <button
                onClick={onDelete}
                className="p-1 text-red-400 hover:text-red-300 hover:bg-slate-500 rounded"
            >
                <TrashIcon />
            </button>
        </div>
    </div>
);

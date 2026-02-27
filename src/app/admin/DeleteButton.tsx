"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton() {
    return (
        <button
            type="submit"
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            title="Excluir"
            onClick={(evt) => {
                if (!window.confirm("Tem certeza absoluta que deseja excluir esse evento? As inscrições atreladas também serão perdidas.")) {
                    evt.preventDefault();
                }
            }}
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}

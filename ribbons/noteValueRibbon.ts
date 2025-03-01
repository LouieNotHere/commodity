// ribbons/noteValueRibbon.ts
// This is where the source code of the "Calculate Note Value" is located.

import { Notice } from "obsidian";
import CommodityPlugin from "../main";

export class NoteValueRibbon {
    constructor(plugin: CommodityPlugin) {
        plugin.addRibbonIcon("file-text", "Commodity: Calculate Active Note Value", () => {
            const activeFile = plugin.app.workspace.getActiveFile();
            if (!activeFile) {
                new Notice("Commodity: Oh! It seems like there's no active note currently being edited.");
                return;
            }

            const existingLeaf = plugin.app.workspace.getLeavesOfType("commodity-note-view")[0];

            if (existingLeaf) {
                plugin.app.workspace.revealLeaf(existingLeaf);
            } else {
                const newLeaf = plugin.app.workspace.getRightLeaf(false);
                if (newLeaf) {
                    newLeaf.setViewState({
                        type: "commodity-note-view",
                        active: true,
                        state: { filePath: activeFile.path },
                    });
                    plugin.app.workspace.revealLeaf(newLeaf);
                } else {
                    new Notice("Commodity: Sidebar view creation unsuccessful, process aborted.");
                }
            }
        });
    }
} 

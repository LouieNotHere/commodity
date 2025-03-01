// main.ts file (used as the main file for Commodity)
// For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
// I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
// I deeply apologize for that, I am just trying to add some new things to the source code.

import { Plugin, Notice } from "obsidian";
import { VaultValueRibbon } from "./ribbons/vaultValueRibbon";
import { NoteValueRibbon } from "./ribbons/noteValueRibbon";
import { NoteValueView } from "./views/noteValueView";

export default class CommodityPlugin extends Plugin {
    public vaultStats: VaultStats | null = null;

    async onload() {
        console.log("Commodity is loading...");

        this.vaultStats = await this.precomputeVaultStats();

        // Register Ribbon Buttons
        new VaultValueRibbon(this);
        new NoteValueRibbon(this);

        this.registerView("commodity-note-view", (leaf) => new NoteValueView(leaf, this.app));

        setTimeout(async () => {
            this.vaultStats = await this.precomputeVaultStats();
        }, 100);

        console.log("Commodity has successfully loaded.");
    }

    async precomputeVaultStats(): Promise<VaultStats> {
        new Notice("Precomputing vault statistics...");

        const startTime = performance.now();
        const files = this.app.vault.getFiles();
        let totalCharacters = 0;
        let totalWords = 0;
        let totalSentences = 0;

        for (const file of files) {
            if (file.extension === "md") {
                const content = await this.app.vault.read(file);
                totalCharacters += content.length;
                totalWords += content.split(/\s+/).filter(Boolean).length;
                totalSentences += content.split(/[.!?]+/).filter(Boolean).length;
            }
        }

        const rootStats = await this.app.vault.adapter.stat(".");
        const creationTime = rootStats?.ctime ?? 0;
        const daysSinceCreation = (Date.now() - creationTime) / (1000 * 60 * 60 * 24);

        const vaultStats: VaultStats = {
            totalCharacters,
            totalWords,
            totalSentences,
            totalFiles: files.length,
            daysSinceCreation
        };

        console.log(`Vault stats computed in ${(performance.now() - startTime).toFixed(2)} ms`);
        new Notice("Successfully precomputed the vault statistics!");

        return vaultStats;
    }
}

export interface VaultStats {
    totalCharacters: number;
    totalWords: number;
    totalFiles: number;
    totalSentences: number;
    daysSinceCreation: number;
} 

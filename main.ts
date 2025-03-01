// main.ts file (used as the main file for Commodity)
// For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
// I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
// I deeply apologize for that, I am just trying to add some new things to the source code.

import { Modal, App } from "obsidian";
import { VaultStats } from "./types/vaultStats.js"; // Strict check just in case the compilation fails

export class VaultValueModal extends Modal {
    stats: VaultStats;

    constructor(app: App, stats: VaultStats) {
        super(app);
        this.stats = stats;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass("vault-value-modal");

        this.displayVaultValue(contentEl);
    }

    displayVaultValue(contentEl: HTMLElement) {
        const startTime = performance.now();

        let vaultValue = (this.stats.totalCharacters / 122000) * (1 + (this.stats.totalWords / 130000)) +
            (this.stats.totalFiles / 200) +
            (this.stats.totalSentences / 21000) +
            (this.stats.daysSinceCreation / 60);

        if (isNaN(vaultValue) || !isFinite(vaultValue)) {
            vaultValue = 0;
        }

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        setTimeout(() => {
            contentEl.createEl("h3", { text: "Calculated Vault Value:", cls: "vault-header" });
            contentEl.createEl("h1", { text: `$${vaultValue.toFixed(2)}`, cls: "vault-value" });
            contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms`, cls: "vault-time" });
        }, 10);
    }
} 

// main.ts file (used as the main file for Commodity)
// For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
// I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
// I deeply apologize for that, I am just trying to add some new things to the source code.

// For now, here is the optimized code, with some logic fixes made by me.

import { Plugin, Notice, WorkspaceLeaf, TFile, Modal, ItemView } from "obsidian";

export default class CommodityPlugin extends Plugin {
	private stats: VaultStats | null = null;
    private vaultStats: VaultStats | null = null;

    async onload() {
        console.log("Commodity is loading...");

        this.stats = await this.precomputeVaultStats();

        this.addRibbonIcon("dollar-sign", "Commodity: Calculate Vault Value", () => {
            if (this.vaultStats) {
                new VaultValueModal(this.app, this.vaultStats).open();
            } else {
                new Notice("Commodity: The vault statistics are not ready yet. Please wait for a short time...");
            }
        });

        this.addRibbonIcon("file-text", "Commodity: Calculate Active Note Value", () => {
            this.openNoteStatsView();
        });

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
        console.log("Total Files:", files.length);

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

        console.log("Total Characters:", totalCharacters);
        console.log("Total Words:", totalWords);
        console.log("Total Sentences:", totalSentences);

        const rootStats = await this.app.vault.adapter.stat("."); 
        const creationTime = rootStats?.ctime ?? 0;
        const currentTime = Date.now();
        const daysSinceCreation = (currentTime - creationTime) / (1000 * 60 * 60 * 24); 

        console.log("Days Since Vault Creation:", daysSinceCreation);

        const vaultStats: VaultStats = {
            totalCharacters,
            totalWords,
            totalSentences,
            totalFiles: files.length,
            daysSinceCreation
        };

        const endTime = performance.now();
        console.log(`Vault stats computed in ${(endTime - startTime).toFixed(2)} ms`);

        new Notice("Successfully precomputed the vault statistics!");
        return vaultStats;
    }

    openNoteStatsView() {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice("Commodity: No active note found.");
            return;
        }

        const existingLeaf = this.app.workspace.getLeavesOfType("commodity-note-view")[0];

        if (existingLeaf) {
            this.app.workspace.revealLeaf(existingLeaf);
        } else {
            const newLeaf = this.app.workspace.getRightLeaf(false);
            if (newLeaf) {
                newLeaf.setViewState({
                    type: "commodity-note-view",
                    active: true,
                    state: { filePath: activeFile.path },
                });
                this.app.workspace.revealLeaf(newLeaf);
            } else {
                new Notice("Commodity: Could not create a sidebar view.");
            }
        }
    } 
}

interface VaultStats {
    totalCharacters: number;
    totalWords: number;
    totalFiles: number;
    totalSentences: number;
    daysSinceCreation: number;
}

// Here is the ValueVaultModal class, where the function from the "Commodity: Calculate Vault Value" ribbon is located.
// Some things might change depending on the demand.
class VaultValueModal extends Modal {
    stats: VaultStats;

    constructor(app: any, stats: VaultStats) {
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

        console.log("Vault Stats:", this.stats);
        console.log("Calculated Vault Value:", vaultValue);
        console.log("Time Taken:", timeTaken);

        setTimeout(() => {
            contentEl.createEl("h3", { text: "Calculated Vault Value:", cls: "vault-header" });
            contentEl.createEl("h1", { text: `$${vaultValue.toFixed(2)}`, cls: "vault-value" });
            contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms`, cls: "vault-time" });
        }, 10);
    }
}

// Here is the NoteValueView class, where the source code of the "Commodity: Calculate Active Note Value" ribbon is located.
// I will try to add some more context if possible.
class NoteValueView extends ItemView {
    filePath: string;

    constructor(leaf: WorkspaceLeaf, app: any) {
        super(leaf);
        this.filePath = "";
    }

    getViewType(): string {
        return "commodity-note-view";
    }

    getDisplayText(): string {
        return "Active Note Value";
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.addClass("vault-value-modal");

		const startTime = performance.now();

        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            contentEl.createEl("p", { text: "Whoops! It seems like there is no active note at the moment." });
            return;
        }

        const vaultFiles = this.app.vault.getFiles();
        const totalFiles = vaultFiles.length;

        const rootStats = await this.app.vault.adapter.stat(".");
        const creationTime = rootStats?.ctime ?? 0;
        const currentTime = Date.now();
        const daysSinceCreation = (currentTime - creationTime) / (1000 * 60 * 60 * 24);

        const value = (totalCharacters / 122000) * (1 + (totalWords / 130000)) + (totalFiles / 200) + (totalSentences / 21000) + (daysSinceCreation / 60); 

        contentEl.createEl("h3", { text: "Calculated Active Note Value:", cls: "vault-header" });
		
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        contentEl.createEl("h1", { text: `$${value.toFixed(2)}`, cls: "vault-value" });
        contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms`, cls: "vault-time" });
    }
}

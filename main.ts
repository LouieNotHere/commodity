// main.ts file (used as the main file for Commodity)
// For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
// I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
// I deeply apologize for that, I am just trying to add some new things to the source code.

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

        const stat = await this.app.vault.adapter.stat(".");

		if (stat?.ctime !== undefined && stat?.ctime !== null) {
            const daysSinceCreation = Math.floor((Date.now() - stat.ctime) / (1000 * 60 * 60 * 24));
		}

		const creationTime = app.vault.getRoot().stat?.ctime;
        const currentTime = Date.now();
        const daysSinceCreation = creationTime ? (currentTime - creationTime) / (1000 * 60 * 60 * 24) : 0;

        const e = daysSinceCreation / 60;

        const value = (totalCharacters / 122000) * (1 + (totalWords / 130000)) + (1 / 200) + (totalSentences / 21000) + e;
		
        // console.log("Days Since Vault Creation:", daysSinceCreation);

        return {
            totalCharacters,
            totalWords,
            totalSentences,
            totalFiles: files.length,
            daysSinceCreation: e
        };

        const endTime = performance.now();

		new Notice("Successfully precomputed the vault statistics!");
        console.log(`Vault stats computed in ${(endTime - startTime).toFixed(2)} ms`);
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

// This piece of code is typed to make the window when "Commodity: Calculate Vault Value" is executed from the ribbon.
// I am trying to optimize the code, fix some issues as soon as possible.
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

// This piece of code is typed to make an item to the right sidebar.
// Changes could happen if an addition is demanded.
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

        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            contentEl.createEl("p", { text: "Whoops! It seems like there is no active note at the moment." });
            return;
        }

        const content = await this.app.vault.cachedRead(activeFile);
        const totalCharacters = content.length;
        const totalWords = content.split(/\s+/).length;
        const totalSentences = content.split(/[.!?]+/).length;

        contentEl.createEl("h3", { text: "Calculated Active Note Value:", cls: "vault-header" });

        const startTime = performance.now();

        const value = (totalCharacters / 122000) * (1 + (totalWords / 130000)) +
            (1 / 200) +
            (totalSentences / 21000);

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        contentEl.createEl("h1", { text: `$${value.toFixed(2)}`, cls: "vault-value" });
        contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms`, cls: "vault-time" });
    }
}

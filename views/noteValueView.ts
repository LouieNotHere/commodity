import { ItemView, WorkspaceLeaf, Notice } from "obsidian";

export class NoteValueView extends ItemView {
    filePath: string;

    constructor(leaf: WorkspaceLeaf) {
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

        const vaultStats = await this.getVaultStats();
        const value = (totalCharacters / 63000) * (1 + (totalWords / 21000)) + (totalSentences / 9500);

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        contentEl.createEl("h1", { text: `$${value.toFixed(2)}`, cls: "vault-value" });
        contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms`, cls: "vault-time" });
        contentEl.createEl("p", { text: "Please note that the calculation is separated from the vault value!", cls: "vault-time" });
    }

    async getVaultStats(): Promise<{ totalFiles: number; daysSinceCreation: number }> {
        const files = this.app.vault.getFiles();
        const rootStats = await this.app.vault.adapter.stat(".");
        const creationTime = rootStats?.ctime ?? 0;
        const daysSinceCreation = (Date.now() - creationTime) / (1000 * 60 * 60 * 24);

        return {
            totalFiles: files.length,
            daysSinceCreation
        };
    }
} 

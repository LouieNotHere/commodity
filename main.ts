import { App, Plugin, Notice, Vault, WorkspaceLeaf, TFile, Modal } from "obsidian";

export default class CommodityPlugin extends Plugin {
    vaultStats: VaultStats | null = null;

    async onload() {
        console.log("Commodity is loading...");

        this.addRibbonIcon("dollar-sign", "Commodity: Calculate Vault Value", () => {
            if (this.vaultStats) {
                new VaultValueModal(this.app, this.vaultStats).open();
            } else {
                new Notice("Commodity: The vault statistics are not ready yet. Please wait for a short time...");
            }
        });

        this.addRibbonIcon("file-text", "Commodity: Check Current Note Value", () => {
            const activeFile = this.app.workspace.getActiveFile();
            if (!activeFile) {
                new Notice("Commodity: The active note is not found.");
                return;
            }

            const leaf = this.app.workspace.getLeaf(true);
            leaf.setViewState({
                type: "commodity-note-view",
                active: true,
                state: { filePath: activeFile.path },
            });
        });

        setTimeout(async () => {
            this.vaultStats = await this.precomputeVaultStats();
        }, 100);

        this.registerView("commodity-note-view", (leaf) => new NoteValueView(leaf, this.app));

        console.log("Commodity has successfully loaded.");
    }

    async precomputeVaultStats(): Promise<VaultStats> {
        new Notice("Precomputing the vault statistics...");

        const allFiles = this.app.vault.getFiles();
        let totalCharacters = 0,
            totalWords = 0,
            totalFiles = allFiles.length,
            totalSentences = 0;

        let oldestTimestamp = Date.now();

        for (const file of allFiles) {
            const content = await this.app.vault.cachedRead(file);
            totalCharacters += content.length;
            totalWords += content.split(/\s+/).length;
            totalSentences += content.split(/[.!?]+/).length;

            const stat = await this.app.vault.adapter.stat(file.path);
            if (stat.ctime < oldestTimestamp) {
                oldestTimestamp = stat.ctime;
            }
        }

        const daysSinceCreation = (Date.now() - oldestTimestamp) / (1000 * 60 * 60 * 24);

        // console.log(`Vault stats computed. Days since creation: ${daysSinceCreation.toFixed(2)} days`);

        return { totalCharacters, totalWords, totalFiles, totalSentences, daysSinceCreation };
    }
}

class VaultValueModal extends Modal {
    stats: VaultStats;

    constructor(app: App, stats: VaultStats) {
        super(app);
        this.stats = stats;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        contentEl.style.textAlign = "center";
        contentEl.style.fontFamily = "var(--default-font)";

        const startTime = performance.now();
        const vaultValue = calculateVaultValue(this.stats);
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        contentEl.createEl("h4", { text: "Calculated Value:" }).style.marginBottom = "10px";
        contentEl.createEl("h1", { text: `$${vaultValue.toFixed(2)}` });

        const timeText = contentEl.createEl("p", { text: `This took ${timeTaken} ms to calculate!` });
        timeText.style.fontSize = "0.9rem";
        timeText.style.color = "var(--text-muted)";
        timeText.style.marginTop = "5px";

        // new Notice(`Commodity: Vault Value = $${vaultValue.toFixed(2)} (calculated in ${timeTaken} ms)`);
		new Notive("The values have been calculated!");
    }
}

class NoteValueView extends ItemView {
    app: App;
    filePath: string;

    constructor(leaf: WorkspaceLeaf, app: App) {
        super(leaf);
        this.app = app;
        this.filePath = "";
    }

    getViewType(): string {
        return "commodity-note-view";
    }

    getDisplayText(): string {
        return "Active Note Value";
    }

    async setState(state: any, result: any) {
        this.filePath = state.filePath;
        this.renderView();
    }

    async renderView() {
        this.contentEl.empty();

        const file = this.app.vault.getAbstractFileByPath(this.filePath);
        if (!(file instanceof TFile)) {
            this.contentEl.createEl("p", { text: "No valid file found." });
            return;
        }

        const content = await this.app.vault.read(file);
        const stats = calculateNoteStats(content);

        this.contentEl.style.textAlign = "center";
        this.contentEl.style.fontFamily = "var(--default-font)";

        const startTime = performance.now();
        const noteValue = calculateVaultValue(stats);
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        this.contentEl.createEl("h4", { text: "Note Value" }).style.marginBottom = "10px";
        this.contentEl.createEl("h1", { text: `$${noteValue.toFixed(2)}` });

        const timeText = this.contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms` });
        timeText.style.fontSize = "0.9rem";
        timeText.style.color = "var(--text-muted)";
        timeText.style.marginTop = "5px";
    }
}

function calculateVaultValue(stats: VaultStats): number {
    const { totalCharacters, totalWords, totalFiles, totalSentences, daysSinceCreation } = stats;
    const e = daysSinceCreation / 60;

    return (totalCharacters / 122000) * (1 + (totalWords / 130000)) + (totalFiles / 200) + (totalSentences / 21000) + e;
}

function calculateNoteStats(content: string): VaultStats {
    const totalCharacters = content.length;
    const totalWords = content.split(/\s+/).length;
    const totalFiles = 1;
    const totalSentences = content.split(/[.!?]+/).length;
    const daysSinceCreation = 0; // Not relevant for a single note

    return { totalCharacters, totalWords, totalFiles, totalSentences, daysSinceCreation };
}

interface VaultStats {
    totalCharacters: number;
    totalWords: number;
    totalFiles: number;
    totalSentences: number;
    daysSinceCreation: number;
}

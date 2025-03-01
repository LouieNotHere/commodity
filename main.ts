import { App, Plugin, Modal, Vault, TFile, Notice } from "obsidian";

export default class CommodityPlugin extends Plugin {
    async onload() {
        console.log("Commodity is loading...");

        requestAnimationFrame(() => {
            this.addRibbonIcon("dollar-sign", "Commodity: Calculate Vault Value", () => {
                new VaultValueModal(this.app, this.vaultStats).open();
            });
        });

        setTimeout(async () => {
            this.vaultStats = await this.precomputeVaultStats();
        }, 100);

        console.log("Commodity has successfully loaded.");
    }

    async precomputeVaultStats() {
      let preComp:string = "Precomputing vault statistics..."
      
        console.log(preComp);
        new Notice(preComp);

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

        console.log("The vault statistics has been computed.");

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

        contentEl.createEl("h4", { text: "Computed Vault Value:" }).style.marginBottom = "10px";
        contentEl.createEl("h1", { text: `$${vaultValue.toFixed(2)}` });

        const timeText = contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms` });
        timeText.style.fontSize = "0.9rem";
        timeText.style.color = "var(--text-muted)";
        timeText.style.marginTop = "5px";

        // new Notice(`Commodity: Vault Value = $${vaultValue.toFixed(2)} (calculated in ${timeTaken} ms)`);
        new Notice("The value has been calculated!");
    }
}

function calculateVaultValue(stats: VaultStats): number {
    const { totalCharacters, totalWords, totalFiles, totalSentences, daysSinceCreation } = stats;

    return (totalCharacters / 122000) * (1 + (totalWords / 130000)) + (totalFiles / 200) + (totalSentences / 21000) + (daysSinceCreation / 60);
}

interface VaultStats {
    totalCharacters: number;
    totalWords: number;
    totalFiles: number;
    totalSentences: number;
    daysSinceCreation: number;
}

import { Modal } from "obsidian";
import { VaultStats } from "../types/vaultStats";

export class VaultValueModal extends Modal {
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

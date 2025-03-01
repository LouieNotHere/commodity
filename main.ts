/*

  main.ts file (used as the main file for Commodity (Legacy))
  For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
  I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
  I deeply apologize for that, I am just trying to add some new things to the source code.

  This is only for the legacy version. It can differ from the non-legacy version.

*/

import { App, Plugin, Modal, Vault, TFile } from "obsidian";

export default class CommodityPlugin extends Plugin {
	async onload() {
		console.log("commodityPlugin loaded");

		this.addRibbonIcon("lucide-calculator", "Commodity: Calculate Vault Value", async () => {
			const modal = new VaultValueModal(this.app);
			modal.open();

			const vaultStats = await calculateVaultStats(this.app.vault);
			modal.updateVaultValue(vaultStats);
		});
	}

	onunload() {
		console.log("commodityPlugin unloaded");
	}
}

class VaultValueModal extends Modal {
	private stats: VaultStats | null = null;

	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.style.textAlign = "center";
		contentEl.style.fontFamily = "var(--default-font)";

		contentEl.createEl("h4", { text: "Calculated Vault Value", cls: "window-header" });
		contentEl.createEl("p", { text: "Calculating...", cls: "window-loading" });
	}

	updateVaultValue(stats: VaultStats) {
		this.stats = stats;
		const { contentEl } = this;
		contentEl.empty();

		contentEl.createEl("h4", { text: "Calculated Vault Value", cls: "window-header" });

		const startTime = performance.now();
		const vaultValue = calculateVaultValue(stats);
		const endTime = performance.now();
		const timeTaken = (endTime - startTime).toFixed(2);

		contentEl.createEl("h1", { text: `$${vaultValue.toFixed(2)}`, cls: "window-value" });
		contentEl.createEl("p", { text: `Calculated in ${timeTaken} ms`, cls: "window-time" });
	}

	onClose() {
		this.contentEl.empty();
	}
}

interface VaultStats {
	totalCharacters: number;
	totalWords: number;
	totalFiles: number;
	totalSentences: number;
}

async function calculateVaultStats(vault: Vault): Promise<VaultStats> {
	let totalCharacters = 0;
	let totalWords = 0;
	let totalFiles = 0;
	let totalSentences = 0;

	const files = vault.getMarkdownFiles();
	totalFiles = files.length;

	for (const file of files) {
		const content = await vault.read(file);
		totalCharacters += content.length;
		totalWords += content.split(/\s+/).length;
		totalSentences += (content.match(/[.!?]+/g) || []).length;
	}

	return { totalCharacters, totalWords, totalFiles, totalSentences };
}

function calculateVaultValue(stats: VaultStats): number {
	const { totalCharacters: a, totalWords: b, totalFiles: c, totalSentences: d } = stats;
	return (a / 122000) * (1 + (b / 130000)) + (c / 200) + (d / 21000);
} 

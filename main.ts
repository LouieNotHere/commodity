/*

  main.ts file (used as the main file for Commodity (Legacy))
  For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
  I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
  I deeply apologize for that, I am just trying to add some new things to the source code.

  This is only for the legacy version. It can differ from the non-legacy version.

*/

import { App, Plugin, Modal, Vault, TFile } from "obsidian";

export default class commodityPlugin extends Plugin {
	async onload() {
		console.log("commodityPlugin loaded");

		this.addRibbonIcon("lucide-calculator", "Commodity: Calculate Vault Value", async () => {
			const vaultStats = await calculateVaultStats(this.app.vault);
			new VaultValueModal(this.app, vaultStats).open();
		});
	}

	onunload() {
		console.log("commodityPlugin unloaded");
	}
}

class VaultValueModal extends Modal {
	private stats: VaultStats;

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

    const titleHeader = contentEl.createEl("h4", { text: "Calculated Vault Value", cls: "window-header" });

    const vaultValue = calculateVaultValue(this.stats);

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        const valueHeader = contentEl.createEl("h1", { text: `$${vaultValue.toFixed(2)}`, cls: "window-value" });
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

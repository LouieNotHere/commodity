import { App, Plugin, Modal, Vault, TFile } from "obsidian";

export default class VaultValuePlugin extends Plugin {
	async onload() {
		console.log("VaultValuePlugin loaded");

		this.addRibbonIcon("lucide-calculator", "Calculate Vault Value", async () => {
			const vaultStats = await calculateVaultStats(this.app.vault);
			new VaultValueModal(this.app, vaultStats).open();
		});
	}

	onunload() {
		console.log("VaultValuePlugin unloaded");
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

		const smallHeader = contentEl.createEl("h4", { text: "Vault Value" });

		const vaultValue = calculateVaultValue(this.stats);
		const bigHeader = contentEl.createEl("h1", { text: vaultValue.toFixed(2) });
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

// Function to compute the Vault Value using the given formula
function calculateVaultValue(stats: VaultStats): number {
	const { totalCharacters: a, totalWords: b, totalFiles: c, totalSentences: d } = stats;
	return (a / 122000) * (1 + (b / 130000)) + (c / 200) + (d / 21000);
}

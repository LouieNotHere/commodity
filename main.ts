/*

  main.ts file (used as the main file for Commodity (Legacy))
  For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
  I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
  I deeply apologize for that, I am just trying to add some new things to the source code.

  This is only for the legacy version. It can differ from the non-legacy version.

*/

import { CommoditySettingsTab, DEFAULT_SETTINGS, CURRENCY_MULTIPLIERS, CommoditySettings } from "./options";
import { App, Plugin, Modal, Vault, TFile, Notice } from "obsidian";

export default class CommodityPlugin extends Plugin {
    settings: CommoditySettings;

    async onload() {
        console.log("Commodity Plugin (Legacy) Loaded");

        await this.loadSettings();
        this.addSettingTab(new CommoditySettingsTab(this.app, this));

        console.log(`Current currency: ${this.settings.currency}`);

        this.addRibbonIcon("lucide-calculator", "Commodity: Calculate Vault Value", async () => {
            const vaultStats = await calculateVaultStats(this.app.vault);
            new VaultValueModal(this.app, vaultStats, this.settings.currency).open();
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class VaultValueModal extends Modal {
    private stats: VaultStats;
    private currency: string;

    constructor(app: App, stats: VaultStats, currency: string) {
        super(app);
        this.stats = stats;
        this.currency = currency;
    }

    onOpen() {
        new Notice("Commodity (Legacy): Calculating the vault value...");
        const { contentEl } = this;
        contentEl.empty();
        contentEl.style.textAlign = "center";
        contentEl.style.fontFamily = "var(--default-font)";

        const startTime = performance.now();

        const titleHeader = contentEl.createEl("h4", { text: "Calculated Vault Value", cls: "window-header" });

        const vaultValue = calculateVaultValue(this.stats, this.currency);
        const currencySymbol = getCurrencySymbol(this.currency);

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

		const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
		const fullValue = vaultValue.toFixed(25);

		var valueText:string = `${currencySymbol}${fullValue.toFixed(2)}`;

        if (vaultValue >= 1000) {
			valueText = `${currencySymbol}${formatter.format(Math.trunc(fullValue))}`;
		}

        contentEl.createEl("h1", { text: valueText, cls: "window-value" });
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

function calculateVaultValue(stats: VaultStats, currency: string): number {
    const { totalCharacters: a, totalWords: b, totalFiles: c, totalSentences: d } = stats;
    let value = (a / 122000) * (1 + (b / 130000)) + (c / 200) + (d / 21000);

    return value * (CURRENCY_MULTIPLIERS[currency] || 1);
}

function getCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
        "USD": "$",
        "JPY": "¥",
        "PHP": "₱",
        "IDR": "RP ",
        "EUR": "€",
		"GBP": "£",
		"KRW": "₩"
    };
    return symbols[currency] || "$";
}

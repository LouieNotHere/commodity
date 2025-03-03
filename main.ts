/*

  main.ts file (used as the main file for Commodity )
  For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
  I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
  I deeply apologize for that, I am just trying to add some new things to the source code.

*/

import { CommoditySettingsTab, DEFAULT_SETTINGS, CURRENCY_MULTIPLIERS, CommoditySettings } from "./options";
import { getLocalizedText } from "./localization";
import { App, Plugin, Modal, Vault, WorkspaceLeaf, Notice, TFile } from "obsidian";
import { abbreviateNumber } from "./abbrNum";
import { CommoditySidebarView } from "./views/SidebarView";

export default class CommodityPlugin extends Plugin {
  settings: CommoditySettings;
  language: string;

  async onload() {
	  this.registerView(
          VIEW_TYPE_COMMODITY,
		  (leaf) => new CommoditySidebarView(leaf, this)
	  );
	  
      console.log("Commodity Plugin Loaded");

  await this.loadSettings();
  this.language = this.settings.language || "en";
  this.addSettingTab(new CommoditySettingsTab(this.app, this));

  console.log(`Current currency: ${this.settings.currency}`);
  console.log(`Selected Language: ${this.language}`);

  this.addRibbonIcon(
    "lucide-calculator",
    getLocalizedText("ribbonTooltip", this.language),
    async () => {
      const vaultStats = await calculateVaultStats(this.app.vault);
      const vaultValue = await calculateVaultValue(vaultStats, this.settings.currency, this.app.vault);
      new VaultValueModal(this.app, vaultValue, this.settings.currency, this.language).open();
    }
  );

  this.addRibbonIcon(
    "lucide-dollar-sign",
	getLocalizedText("sidebarRibbonTitle", this.language),
    async () => {
	  await this.activateView();
	});
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf = workspace.getLeavesOfType(VIEW_TYPE_COMMODITY)[0];

    if (!leaf) {
        leaf = workspace.getRightLeaf(false);
        await leaf.setViewState({
            type: VIEW_TYPE_COMMODITY,
            active: true,
        });
    }

    workspace.revealLeaf(leaf);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class VaultValueModal extends Modal {
  private vaultValue: number;
  private currency: string;
  private language: string;

  constructor(app: App, vaultValue: number, currency: string, language: string) {
    super(app);
    this.vaultValue = vaultValue;
    this.currency = currency;
    this.language = language;
  }

  onOpen() {
    new Notice(getLocalizedText("calculatingNotice", this.language));

    const { contentEl } = this;
    contentEl.empty();
    contentEl.style.textAlign = "center";
    contentEl.style.fontFamily = "var(--default-font)";

    const startTime = performance.now();

    contentEl.createEl("h4", {
      text: getLocalizedText("modalTitle", this.language),
      cls: "window-header",
    });

    const currencySymbol = getCurrencySymbol(this.currency);
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(2);

    const formatter = new Intl.NumberFormat(this.language, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const fullValue = Number(this.vaultValue.toFixed(25));
    const truncatedValue = Math.trunc(fullValue);
    var formattedValue: string = formatter.format(truncatedValue);

    var valueText: string = `${currencySymbol}${this.vaultValue.toFixed(2)}`;

    if (this.vaultValue >= 1000000) {
      valueText = `${currencySymbol}${abbreviateNumber(truncatedValue)}`;
    } else if (this.vaultValue >= 1000) {
      valueText = `${currencySymbol}${formattedValue}`;
    }

    contentEl.createEl("h1", { text: valueText, cls: "window-value" });
    contentEl.createEl("p", {
      text: `${getLocalizedText("calculatedTime", this.language)} ${timeTaken} ms`,
      cls: "window-time",
    });
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

async function calculateVaultValue(stats: VaultStats, currency: string, vault: Vault): Promise<number> {
  const { totalCharacters: a, totalWords: b, totalFiles: c, totalSentences: d } = stats;
  let value = (a / 122000) * (1 + (b / 130000)) + (c / 200) + (d / 21000);

  const e = await getVaultAgeInDays(vault) / 60;

  const finalValue = (value + e) * (CURRENCY_MULTIPLIERS[currency] || 1);
  return Number(finalValue.toFixed(50));
}

async function getVaultAgeInDays(vault: Vault): Promise<number> {
  try {
    const configFile = vault.getAbstractFileByPath(".obsidian/app.json");

    if (!configFile || !(configFile instanceof TFile)) {
      console.warn("Vault creation date file not found. Returning 0.");
      return 0;
    }

    const stats = await vault.adapter.stat(configFile.path);
    if (!stats || stats.ctime === undefined) {
      console.warn("Could not retrieve vault creation date. Returning 0.");
      return 0;
    }

    const creationTime = stats.ctime;
    const currentTime = Date.now();
    const daysSinceCreation = (currentTime - creationTime) / (1000 * 60 * 60 * 24);

    return daysSinceCreation;
  } catch (error) {
    console.error("Error fetching vault creation date:", error);
    return 0;
  }
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    "USD": "US$",
    "JPY": "JP¥",
    "PHP": "₱",
    "IDR": "RP ",
    "EUR": "€",
    "GBP": "£",
    "KRW": "₩",
    "CNY": "CN¥",
    "AUD": "AU$",
    "HKD": "HK$",
    "CAD": "CA$",
    "MYR": "RM ",
    "UAH": "₴",
    "NZD": "NZ$",
    "CHF": "Fr ",
    "TWD": "NT$",
    "INR": "₹",
    "BND": "B$",
    "IRR": "Rls ",
  };
  return symbols[currency] || "$";
}

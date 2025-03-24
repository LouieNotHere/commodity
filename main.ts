/*

  main.ts file (used as the main file for Commodity )
  For additional context: Commodity is a term related to Obsidian (can be the material itself or the app) and finances.
  I know it took me a long time to fix some things before publishing it as an obsidian community plugin.
  However, since I am making this plugin, I will not plan to release this publicly, but the development will still remain.
  I deeply apologize for that, I am just trying to add some new things to the source code.

  As of v1.2.0, the original and improved vault values use a separate function.
  The entire code of this file is formatted alongside, optimizing everything, including the removal of unnecessary spaces.

*/

import { CommoditySettingsTab, DEFAULT_SETTINGS, CURRENCY_MULTIPLIERS, CommoditySettings } from "./options";
import { getLocalizedText } from "./localization";
import { App, Plugin, Modal, Vault, WorkspaceLeaf, Notice, TFile } from "obsidian";
import { abbreviateNumber } from "./abbrNum";
import { CommoditySidebarView, VIEW_TYPE_COMMODITY } from "./views/SidebarView";

export default class CommodityPlugin extends Plugin {
  settings: CommoditySettings;
  language: string;

  async onload() {
    loadOdometer();

    this.registerView(
      VIEW_TYPE_COMMODITY,
      (leaf) => new CommoditySidebarView(leaf, this)
    );

    console.log("Commodity Plugin Loaded");

    await this.loadSettings();
    this.language = this.settings.language || "en";
    this.addSettingTab(new CommoditySettingsTab(this.app, this));

    this.addCommand({
      id: "calculate-vault-value",
      name: "Calculate Vault Value",
      callback: async () => {
        const vaultStats = await calculateVaultStats(this.app.vault);
        const vaultValue = await calculateVaultValue(vaultStats, this.settings.currency, this.app.vault);
        new VaultValueModal(this.app, vaultValue, this.settings.currency, this.language).open();
      },
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "V" }],
    });

    this.addRibbonIcon(
      "lucide-calculator",
      getLocalizedText("ribbonTooltip", this.language),
      async () => {
        const vaultStats = await calculateVaultStats(this.app.vault);
        const vaultValue = await calculateVaultValue(vaultStats, this.settings.currency, this.app.vault);
        new VaultValueModal(this.app, vaultValue, this.settings.currency, this.language).open();
      }
    );

    this.addCommand({
      id: "calculate-vault-value-reworked",
      name: "Commodity: Calculate Vault Value (Reworked)",
      callback: async () => {
        const vaultStats = await calculateVaultStats(this.app.vault);
        const vaultValue = await calculateReworkedValue(vaultStats, this.settings.currency, this.app.vault);
        new ReworkedVaultValueModal(this.app, vaultValue, this.settings.currency, this.language).open();
      },
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "R" }],
    });

    this.addRibbonIcon(
      "lucide-coins",
      getLocalizedText("ribbonReworkedTooltip", this.language),
      async () => {
        const vaultStats = await calculateVaultStats(this.app.vault);
        const vaultValue = await calculateReworkedValue(vaultStats, this.settings.currency, this.app.vault);
        new ReworkedVaultValueModal(this.app, vaultValue, this.settings.currency, this.language).open();
      }
    );

    this.addCommand({
      id: "activate-commodity-sidebar",
      name: "Open Commodity Sidebar",
      callback: async () => await this.activateView(),
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "B" }],
    });

    this.addRibbonIcon(
      "lucide-dollar-sign",
      getLocalizedText("sidebarRibbonTitle", this.language),
      async () => {
        await this.activateView();
      }
    );
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf = workspace.getLeavesOfType(VIEW_TYPE_COMMODITY)[0];

    if (!leaf) {
      const newLeaf = workspace.getRightLeaf(false);
      if (!newLeaf) {
        return;
      }
      leaf = newLeaf;

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

function loadOdometer() {
  if (document.querySelector('script[src="libs/odometer/odometer.min.js"]')) return;

  const script = document.createElement("script");
  script.src = "libs/odometer/odometer.min.js";
  script.onload = () => console.log("Odometer.js Loaded");
  document.head.appendChild(script);

  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = "libs/odometer/odometer-theme-default.min.css";
  document.head.appendChild(style);
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

    contentEl.createEl("h4", {
      text: getLocalizedText("modalTitle", this.language),
      cls: "window-header",
    });

    const currencySymbol = getCurrencySymbol(this.currency);

    const valueContainer = contentEl.createEl("h1", { cls: "window-value" });
    valueContainer.innerHTML = `<span id="odometer-value">${currencySymbol}0</span>`;

    setTimeout(() => {
      const odometer = new (window as any).Odometer({
        el: document.getElementById("odometer-value"),
        value: 0,
        format: "(,ddd).dd",
      });

      odometer.update(this.vaultValue);
    }, 100);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class ReworkedVaultValueModal extends Modal {
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
    new Notice(getLocalizedText("calculatingReworkedNotice", this.language));

    const { contentEl } = this;
    contentEl.empty();
    contentEl.style.textAlign = "center";

    contentEl.createEl("h4", {
      text: getLocalizedText("modalReworkedTitle", this.language),
      cls: "window-header",
    });

    const currencySymbol = getCurrencySymbol(this.currency);

    const valueContainer = contentEl.createEl("h1", { cls: "window-value" });
    valueContainer.innerHTML = `<span id="odometer-reworked-value">${currencySymbol}0</span>`;

    setTimeout(() => {
      const odometer = new (window as any).Odometer({
        el: document.getElementById("odometer-reworked-value"),
        value: 0,
        format: "(,ddd).dd",
      });

      odometer.update(this.vaultValue);
    }, 100);
  }

  onClose() {
    this.contentEl.empty();
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

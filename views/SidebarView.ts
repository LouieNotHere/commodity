/*

  SidebarView.ts: the file for the "Commodity: View Active Note Value" ribbon
  otherwise known as the "Active Note Value" sidebar view.

*/

import { ItemView, WorkspaceLeaf, TFile, Notice } from "obsidian";
import { getLocalizedText } from "../localization";
import { calculateNoteValue } from "../values/activeNoteValue";
import CommodityPlugin from "../main";

export const VIEW_TYPE_COMMODITY = "commodity-sidebar";

export class CommoditySidebarView extends ItemView {
    private plugin: CommodityPlugin;
    private currentFile: TFile | null = null;

    constructor(leaf: WorkspaceLeaf, plugin: CommodityPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType(): string {
        return VIEW_TYPE_COMMODITY;
    }

    getDisplayText(): string {
        return getLocalizedText("sidebarTitle", this.plugin.settings.language);
    }

    async onOpen() {
        this.containerEl.empty();
        this.containerEl.createEl("h3", {
            text: getLocalizedText("sidebarTitle", this.plugin.settings.language),
        });

        this.updateView();

        this.app.workspace.on("file-open", this.handleFileOpen);
        this.app.vault.on("modify", this.handleFileModify);
    }

    async updateView() {
        const file = this.app.workspace.getActiveFile();
        if (!file) {
            this.containerEl.setText(getLocalizedText("noActiveNote", this.plugin.settings.language));
            return;
        }

        this.currentFile = file;
        const value = await calculateNoteValue(file, this.app.vault, this.plugin.settings.currency);

        this.containerEl.empty();
        this.containerEl.createEl("h3", {
            text: getLocalizedText("sidebarTitle", this.plugin.settings.language),
        });

        const currencySymbol = this.getCurrencySymbol(this.plugin.settings.currency);
        this.containerEl.createEl("p", {
            text: `${getLocalizedText("noteValue", this.plugin.settings.language)} ${currencySymbol}${value.toFixed(2)}`,
        });
    }

    handleFileOpen = () => {
        this.updateView();
    };

    handleFileModify = (file: TFile) => {
        if (file === this.currentFile) {
            this.updateView();
        }
    };

    getCurrencySymbol(currency: string): string {
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

    async onClose() {
        this.app.workspace.off("file-open", this.handleFileOpen);
        this.app.vault.off("modify", this.handleFileModify);
    }
}

import { CommoditySettingsTab, DEFAULT_SETTINGS, CURRENCY_MULTIPLIERS, CommoditySettings } from "../options";
import { Modal, App } from "obsidian";
import { getLocalizedText } from "../localization";
import { getCurrencySymbol } from "../main";

export class WalletModal extends Modal {
  value: number;
  currency: string;
  language: string;

  constructor(app: App, value: number, currency: string, language: string) {
    super(app);
    this.value = value;
    this.currency = currency;
    this.language = language;
  }

  onOpen() {
    const { contentEl } = this;

    let num: walletValue = this.value * (CURRENCY_MULTIPLIERS[currency] || 1);

	contentEl.style.textAlign = "center";
	contentEl.style.fontFamily = "var(--font-interface, var(--default-font))";
	  
    contentEl.createEl("h2", {
	  text: getLocalizedText("walletTitle", this.language),
	  cls: "wallet-header"
	});
    contentEl.createEl("p", {
	  text: `${getCurrencySymbol(this.currency)}${walletValue.toFixed(2)}`,
      cls: "wallet-value"
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

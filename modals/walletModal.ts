import { Modal, App } from "obsidian";
import { getLocalizedText } from "./localization";

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
    contentEl.createEl("h2", { text: getLocalizedText("walletTitle", this.language) });
    contentEl.createEl("p", { text: `${this.value.toFixed(2)} ${this.currency}` });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

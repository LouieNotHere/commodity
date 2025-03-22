import { App, PluginSettingTab } from "obsidian";
import { getLocalizedText } from "./localization";

export class CommodityPromotionsTab extends PluginSettingTab {
  plugin: any;
  language: string;

	
  constructor(app: App, plugin: any) {
    super(app, plugin);
    this.plugin = plugin;
    this.language = this.plugin.settings.language || "en";
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: getLocalizedText("supportText", this.language) });

    containerEl.createEl("p", {
      text: getLocalizedText("promotionText", this.language)
    });

    const linkEl = containerEl.createEl("a", {
      attr: {
        href: "https://ko-fi.com/paytouse1774",
        target: "_blank"
      }
    });

    const imageEl = linkEl.createEl("img", {
      attr: {
        src: "https://storage.ko-fi.com/cdn/kofi5.png?v=6",
        alt: "Ko-fi",
      },
    });

    imageEl.style.width = "100%";
    imageEl.style.borderRadius = "8px";
    imageEl.style.marginTop = "10px";
  }
}

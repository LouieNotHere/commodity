import { App, PluginSettingTab } from "obsidian";
import { getLocalizedText } from "./localization";

export function createPromotionsSection(containerEl: HTMLElement, language: string) {
  containerEl.createEl("h2", { text: getLocalizedText("supportText", language) });

  containerEl.createEl("p", {
    text: getLocalizedText("promotionText", language)
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
      alt: "Ko-fi"
    }
  });

  imageEl.style.width = "100%";
  imageEl.style.borderRadius = "8px";
  imageEl.style.marginTop = "10px";
}

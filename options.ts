/*

  options.ts
  This is a part of the main.ts file, but this adds the plugin options.
  If you're willing to add more currencies, please add some options to the dropdown.
  If you're willing to translate instead of doing the task above, please refer to this link here (reading the top comment of the file is recommended): https://github.com/LouieNotHere/commodity/tree/master/localization.ts
  Once adding dropdown option/s is/are done, kindly edit the main.ts file and add the symbol of the added currency.

*/

import { App, PluginSettingTab, Setting } from "obsidian";
import { getLocalizedText } from "./localization";
import { createPromotionsSection } from "./promotions";
import { WalletModal } from "./modals/walletModal";

export interface CommoditySettings {
  currency: string;
  language: string;
  dynamicUpdate: boolean;
  walletValue: number;
}

export const DEFAULT_SETTINGS: CommoditySettings = {
  currency: "USD",
  language: "en",
  dynamicUpdate: true,
  walletValue: 0
};

export const CURRENCY_MULTIPLIERS: Record<string, number> = {
  "USD": 1,
  "JPY": 150,
  "PHP": 50,
  "IDR": 15000,
  "EUR": 0.9,
  "GBP": 0.8,
  "KRW": 1400,
  "CNY": 7,
  "AUD": 1.5,
  "HKD": 7.8,
  "CAD": 1.35,
  "MYR": 4.7,
  "UAH": 38,
  "NZD": 1.6,
  "CHF": 0.9,
  "TWD": 31,
  "INR": 83,
  "BND": 1.35,
  "IRR": 420000
};

export class CommoditySettingsTab extends PluginSettingTab {
  plugin: any;

  constructor(app: App, plugin: any) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
  const { containerEl } = this;
  containerEl.empty();
  
  const currencySetting = new Setting(containerEl)
    .setName(getLocalizedText("currencySetting", this.plugin.settings.language))
    .setDesc(getLocalizedText("currencyDescription", this.plugin.settings.language))
    .addDropdown(dropdown => {
      dropdown.addOptions({
        "USD": "USD - US Dollar",
        "JPY": "JPY - Japanese Yen",
        "PHP": "PHP - Philippine Peso",
        "IDR": "IDR - Indonesian Rupiah",
        "EUR": "EUR - Euro",
        "GBP": "GBP - Pound Sterling",
        "KRW": "KRW - South Korean Won",
        "CNY": "CNY - Chinese Yuan",
        "AUD": "AUD - Australian Dollar",
        "HKD": "HKD - Hong Kong Dollar",
        "CAD": "CAD - Canadian Dollar",
        "MYR": "MYR - Malaysian Ringgit",
        "UAH": "UAH - Ukrainian Hryvnia",
        "NZD": "NZD - New Zealand Dollar",
        "CHF": "CHF - Swiss Franc",
        "TWD": "TWD - New Taiwan Dollar",
        "INR": "INR - Indian Rupee",
        "BND": "BND - Brunei Dollar",
        "IRR": "IRR - Iranian Rial"
      });

      dropdown.setValue(this.plugin.settings.currency);
      dropdown.onChange(async (value) => {
        this.plugin.settings.currency = value;
        await this.plugin.saveSettings();
      });
    });

  const languageSetting = new Setting(containerEl)
    .setName(getLocalizedText("languageSetting", this.plugin.settings.language))
    .setDesc(getLocalizedText("languageDescription", this.plugin.settings.language))
    .addDropdown(dropdown => {
      dropdown.addOptions({
        "en": "EN - English",
        "ja": "JA - 日本語",
        "id": "ID - Bahasa Indonesia",
        "tl": "TL - Pilipino",
        "vi": "VI - Tiếng Việt",
        "es": "ES - Español",
		"bg": "BG - български"
      });

      dropdown.setValue(this.plugin.settings.language);
      dropdown.onChange(async (value) => {
        this.plugin.settings.language = value;
        await this.plugin.saveSettings();

        if (this.plugin.settings.dynamicUpdate) {
          currencySetting.setName(getLocalizedText("currencySetting", value));
          currencySetting.setDesc(getLocalizedText("currencyDescription", value));
          languageSetting.setName(getLocalizedText("languageSetting", value));
          languageSetting.setDesc(getLocalizedText("languageDescription", value));
		  walletSetting.setName(getLocalizedText("walletLabel", value));
	      walletSetting.setDesc(getLocalizedText("walletDesc", value));
		  walletButton.setButtonText(getLocalizedText("openWallet", value));
		  dynamicUpdateSetting.setName(getLocalizedText("dynamicSetting", value));
		  dynamicUpdateSetting.setDesc(getLocalizedText("dynamicDescription", value));
          warningText.style.display = "none";
          promotionsSection.updateLanguage(value);
        } else {
          warningText.style.display = "block";
        }

		warningText.textContent = getLocalizedText("changeWarningText", value);
      });
    });

  const warningText = containerEl.createEl("p", {
    text: getLocalizedText("changeWarningText", this.plugin.settings.language),
    cls: "setting-error"
  });

  if (this.plugin.settings.dynamicUpdate) {
    warningText.style.display = "none";
  }

  var dynamicUpdateSetting = new Setting(containerEl)
    .setName(getLocalizedText("dynamicSetting", this.plugin.settings.language))
    .setDesc(getLocalizedText("dynamicDescription", this.plugin.settings.language))
    .addToggle(toggle => {
      toggle.setValue(this.plugin.settings.dynamicUpdate);
      toggle.onChange(async (value) => {
        this.plugin.settings.dynamicUpdate = value;
        await this.plugin.saveSettings();
      });
    });

  let walletButton: ButtonComponent;

  var walletSetting = new Setting(containerEl)
    .setName(getLocalizedText("walletLabel", this.plugin.settings.language))
    .setDesc(getLocalizedText("walletDesc", this.plugin.settings.language))
    .addButton(button => {
      walletButton = button.setButtonText(getLocalizedText("openWallet", this.plugin.settings.language));
      button.onClick(() => {
        const modal = new WalletModal(this.app, this.plugin.settings.walletValue, this.plugin.settings.currency, this.plugin.settings.language);
        modal.open();
      });
    }); 
	
	const promotionsSection = createPromotionsSection(containerEl, this.plugin.settings.language);
  }
}

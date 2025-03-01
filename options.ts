import { App, PluginSettingTab, Setting } from "obsidian";

export interface CommoditySettings {
    currency: string;
}

export const DEFAULT_SETTINGS: CommoditySettings = {
    currency: "USD",
};

// Currency Multipliers (informal exchange rates)
export const CURRENCY_MULTIPLIERS: Record<string, number> = {
    "USD": 1,    // Base currency
    "JPY": 150,  // 1 USD ≈ 150 JPY
    "PHP": 50,   // 1 USD ≈ 50 PHP
    "IDR": 15000,// 1 USD ≈ 15000 IDR
    "EUR": 0.9   // 1 USD ≈ 0.9 EUR
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
        containerEl.createEl("h2", { text: "Commodity Plugin Settings" });

        new Setting(containerEl)
            .setName("Currency")
            .setDesc("Select the currency for calculation (informal exchange rate)")
            .addDropdown(dropdown => {
                dropdown.addOptions({
                    "USD": "USD - US Dollar",
                    "JPY": "JPY - Japanese Yen",
                    "PHP": "PHP - Philippine Peso",
                    "IDR": "IDR - Indonesian Rupiah",
                    "EUR": "EUR - Euro",
                });

                dropdown.setValue(this.plugin.settings.currency);
                dropdown.onChange(async (value) => {
                    this.plugin.settings.currency = value;
                    await this.plugin.saveSettings();
                });
            });
    }
}

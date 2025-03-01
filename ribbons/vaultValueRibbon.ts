import { Notice } from "obsidian";
import CommodityPlugin from "../main";
import { VaultValueModal } from "../modals/vaultValueModal";

export class VaultValueRibbon {
    constructor(plugin: CommodityPlugin) {
        plugin.addRibbonIcon("dollar-sign", "Commodity: Calculate Vault Value", () => {
            if (plugin.vaultStats) {
                new VaultValueModal(plugin.app, plugin.vaultStats).open();
            } else {
                new Notice("Commodity: The vault statistics are not ready yet. Please wait...");
            }
        });
    }
} 

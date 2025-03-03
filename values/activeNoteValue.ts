import { TFile, Vault } from "obsidian";
import { CURRENCY_MULTIPLIERS } from "../options";

export async function calculateNoteValue(file: TFile, vault: Vault, currency: string): Promise<number> {
    const content = await vault.read(file);
    const totalCharacters = content.length;
    const totalWords = content.split(/\s+/).length;
    const totalSentences = (content.match(/[.!?]+/g) || []).length;

    let value = (totalCharacters / 122000) * (1 + (totalWords / 130000)) + (totalSentences / 21000);

    return Number((value * (CURRENCY_MULTIPLIERS[currency] || 1)).toFixed(10));
}

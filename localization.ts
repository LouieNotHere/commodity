/*

  localization.ts
  This is where the localizations go. If you wish to add some translations in your language, please contact me via these methods:
  - E-mail: paytousebloxy1774@gmail.com or louiesoulenkurenai@gmail.com
  - Discord: @paytouse
  
  Just a small warning that the translations may be inaccurate, and it depends on the translators.

  Instructions in Translating:
  - There is no need to translate Commodity, just leave it be.

  Huge thanks to:
  - @luminepokee, @anatasim, @cookedfish01 and @kntdys for the Indonesian localization
  - @nekorin727 for the Vietnamese localization
  - @operagx0535 for the Spanish localization

*/

export function getLocalizedText(key: string, language: string): string {
  const LOCALIZED_STRINGS: Record < string, Record < string, string >> = {
    "ribbonTooltip": {
      "en": "Commodity: Calculate Vault Value",
      "ja": "Commodity：ボールトの価値を計算",
      "id": "Commodity: Kalkulasi Nilai Berangkas",
      "tl": "Commodity: Kalkulahin ang Halaga ng Vault",
      "vi": "Commodity: Tính giá trị của ví",
      "es": "Commodity: Calcular el Valor de la Bóveda"
    },
    "ribbonReworkedTooltip": {
      "en": "Commodity: Calculate Vault Value (Reworked)",
      "ja": "Commodity: ボールトの価値を計算 (改良された)",
      "id": "Commodity: Kalkulasu Nilai Berangkas (Ditingkatkan)",
      "tl": "Commodity: Kalkulahin ang Halaga ng Vault (Napabuti)",
      "vi": "Commodity: Tính giá trị của ví (Được cải thiện)",
      "es": "Commodity: Calcular el Valor de la Bóveda (Mejorado)"
    },
    "modalTitle": {
      "en": "Calculated Vault Value:",
      "ja": "計算されたボールトの価値:",
      "id": "Nilai Kalkulasi Berangkas:",
      "tl": "Kalkuladong Halaga ng Vault:",
      "vi": "Giá trị của ví đã tính được:",
      "es": "Valor Calculado de la Bóveda:"
    },
    "modalReworkedTitle": {
      "en": "Calculated Vault Value (Reworked):",
      "ja": "計算されたボールトの価値 (改良された):",
      "id": "Nilai Kalkulasi Berangkas (Ditingkatkan):",
      "tl": "Kalkuladong Halaga ng Vault (Napabuti):",
      "vi": "Giá trị của ví đã tính được (Được cải thiện):",
      "es": "Valor Calculado de la Bóveda (Mejorado):"
    },
    "calculatingNotice": {
      "en": "Commodity: Calculating the vault value...",
      "ja": "Commodity：ボールトの価値を計算中...",
      "id": "Commodity: Menghitung itu nilai dari sang berangkas...",
      "tl": "Commodity: Kinakalkula ang halaga ng iyong Vault...",
      "vi": "Commodity: Đang tính giá trị của ví...",
      "es": "Commodity: Calculando el valor de la bóveda..."
    },
    "calculatingReworkedNotice": {
      "en": "Commodity: Calculating the reworked vault value...",
      "ja": "Commodity：改良された保管庫の価値を計算中...",
      "id": "Commodity: Menghitung itu ditingkatkan nilai dari sang berangkas...",
      "tl": "Commodity: Kinakalkula ang napabuting halaga ng iyong Vault...",
      "vi": "Commodity: Tính giá trị của cái ví cải thiện tại đây...",
      "es": "Commodity: Calculando el valor de la bóveda..."
    },
    "calculatedTime": {
      "en": "Total CPU Time:",
      "ja": "合計CPU時間:",
      "id": "Total Waktu CPU:",
      "tl": "Kabuuang Oras ng CPU:",
      "vi": "Tổng thời gian CPU:",
      "es": "Tiempo de CPU en Total:"
    },
    "currencySetting": {
      "en": "Currency Preference",
      "ja": "通貨の設定",
      "id": "Preferensi Mata Uang",
      "tl": "Kagustuhan sa Pera",
      "vi": "Đơn vị tiền ảo",
      "es": "Moneda a Usar"
    },
    "currencyDescription": {
      "en": "Select the preferred currency that can be used for the value calculation",
      "ja": "価値計算に使用する優先通貨を選択してください",
      "id": "Pilih preferensi mata uang yang bisa digunakan untuk perhitungan",
      "tl": "Pumili ng gustong pera na pwedeng magamit sa pagkalkula ng halaga",
      "vi": "Chọn loại đơn vị tiền ảo có thể dùng để tính giá trị của ví",
      "es": "Seleccione la moneda que desea usar para el cálculo de la bóveda."
    },
    "languageSetting": {
      "en": "Language Preference",
      "ja": "言語の設定",
      "id": "Preferensi Bahasa",
      "tl": "Kagustuhan sa Wika",
      "vi": "Ngôn ngữ",
      "es": "Idioma a Usar"
    },
    "languageDescription": {
      "en": "Select the preferred language for the plugin interface",
      "ja": "プラグインのインターフェースに使用する優先言語を選択してください",
      "id": "Pilih preferensi bahasa untuk antarmuka plugin",
      "tl": "Pumili ng gustong wika para sa interface ng plugin",
      "vi": "Chọn ngôn ngữ làm ngôn ngữ chính cho giao diện của plugin",
      "es": "Seleccione el idioma a usar para la interfaz del plugin"
    },
    "sidebarRibbonTitle": {
      "en": "Commodity: View Active Note Value",
      "ja": "Commodity: アクティブノートの価値を表示",
      "id": "Commodity: Lahat Cacatan Nilai Aktif",
      "tl": "Commodity: Tignan ang Halaga ng Aktibong Tala",
      "vi": "Commodity: View Active Note Value",
      "es": "Commodity: Ver Valor de la Nota Actual"
    },
    "sidebarTitle": {
      "en": "Active Note Value",
      "ja": "アクティブノートの価値",
      "id": "Cacatan Nilai Aktif",
      "tl": "Halaga ng Aktibong Tala",
      "vi": "Active Note Value",
      "es": "Valor de la Nota Actual"
    },
    "sidebarLoading": {
      "en": "Loading the value of the active note...",
      "ja": "アクティブノートの価値を読み込み中...",
      "id": "Memuat nilai dari cacatan aktif...",
      "tl": "Nagloload ang halaga ng aktibong tala...",
      "vi": "Loading the value of the active note...",
      "es": "Cargando el valor de la nota actual..."
    },
    "sidebarNoNote": {
      "en": "There is no active note.",
      "ja": "アクティブノートがありません。",
      "id": "Tidak ada cacatan aktif.",
      "tl": "Wala ang aktibong tala.",
      "vi": "There is no active note.",
      "es": "No tienes ninguna nota actualmente."
    },
    "noteValue": {
      "en": "Note Value:",
      "ja": "ノートの価値:",
      "id": "Nilai Catatan:",
      "tl": "Halaga ng Tala:",
      "vi": "Note Value:",
      "es": "Valor de la Nota:"
    },
	"promotionText": {
	  "en": "Enjoy having the plugin? If you wish to show your generosity, please consider donating to my Ko-fi page!",
	  "ja": "プラグインを楽しんでいますか？ご厚意を示したい場合は、ぜひ私の Ko-fi ページへの寄付をご検討ください！",
	  "id": "",
	  "tl": "Nasisiyahan ka sa plugin? Kung nais mo ipakita ang iyong pagkabukas-palad, maari kang magbigay ng donasyon sa aking Ko-fi page!",
	  "vi": "",
	  "es": ""
	},
    "supportText": {
	  "en": "Support the developer!",
	  "ja": "開発者を応援しよう！",
	  "id": "",
      "tl": "I-suporta and developer!",
	  "vi": "",
	  "es": ""
	}
  };
  
  return LOCALIZED_STRINGS[key]?.[language] || LOCALIZED_STRINGS[key]?.["en"] || key;
}

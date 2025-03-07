/*

  localization.ts
  This is where the localizations go. If you wish to add some translations in your language, please contact me via these methods:
  - E-mail: paytousebloxy1774@gmail.com or louiesoulenkurenai@gmail.com
  - Discord: @paytouse

  Instructions in Translating:
  - There is no need to translate Commodity, just leave it be.

  Huge thanks to:
  - @cookedfish01 and @kntdys for the Indonesian localization
  - @nekorin727 for the Vietnamese localization
  - @operagx0535 for the Spanish localization

*/

export function getLocalizedText(key: string, language: string): string {
  const LOCALIZED_STRINGS: Record<string, Record<string, string>> = {
    "ribbonTooltip": {
      "en": "Commodity: Calculate vault value",
      "ja": "Commodity：ボールトの価値を計算",
      "id": "Commodity: Kalkulasi nilai berangkas",
      "vi": "Commodity: Tính giá trị của ví",
      "es": "Commodity: Calcular el Valor de la Bóveda"
    },
    "modalTitle": {
      "en": "Calculated vault value:",
      "ja": "計算されたボールトの価値:",
      "id": "Nilai kalkulasi berangkas:",
      "vi": "Giá trị của ví đã tính được:",
      "es": "Valor calculado de la bóveda:"
    },
    "calculatingNotice": {
      "en": "Commodity: Calculating the vault value...",
      "ja": "Commodity：ボールトの価値を計算中...",
      "id": "Commodity: Menghitung nilai berangkas...",
      "vi": "Commodity: Đang tính giá trị của ví...",
      "es": "Commodity: Calculando el Valor de la Bóveda..."
    },
    "calculatedTime": {
      "en": "Total CPU time:",
      "ja": "合計CPU時間:",
      "id": "Total waktu CPU:",
      "vi": "Tổng thời gian CPU:",
      "es": "Tiempo de CPU en total:"
    },
    "currencySetting": {
      "en": "Currency preference",
      "ja": "通貨の設定",
      "id": "Preferensi mata uang",
      "vi": "Đơn vị tiền ảo",
      "es": "Moneda a usar"
    },
    "currencyDescription": {
      "en": "Select the preferred currency that can be used for the value calculation",
      "ja": "価値計算に使用する優先通貨を選択してください",
      "id": "Pilih preferensi mata uang yang bisa digunakan untuk perhitungan",
      "vi": "Chọn loại đơn vị tiền ảo có thể dùng để tính giá trị của ví",
      "es": "Seleccione la moneda que desea usar para el cálculo de la bóveda."
    },
    "languageSetting": {
      "en": "Language preference",
      "ja": "言語の設定",
      "id": "Preferensi bahasa",
      "vi": "Ngôn ngữ",
      "es": "Idioma a usar"
    },
    "languageDescription": {
      "en": "Select the preferred language for the plugin interface",
      "ja": "プラグインのインターフェースに使用する優先言語を選択してください",
      "id": "Pilih preferensi bahasa untuk antarmuka plugin",
      "vi": "Chọn ngôn ngữ làm ngôn ngữ chính cho giao diện của plugin",
      "es": "Seleccione el idioma a usar para la interfaz del plugin"
    },
	"sidebarRibbonTitle": {
  	  "en": "Commodity: View active note value",
      "ja": "Commodity: アクティブノートの価値を表示",
   	  "id": "Commodity: Lahat cacatan nilai aktif",
  	  "vi": "Commodity: View active note value",
	  "es": "Commodity: Ver valor de la nota actual"
	},
    "sidebarTitle": {
	  "en": "Active note value",
	  "ja": "アクティブノートの価値",
	  "id": "Cacatan nilai aktif",
	  "vi": "Active note nalue",
	  "es": "Valor de la nota actual"
    },
    "sidebarLoading": {
	  "en": "Loading the value of the active note...",
	  "ja": "アクティブノートの価値を読み込み中...",
	  "id": "Memuat nilai dari cacatan aktif...",
	  "vi": "Loading the value of the active note...",
	  "es": "Cargando el valor de la nota actual..."
	},
	"sidebarNoNote": {
	  "en": "There is no active note.",
	  "ja": "アクティブノートがありません。",
	  "id": "Tidak ada cacatan aktif.",
	  "vi": "There is no active note.",
	  "es": "No tienes ninguna nota actualmente."
	},
	"noteValue": {
      "en": "Note value:",
	  "ja": "ノートの価値:",
	  "id": "Nilai catatan:",
	  "vi": "Note value:",
	  "es": "Valor de la nota:"
	}
  };

  return LOCALIZED_STRINGS[key]?.[language] || LOCALIZED_STRINGS[key]?.["en"] || key;
}

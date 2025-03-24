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
  - @nekorin727 and @maideprofessor for the Vietnamese localization
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
      "es": "Commodity: Calculando el valor mejorado de la bóveda..."
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
      "vi": "Commodity: Xem ghi chú hiện hành",
      "es": "Commodity: Ver Valor de la Nota Actual"
    },
    "sidebarTitle": {
      "en": "Active Note Value",
      "ja": "アクティブノートの価値",
      "id": "Cacatan Nilai Aktif",
      "tl": "Halaga ng Aktibong Tala",
      "vi": "Giá trị ghi chú đang hoạt động",
      "es": "Valor de la Nota Actual"
    },
    "sidebarLoading": {
      "en": "Loading the value of the active note...",
      "ja": "アクティブノートの価値を読み込み中...",
      "id": "Memuat nilai dari cacatan aktif...",
      "tl": "Nagloload ang halaga ng aktibong tala...",
      "vi": "Hiện đang truy xuất giá trị ghi chú hiện hành...",
      "es": "Cargando el valor de la nota actual..."
    },
    "noteValue": {
      "en": "Note Value:",
      "ja": "ノートの価値:",
      "id": "Nilai Catatan:",
      "tl": "Halaga ng Tala:",
      "vi": "Giá trị ghi chú:",
      "es": "Valor de la Nota:"
    },
    "promotionText": {
      "en": "Enjoying the plugin already? If so, it's your choice to show your generosity by considering a donation to my Ko-fi page!",
      "ja": "もうプラグインを楽しんでいますか？もしそうなら、ご厚意で私の Ko-fi ページへの寄付を検討してみてください！",
      "id": "Apakah anda menikmati plugin ini? Jika ya, anda dapat menunjukkan dukungan dengan memberikan donasi melalui halaman Ko-fi saya!",
      "tl": "Tintangkilik mo ba ang plugin? Kung gayon, ito ang iyong desisyon na ipakita ang iyong pagkabukas-palad sa pamamagitan ng pagsasaalang-alang ang isang donasyon sa aking pahina sa Ko-fi!",
      "vi": "Người anh em, thích cái plugion này chứ? Nếu người anh em muốn chia sẻ sự hào phóng của mình, hãy donate đến trang ko-fi của tui nhá!",
      "es": "Estas disfrutando del plugin? Si es asi, es tu eleccion el mostrar tu generosidad teniendo la consideracion de donar a mi pagina de Ko-fi, ¡Cualquier donacion es apreciada!"
    },
    "supportText": {
      "en": "Support the developer!",
      "ja": "開発者を応援しよう！",
      "id": "Dukung pengembang Sekarang!",
      "tl": "I-suporta ang developer!",
      "vi": "Ủng hộ nhà phát triển đê!",
      "es": "¡Apoya al desarrollador!"
    },
    "noActiveNote": {
      "en": "There is no active note at the moment. Please open one to see it's separate value.",
      "ja": "現在、アクティブノートはありません。個別の価値を確認するには、ノートを開いてください。",
      "id": "",
      "tl": "Wala ang aktibong tala sa ngayon. Maaring mag-buksan ng isa para makita ang nahiwalay na halaga nito.",
      "vi": "Hiện tại không có cái node nào hoạt động cả. Làm ơn mở một cái ra để xem giá trị của chúng.",
      "es": "No hay ninguna nota activa en este momento. Porfavor, abre una para ver su valor."
    },
    "changeWarningText": {
      "en": "Reminder: After setting the new plugin language, please reload the app to fully make the changes take effect.",
      "ja": "リマインダー: 新しいプラグインの言語を設定した後、変更を完全に反映させるためにアプリを再読み込みしてください。",
      "id": "",
      "tl": "Paalala: Pagkatapos itakda yung bagong wika ng plugin, i-reload ang app para gawing epektibo ang mga pagbabago.",
      "vi": "",
      "es": "Recordatorio: Después de cambiar el lenguaje del plugin, porfavor, recarga la aplicación para que los cambios tomen efecto",
    }
  };
  
  return LOCALIZED_STRINGS[key]?.[language] || LOCALIZED_STRINGS[key]?.["en"] || key;
}

/*

  localization.ts
  This is where the localizations go. If you wish to add some translations in your language, please contact me via these methods:
  - E-mail: paytousebloxy1774@gmail.com or louiesoulenkurenai@gmail.com
  - Discord: @paytouse
  
  Just a small warning that the translations may be inaccurate, and it depends on the translators.

  Instructions in Translating:
  - There is no need to translate Commodity, just leave it be.

  Huge thanks to:
  - @luminepokee, @anatasim, @cookedfish01, @cleosagaming, @kyoko_kairi and @kntdys for the Indonesian localization
  - @nekorin727 and @maideprofessor for the Vietnamese localization
  - @operagx0535 for the Spanish localization
  - @sunrize9784 for the Bulgarian localization

*/

export function getLocalizedText(key: string, language: string): string {
  const LOCALIZED_STRINGS: Record < string, Record < string, string >> = {
    "ribbonTooltip": {
      "en": "Commodity: Calculate Vault Value",
      "ja": "Commodity：ボールトの価値を計算",
      "id": "Commodity: Kalkulasi Nilai Berangkas",
      "tl": "Commodity: Kalkulahin ang Halaga ng Vault",
      "vi": "Commodity: Tính giá trị của ví",
      "es": "Commodity: Calcular el Valor de la Bóveda",
      "bg": "Commodity: Изчисли Стойността на Трезора"
    },
    "ribbonReworkedTooltip": {
      "en": "Commodity: Calculate Vault Value (Reworked)",
      "ja": "Commodity: ボールトの価値を計算 (改良された)",
      "id": "Commodity: Kalkulasu Nilai Berangkas (Ditingkatkan)",
      "tl": "Commodity: Kalkulahin ang Halaga ng Vault (Napabuti)",
      "vi": "Commodity: Tính giá trị của ví (Được cải thiện)",
      "es": "Commodity: Calcular el Valor de la Bóveda (Mejorado)",
      "bg": "Commodity: Изчисли Стойността на Трезора (Подобрение)"
    },
    "modalTitle": {
      "en": "Calculated Vault Value:",
      "ja": "計算されたボールトの価値:",
      "id": "Nilai Kalkulasi Berangkas:",
      "tl": "Kalkuladong Halaga ng Vault:",
      "vi": "Giá trị của ví đã tính được:",
      "es": "Valor Calculado de la Bóveda:",
      "bg": "Изчисли Стойността на Трезора:"
    },
    "modalReworkedTitle": {
      "en": "Calculated Vault Value (Reworked):",
      "ja": "計算されたボールトの価値 (改良された):",
      "id": "Nilai Kalkulasi Berangkas (Ditingkatkan):",
      "tl": "Kalkuladong Halaga ng Vault (Napabuti):",
      "vi": "Giá trị của ví đã tính được (Được cải thiện):",
      "es": "Valor Calculado de la Bóveda (Mejorado):",
      "bg": "Изчисли Стойността на Трезора (Подобрение):"
    },
    "calculatingNotice": {
      "en": "Commodity: Calculating the vault value...",
      "ja": "Commodity：ボールトの価値を計算中...",
      "id": "Commodity: Menghitung itu nilai dari sang berangkas...",
      "tl": "Commodity: Kinakalkula ang halaga ng iyong Vault...",
      "vi": "Commodity: Đang tính giá trị của ví...",
      "es": "Commodity: Calculando el valor de la bóveda...",
      "bg": "Commodity: Изчисляване на Стойността на Трезора..."
    },
    "calculatingReworkedNotice": {
      "en": "Commodity: Calculating the reworked vault value...",
      "ja": "Commodity：改良された保管庫の価値を計算中...",
      "id": "Commodity: Menghitung itu ditingkatkan nilai dari sang berangkas...",
      "tl": "Commodity: Kinakalkula ang napabuting halaga ng iyong Vault...",
      "vi": "Commodity: Tính giá trị của cái ví cải thiện tại đây...",
      "es": "Commodity: Calculando el valor mejorado de la bóveda...",
      "bg": "Commodity: Изчисляване на Стойността на Подобрение на Трезора..."
    },
    "calculatedTime": {
      "en": "Total CPU Time:",
      "ja": "合計CPU時間:",
      "id": "Total Waktu CPU:",
      "tl": "Kabuuang Oras ng CPU:",
      "vi": "Tổng thời gian CPU:",
      "es": "Tiempo de CPU en Total:",
      "bg": "Общо Време на Процесора:"
    },
    "currencySetting": {
      "en": "Currency Preference",
      "ja": "通貨の設定",
      "id": "Preferensi Mata Uang",
      "tl": "Kagustuhan sa Pera",
      "vi": "Đơn vị tiền ảo",
      "es": "Moneda a Usar",
      "bg": "Предпочитание на Валута"
    },
    "currencyDescription": {
      "en": "Select the preferred currency that can be used for the value calculation",
      "ja": "価値計算に使用する優先通貨を選択してください",
      "id": "Pilih preferensi mata uang yang bisa digunakan untuk perhitungan",
      "tl": "Pumili ng gustong pera na pwedeng magamit sa pagkalkula ng halaga",
      "vi": "Chọn loại đơn vị tiền ảo có thể dùng để tính giá trị của ví",
      "es": "Seleccione la moneda que desea usar para el cálculo de la bóveda.",
      "bg": "Избери Предпочитаната Валута Която Може Да Бъде Използвана за Изчислението на Стойността"
    },
    "languageSetting": {
      "en": "Language Preference",
      "ja": "言語の設定",
      "id": "Preferensi Bahasa",
      "tl": "Kagustuhan sa Wika",
      "vi": "Ngôn ngữ",
      "es": "Idioma a Usar",
      "bg": "Предпочитание на Език"
    },
    "languageDescription": {
      "en": "Select the preferred language for the plugin interface",
      "ja": "プラグインのインターフェースに使用する優先言語を選択してください",
      "id": "Pilih preferensi bahasa untuk antarmuka plugin",
      "tl": "Pumili ng gustong wika para sa interface ng plugin",
      "vi": "Chọn ngôn ngữ làm ngôn ngữ chính cho giao diện của plugin",
      "es": "Seleccione el idioma a usar para la interfaz del plugin",
      "bg": "Избери Предпочитания Език за Интерфейса на Плъгина"
    },
    "dynamicSetting": {
      "en": "Dynamic Language Updates",
      "ja": "動的言語更新",
      "id": "Pembaruan Bahasa Dinamis",
      "tl": "Dinamikong Update sa Wika",
      "vi": "Cập nhật ngôn ngữ linh hoạt",
      "es": "Actualización dinámica del lenguaje",
      "bg": "Динамично Обновление на Езика"
    },
    "dynamicDescription": {
      "en": "Dynamically updates the texts when this option is enabled (gives a low performance impact)",
      "ja": "このオプションを有効にすると、テキストが動的に更新されます（パフォーマンスへの影響は低い）",
      "id": "Memperbarui teks secara dinamis saat opsi ini diaktifkan (memberikan dampak kinerja yang rendah)",
      "tl": "Dinamiko na ina-update ang mga teksto kapag ang opsyon na ito ay pinagana (nagbibigay ng mababang epekto sa pagganap)",
      "vi": "Văn tự sẽ được cập nhật một cách linh hoạt hơn khi lựa chọn này được bật (có thể gây ảnh hưởng đến hiệu suất sử dụng)",
      "es": "Actualiza dinámicamente los textos cuando esta opción está activada (afecta muy poco al rendimiento)",
      "bg": "Динамично Обновява Текстовете Когато Тази Опция е Активирана (Дава Ниско Въздействие на Производителността)"
    },
    "sidebarRibbonTitle": {
      "en": "Commodity: View Active Note Value",
      "ja": "Commodity: アクティブノートの価値を表示",
      "id": "Commodity: Lihat Cacatan Nilai Aktif",
      "tl": "Commodity: Tignan ang Halaga ng Aktibong Tala",
      "vi": "Commodity: Xem ghi chú hiện hành",
      "es": "Commodity: Ver Valor de la Nota Actual",
      "bg": "Commodity: Виж Стойността на Активна Бележка"
    },
    "sidebarTitle": {
      "en": "Active Note Value",
      "ja": "アクティブノートの価値",
      "id": "Cacatan Nilai Aktif",
      "tl": "Halaga ng Aktibong Tala",
      "vi": "Giá trị ghi chú đang hoạt động",
      "es": "Valor de la Nota Actual",
      "bg": "Стойност на Активна Бележка"
    },
    "sidebarLoading": {
      "en": "Loading the value of the active note...",
      "ja": "アクティブノートの価値を読み込み中...",
      "id": "Memuat nilai dari cacatan aktif...",
      "tl": "Nagloload ang halaga ng aktibong tala...",
      "vi": "Hiện đang truy xuất giá trị ghi chú hiện hành...",
      "es": "Cargando el valor de la nota actual...",
      "bg": "Зареждане на Стойността на Активната Бележка..."
    },
    "noteValue": {
      "en": "Note Value:",
      "ja": "ノートの価値:",
      "id": "Nilai Catatan:",
      "tl": "Halaga ng Tala:",
      "vi": "Giá trị ghi chú:",
      "es": "Valor de la Nota:",
      "bg": "Стойност на Бележка:"
    },
    "promotionText": {
      "en": "Enjoying the plugin already? If so, it's your choice to show your generosity by considering a donation to my Ko-fi page!",
      "ja": "もうプラグインを楽しんでいますか？もしそうなら、ご厚意で私の Ko-fi ページへの寄付を検討してみてください！",
      "id": "Apakah anda menikmati plugin ini? Jika ya, anda dapat menunjukkan dukungan dengan memberikan donasi melalui halaman Ko-fi saya!",
      "tl": "Tintangkilik mo ba ang plugin? Kung gayon, ito ang iyong desisyon na ipakita ang iyong pagkabukas-palad sa pamamagitan ng pagsasaalang-alang ang isang donasyon sa aking pahina sa Ko-fi!",
      "vi": "Người anh em, thích cái plugin này chứ? Nếu người anh em muốn chia sẻ sự hào phóng của mình, hãy donate đến trang ko-fi của tui nhá!",
      "es": "Estas disfrutando del plugin? Si es asi, es tu eleccion el mostrar tu generosidad teniendo la consideracion de donar a mi pagina de Ko-fi, ¡Cualquier donacion es apreciada!",
      "bg": "Наслаждавате ли се Вече на Плъгина? ако Това е Така, Ваше е Решението да Покажете Вашата Щедрост с Дарение на Моята Ko-fi Страница! Всички дарения се оценяват!"
    },
    "supportText": {
      "en": "Support the developer!",
      "ja": "開発者を応援しよう！",
      "id": "Dukung pengembang Sekarang!",
      "tl": "I-suporta ang developer!",
      "vi": "Ủng hộ nhà phát triển đê!",
      "es": "¡Apoya al desarrollador!",
      "bg": "Подкрепете Разработчика!"
    },
    "noActiveNote": {
      "en": "There is no active note at the moment. Please open one to see it's separate value.",
      "ja": "現在、アクティブノートはありません。個別の価値を確認するには、ノートを開いてください。",
      "id": "Tidak ada catatan aktif saat ini. Silahkan buka satu untuk melihat nilai terpisahnya",
      "tl": "Wala ang aktibong tala sa ngayon. Maaring mag-buksan ng isa para makita ang nahiwalay na halaga nito.",
      "vi": "Hiện tại không có cái node nào hoạt động cả. Làm ơn mở một cái ra để xem giá trị của chúng.",
      "es": "No hay ninguna nota activa en este momento. Porfavor, abre una para ver su valor.",
      "bg": "Няма Активна Бележка в момента. Моля Отворете Една за да Видите отделната ѝ стойност."
    },
    "changeWarningText": {
      "en": "Reminder: After the plugin language has been changed, at some point it wouldn't work straight away on all texts. For this change to fully take effect, it is required to restart the app.",
      "ja": "リマインダー: プラグインの言語を変更した後、すぐにすべてのテキストに反映されない場合があります。この変更を完全に適用するには、アプリの再起動が必要です。",
      "id": "Peringatan: Setelah bahasa plugin diubah, pada saat tertentu, plugin tidak akan langsung berfungsi pada semua teks. Agar perubahan ini berlaku sepenuhnya, diperlukan untuk memulai ulang aplikasi.",
      "tl": "Paalala: Pagkatapos mapalitan ang wika ng plugin, sa ilang mga punto ay hindi ito gumagana kaagad sa lahat ng mga teksto. Para ganap na magkabisa ang pagbabagong ito, maaring kinakailangang i-restart ang app.",
      "vi": "Nhắc Nhẹ: Sau khi ngôn ngữ của plugin này được chuyển, sẽ có vài lúc nó không hiển thị đúng cách ở mọi chỗ cả. Để cho sự chuyển ngôn ngữ này có hiệu lực, thì việc khởi động lại là điều cần thiết.",
      "es": "Recuerda: Después de cambiar el lenguaje del plugin, no funcionará para todos los textos, reinicia la aplicación",
      "bg": "Напомняне: След Промяна на Езика на Плъгина, Промяната Няма да Бъде в Ефект Веднага и на Всички Текстове. За да Бъде Промяната Напълно Активна е Нужно да Рестартирате Приложението."
    },
	"walletTitle": {
	  "en": "Wallet Value",
	  "ja": "ウォレットの価値",
	  "id": "Nilai Dompet",
	  "tl": "Halaga ng Pitaka",
	  "vi": "Giá trị của Ví",
	  "es": "Valor de la Billetera",
	  "bg": ""
    },
	"walletLabel": {
	  "en": "Open Wallet Value",
	  "ja": "ウォレットの価値を開く",
	  "id": "Nilai Dompet Terbuka",
	  "tl": "Buksan ang Halaga ng Pitaka",
	  "vi": "Mở Ví xem giá trị",
	  "es": "Abrir el Valor de la Billetera",
	  "bg": ""
	},
    "walletDesc": {
	  "en": "Open and check the contents of the wallet and see how much money has been added from all calculated values",
	  "ja": "ウォレットを開いて中身を確認し、各計算された価値からいくら追加されたかを確認してください",
      "id": "Buka dan periksa isi dompet dan lihat berapa banyak uang yang telah ditambahkan Dari setiap nilai yang dihitung",
      "tl": "Buksan at suriin ang mga nilalaman ng pitaka at tignan kung gaano karaming pera ang naidagdag galing sa lahat ng naikalkula na halaga",
	  "vi": "Mở Ví lên và kiểm tra những thứ ở trong đó cũng như xem lượng tiền đã được thêm vào sau khi tính toán",
	  "es": "Abre y revisa el contenido de la billetera y verás cuanto dinero ha sido añadido de todos los valores calculados",
	  "bg": ""
	},
	"openWallet": {
	  "en": "Open Wallet",
	  "ja": "ウォレットを開く",
	  "id": "Dompet Terbuka",
	  "tl": "Buksan ang Pitaka",
	  "vi": "Mở Ví",
	  "es": "Abrir Billetera",
	  "bg": ""
    }
  };
  
  return LOCALIZED_STRINGS[key]?.[language] || LOCALIZED_STRINGS[key]?.["en"] || key;
}

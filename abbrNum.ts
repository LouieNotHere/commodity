export function abbreviateNumber(value: number): string {
    let abbreviatedValue = value;
    const letters: string[] = [
        "", "K", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No", "De",
        "UDe", "DDe", "TDe", "QdDe", "QnDe", "SxDe", "SpDe", "OcDe", "NoDe",
        "Vg", "UVg", "DVg", "TVg", "QdVg", "QnVg", "SxVg", "SpVg", "OcVg", "NoVg",
        "Tg", "UTg", "DTg", "TTg", "QdTg", "QnTg", "SxTg", "SpTg", "OcTg", "NoTg",
        "qg", "Uqg", "Dqg", "Tqg", "Qdqg", "Qnqg", "Sxqg", "Spqg", "Ocqg", "Noqg",
        "Qg", "UQg", "DQg", "TQg", "QdQg", "QnQg", "SxQg", "SpQg", "OcQg", "NoQg",
        "sg", "Usg", "Dsg", "Tsg", "Qdsg", "Qnsg", "Sxsg", "Spsg", "Ocsg", "Nosg",
        "Sg", "USg", "DSg", "TSg", "QdSg", "QnSg", "SxSg", "SpSg", "OcSg", "NoSg",
        "Og", "UOg", "DOg", "TOg", "QdOg", "QnOg", "SxOg", "SpOg", "OcOg", "NoOg",
        "Ng", "UNg", "DNg", "TNg", "QdNg", "QnNg", "SxNg", "SpNg", "OgNg", "NoNg",
        "Ce", "UCe", "DCe", "TCe", "QdCe", "QnCe", "SxCe", "SpCe", "OcCe", "NoCe",
    ];

    let notation = 0;

    while (abbreviatedValue >= 1000 && notation < letters.length - 1) {
        abbreviatedValue /= 1000;
        notation++;
    }

    return `${abbreviatedValue.toPrecision(3)}${letters[notation]}`;
}

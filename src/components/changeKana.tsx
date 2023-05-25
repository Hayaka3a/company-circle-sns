// カタカナをひらがなに変換する関数
export default function ConvertKanaJ(NameKana) {
  return NameKana.replace(/[\u30a1-\u30f6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0x60),
  );
}

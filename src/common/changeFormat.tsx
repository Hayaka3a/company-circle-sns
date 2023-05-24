// yyyy-mm-ddをyyyy年mm月dd日に変換
export const changeFormat = (date: string) => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  return `${year}年${month}月${day}日`;
};

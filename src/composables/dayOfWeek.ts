// 星期資料
const chineseDays = ["一", "二", "三", "四", "五", "六", "日"];
export const cycleOptions = chineseDays.map((item, idx) => {
  return {
    value: idx + 1,
    label: item,
  };
});

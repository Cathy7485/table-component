// 設定最大加權長度 (中文 15 字 * 2 = 30 個單位)
// 中文限制是 15 個字，對應英文限制是30 個字元
export const MAX_WEIGHTED_LENGTH = 30;
const MAX_CHINESE_LENGTH = MAX_WEIGHTED_LENGTH / 2;

/**
 * 計算字串的加權長度（中文佔 2，英文/數字/符號佔 1）
 */
function calculateWeightedLength(str: string): number {
  if (!str) return 0;

  let length = 0;
  const cjkRegex = /[\u4e00-\u9fa5\uac00-\ud7ff\uff00-\uffef]/;

  for (const char of str) {
    if (cjkRegex.test(char)) {
      length += 2;
    } else {
      length += 1;
    }
  }
  return length;
}

/**
 * [可組合函式] 導出常用的自定義驗證器
 * @returns {object} 包含驗證器函式
 */
export function useValidationRules() {
  // 自定義驗證器：驗證加權長度
  const validateNameLength = (_rule: any, value: string, callback: (error?: Error) => void) => {
    if (!value) {
      callback();
      return;
    }

    const weightedLength = calculateWeightedLength(value);

    if (weightedLength > MAX_WEIGHTED_LENGTH) {
      callback(
        new Error(
          `字數超過限制，最多 ${MAX_CHINESE_LENGTH} 個中文字或 ${MAX_WEIGHTED_LENGTH} 個英文字元`,
        ),
      );
    } else {
      callback();
    }
  };

  return {
    validateNameLength,
  };
}

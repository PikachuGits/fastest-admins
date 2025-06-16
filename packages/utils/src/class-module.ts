/**
 * 输出class 字符串
 * @param classes
 */
export function classes(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * 从 styles 对象中动态获取类名并返回一个拼接后的字符串
 * @param styles
 * @param classesString
 */
export function classes_module(styles: Record<string, string>, ...classesString: (string | false | undefined | null)[]) {
  return classesString
    .flatMap(item => (item ? item.split(' ') : [])) // 分割类名字符串为数组
    .map(item => item && (styles[item] || item)) // 从 styles 中获取类名，或者保留原始类名
    .filter(Boolean) // 过滤掉无效值
    .join(' '); // 拼接成字符串
}

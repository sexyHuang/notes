/**
 * 关于js中一些容易忘记的操作
 */

// 分割字符串且包含分割符
const targetString = `a
b
c
d
e
`;
// 通过正则包含匹配，实现分割字符串且包含分割符
const splitReg = /(\n)/;
console.log(targetString.split(splitReg));

/**
 * for...of..循环数组，获取idx
 */
const arr = [1, 2, 3, 4, 5, 6, 7];
for (let [idx, value] of arr.entries()) {
  console.log(idx, value);
}

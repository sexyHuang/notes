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

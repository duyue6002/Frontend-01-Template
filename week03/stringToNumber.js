function stringToNumber(str, radix = 10) {
  let chars = str.split("");
  let number = 0,
    positive = true;
  let i = 0;
  if (chars[0] === "-" || chars[0] === "+") {
    positive = chars[0] === "-" ? false : true;
    i++;
  }
  // 正数部分
  while (i < chars.length && !/\.|[eE]/.test(chars[i])) {
    number *= radix;
    number += chars[i].charCodeAt(0) - "0".charCodeAt(0);
    i++;
  }
  // 纯小数
  if (chars[i] === "." && !/[eE]/.test(str)) {
    i++;
    let fraction = 1;
    while (i < chars.length) {
      fraction /= radix;
      number += fraction * (chars[i].charCodeAt(0) - "0".charCodeAt(0));
      i++;
    }
  }
  // 科学记数法
  if (chars[i] === "." && /[eE]/.test(str)) {
    i++;
    let fraction = 1;
    while (i < chars.length && !/[eE]/.test(chars[i])) {
      fraction /= radix;
      number += fraction * (chars[i].charCodeAt(0) - "0".charCodeAt(0));
      i++;
    }
    if (/[eE]/.test(chars[i])) {
      i++;
      let eRight = 0;
      while (i < chars.length) {
        eRight *= 10;
        eRight += chars[i].charCodeAt(0) - "0".charCodeAt(0);
        i++;
      }
      while (eRight-- > 0) {
        number *= 10;
      }
    }
  }
  return number;
}

console.log(stringToNumber("2.22e3"));

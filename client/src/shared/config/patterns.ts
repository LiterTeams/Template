const xssSxriptPatternOne = /<script>/;
const xssSxriptPatternTwo = /&#8249;script&#8250;/;
const numberPattern = /^\d+$/;
const stringPattern = /[A-Za-zА-ЯЁ-а-яё]/;
const langRuPattern = /^\p{Script=Cyrillic}+$/u;
const langEnPattern = /[A-Za-z]/;
const trimPattern = / +/g;
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
export {xssSxriptPatternOne, xssSxriptPatternTwo, numberPattern, stringPattern, langRuPattern, langEnPattern, trimPattern, emailPattern}
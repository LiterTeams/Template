const xssSxriptPatternOne = /<script>/;
const xssSxriptPatternTwo = /&#8249;script&#8250;/;
const digitsPattern = /^\d+$/;
const lettersPattern = /[A-Za-zА-ЯЁ-а-яё]/;
const langRuPattern = /^\p{Script=Cyrillic}+$/u;
const langEnPattern = /[A-Za-z]/;
const trimPattern = / +/g;
const telPattern = /^\+?\d{10,15}$/;
const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IPPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const formatPatterns: Record<string, RegExp> = {
    email: emailPattern,
    tel: telPattern,
    url: urlPattern,
    IP: IPPattern,
    uuid: uuidPattern,
};

export {formatPatterns, xssSxriptPatternOne, IPPattern, uuidPattern, urlPattern, xssSxriptPatternTwo, telPattern, digitsPattern, lettersPattern, langRuPattern, langEnPattern, trimPattern, emailPattern}
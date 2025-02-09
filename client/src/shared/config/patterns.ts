export const xssSxriptPatternOne = /<script>/;
export const xssSxriptPatternTwo = /&#8249;script&#8250;/;

export const digitsPattern = /^\d+$/;
export const lettersPattern = /[A-Za-zА-ЯЁ-а-яё]/;
export const langRuPattern = /^\p{Script=Cyrillic}+$/u;
export const langEnPattern = /[A-Za-z]/;
export const trimPattern = / +/g;

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const telPattern = /^\+?\d{10,15}$/;
export const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
export const IPPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const formatPatterns: Record<string, RegExp> = {
    email: emailPattern,
    tel: telPattern,
    url: urlPattern,
    IP: IPPattern,
    uuid: uuidPattern,
};
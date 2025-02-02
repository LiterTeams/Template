const isUpperCase = (str: string): boolean => /^[A-ZА-ЯЁ]+$/.test(str);

export default isUpperCase;
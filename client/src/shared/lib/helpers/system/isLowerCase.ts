const isLowerCase = (str: string): boolean => /^[a-zа-яё]+$/.test(str.trim());

export default isLowerCase;

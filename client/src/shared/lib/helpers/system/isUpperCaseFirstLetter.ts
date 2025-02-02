const isUpperCaseFirstLetter = (str: string): boolean => {
    return /^[A-ZА-ЯЁ][a-zа-яё]*$/.test(str.trim());
}

export default isUpperCaseFirstLetter;
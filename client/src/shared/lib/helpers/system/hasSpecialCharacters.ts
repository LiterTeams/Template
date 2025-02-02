const hasSpecialCharacters = (value: string): boolean => {
    const regex = /[^a-zA-Z0-9\s_-]/;
    return regex.test(value);
}

export default hasSpecialCharacters;
import { lettersPattern } from "@shared/config/patterns";

const hasLetters = (value: string) => lettersPattern.test(value.trim());

export default hasLetters;
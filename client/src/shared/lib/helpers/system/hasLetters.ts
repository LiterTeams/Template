import { lettersPattern } from "@shared/config/patterns";
export const hasLetters = (value: string) => lettersPattern.test(value.trim());
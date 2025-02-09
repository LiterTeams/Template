import { digitsPattern } from "@shared/config/patterns";
export const hasDigits = (value: string) => digitsPattern.test(value.trim());
import { digitsPattern } from "@shared/config/patterns";

const hasDigits = (value: string) => digitsPattern.test(value.trim());

export default hasDigits;
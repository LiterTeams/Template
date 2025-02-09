import { trimPattern } from "@shared/config/patterns";
export const hasSpace = (str: string): boolean => trimPattern.test(str);
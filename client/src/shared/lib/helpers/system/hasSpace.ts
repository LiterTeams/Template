import { trimPattern } from "@shared/config/patterns";

const hasSpace = (str: string): boolean => trimPattern.test(str);

export default hasSpace;

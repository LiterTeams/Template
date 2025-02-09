import { xssSxriptPatternOne, xssSxriptPatternTwo } from "@shared/config/patterns";

export const checkXSS = (state:string | number) => {
    if (typeof state === "number") state = String(state);
    return xssSxriptPatternOne.test(state) || xssSxriptPatternTwo.test(state);
}